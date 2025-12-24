import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import clientPromise from '@/lib/connectDB';
import { ObjectId } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const { sessionId } = await request.json();

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const bookingId = session.metadata.bookingId;
            const client = await clientPromise;
            const db = client.db("care_service");

            // Update booking status
            const result = await db.collection("bookings").updateOne(
                { _id: new ObjectId(bookingId) },
                {
                    $set: {
                        status: 'Paid',
                        transactionId: session.payment_intent // or session.id
                    }
                }
            );

            return NextResponse.json({ success: true, bookingId });
        } else {
            return NextResponse.json({ error: "Payment not verified" }, { status: 400 });
        }

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
