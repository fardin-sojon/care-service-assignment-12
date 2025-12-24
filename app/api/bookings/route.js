
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/connectDB';

export async function POST(request) {
    try {
        const booking = await request.json();
        const client = await clientPromise;
        const db = client.db("care_service");
        const result = await db.collection("bookings").insertOne(booking);
        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        const client = await clientPromise;
        const db = client.db("care_service");

        let query = {};
        if (email) {
            query = { email: email }; // Assuming booking saves 'email'
        }

        const bookings = await db.collection("bookings").find(query).toArray();
        return NextResponse.json(bookings);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
