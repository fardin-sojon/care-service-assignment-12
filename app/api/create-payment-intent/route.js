
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

        // Amount must be in cents/paisa
        // Assuming booking.price is in currency units (e.g., USD or BDT)
        // If price is 500, amount should be 50000 cents
        const amount = parseInt(booking.totalCost * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd", // Request user confirmation for currency
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
