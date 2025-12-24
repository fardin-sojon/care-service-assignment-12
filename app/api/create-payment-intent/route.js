
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

        // Amount must be in cents
        // Conversion: BDT to USD. Adjusted rate to 127 based on Stripe's real-time rate observation.
        const amountInUsd = booking.totalCost / 127;
        const amount = parseInt(amountInUsd * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ["card"],
            payment_method_types: ["card"],
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
