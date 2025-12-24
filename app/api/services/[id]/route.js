
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/connectDB';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const client = await clientPromise;
        const db = client.db("care_service");
        const service = await db.collection("services").findOne({ _id: new ObjectId(id) });
        return NextResponse.json(service);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
