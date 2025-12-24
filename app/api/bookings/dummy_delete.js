
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/connectDB';
import { ObjectId } from 'mongodb';

export async function DELETE(request, { params }) {
    try {
        const { id } = params; // This might need to be resolved from URL
        // In Next.js app router dynamic route segments are passed differently or need extraction from URL if not using [id] folder structure for this specific endpoint properly.
        // If file is app/api/bookings/route.js, it handles collection.
        // We need app/api/bookings/[id]/route.js for specific items usually.
        return NextResponse.json({ error: 'Method not allowed on collection' }, { status: 405 });
    } catch (e) {
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}
