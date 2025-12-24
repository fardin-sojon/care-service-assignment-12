import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import clientPromise from '@/lib/connectDB';
import { ObjectId } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const { bookingId } = await request.json();
        const client = await clientPromise;
        const db = client.db("care_service");

        const booking = await db.collection("bookings").findOne({ _id: new ObjectId(bookingId) });

        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: booking.serviceName,
                            description: `Booking ID: ${booking._id}`,
                        },
                        unit_amount: parseInt((booking.totalCost / 127) * 100), // Amount in cents (Converted from BDT)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/payment/${bookingId}`,
            metadata: {
                bookingId: booking._id.toString(),
            },
            customer_email: booking.email,
        });

        return NextResponse.json({ url: session.url });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
