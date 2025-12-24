
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/connectDB';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("care_service");
        const services = await db.collection("services").find({}).toArray();
        return NextResponse.json(services);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
