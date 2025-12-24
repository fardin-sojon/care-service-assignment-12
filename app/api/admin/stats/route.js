
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/connectDB';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("care_service");

        // Count users
        const userCount = await db.collection("users").estimatedDocumentCount();

        // Count bookings
        const bookingCount = await db.collection("bookings").estimatedDocumentCount();

        // Calculate revenue (this is a simple aggregation, might need adjustment based on data structure)
        // Assuming 'totalCost' is stored as a number in bookings
        const revenueAggregation = await db.collection("bookings").aggregate([
            {
                $match: { status: { $in: ["Paid", "Confirmed", "Completed"] } } // Only count verified revenue
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalCost" }
                }
            }
        ]).toArray();

        const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

        return NextResponse.json({
            users: userCount,
            bookings: bookingCount,
            revenue: totalRevenue
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
