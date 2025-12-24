import { NextResponse } from 'next/server';
import clientPromise from '@/lib/connectDB';
import { ObjectId } from 'mongodb';

export async function POST(request) {
    try {
        const user = await request.json();
        const client = await clientPromise;
        const db = client.db("care_service");
        // Check if user exists
        const query = { email: user.email };
        const existingUser = await db.collection("users").findOne(query);
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists', insertedId: existingUser._id });
        }
        const result = await db.collection("users").insertOne(user);
        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("care_service");
        const users = await db.collection("users").find().toArray();
        return NextResponse.json(users);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const { id, ...updates } = await request.json();
        if (!id) {
            return NextResponse.json({ error: 'User ID is required for update' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("care_service");

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User updated successfully', result });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
