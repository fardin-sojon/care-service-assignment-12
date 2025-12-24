
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/connectDB';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("care_service");
        // Ensure this route is protected in production (check admin headers/session)
        const bookings = await db.collection("bookings").find().toArray();
        return NextResponse.json(bookings);
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
