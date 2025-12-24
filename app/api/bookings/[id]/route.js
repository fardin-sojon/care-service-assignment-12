import { NextResponse } from 'next/server';
import clientPromise from '@/lib/connectDB';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const client = await clientPromise;
        const db = client.db("care_service");
        const booking = await db.collection("bookings").findOne({ _id: new ObjectId(id) });
        return NextResponse.json(booking);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const client = await clientPromise;
        const db = client.db("care_service");
        const result = await db.collection("bookings").deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("care_service");
        const updateDoc = {
            $set: {
                status: body.status,
                transactionId: body.transactionId
            }
        };
        const result = await db.collection("bookings").updateOne(
            { _id: new ObjectId(id) },
            updateDoc
        );
        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
