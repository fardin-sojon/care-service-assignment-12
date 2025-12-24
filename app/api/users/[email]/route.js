
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/connectDB';

export async function GET(request, { params }) {
    try {
        const { email } = await params;
        const client = await clientPromise;
        const db = client.db("care_service");
        const user = await db.collection("users").findOne({ email: email });
        return NextResponse.json(user);
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { email } = await params;
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("care_service");

        // If updating role
        const updateDoc = {
            $set: {}
        };

        if (body.role) updateDoc.$set.role = body.role;
        if (body.name) updateDoc.$set.name = body.name;
        if (body.image) updateDoc.$set.image = body.image;
        if (body.nid) updateDoc.$set.nid = body.nid;
        if (body.contact) updateDoc.$set.contact = body.contact;
        if (body.address) updateDoc.$set.address = body.address;

        const result = await db.collection("users").updateOne(
            { email: email },
            updateDoc
        );
        return NextResponse.json(result);

    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
