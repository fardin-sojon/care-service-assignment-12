
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/connectDB';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("care_service");
        const servicesCollection = db.collection("services");

        const count = await servicesCollection.countDocuments();
        if (count > 0) {
            return NextResponse.json({ message: 'Database already seeded' });
        }

        const services = [
            {
                title: "Baby Care",
                description: "Expert babysitters for your little ones. We provide certified and experienced nannies who are trained in child development and safety.",
                image: "https://img.freepik.com/free-photo/medium-shot-mother-holding-baby_23-2149156221.jpg",
                price: 500
            },
            {
                title: "Elderly Care",
                description: "Compassionate care for your elderly family members. Our caregivers assist with daily activities, medication management, and companionship.",
                image: "https://img.freepik.com/free-photo/nurse-measuring-patient-blood-pressure_23-2148962233.jpg",
                price: 700
            },
            {
                title: "Special Needs Care",
                description: "Specialized attention for special needs. Our professionals are trained to support individuals with physical or cognitive challenges.",
                image: "https://img.freepik.com/free-photo/young-woman-wheelchair-with-nurse-outdoors_23-2148651084.jpg",
                price: 800
            },
            {
                title: "Post-Surgery Care",
                description: "Professional medical assistance for recovery after surgery. We help with wound care, mobility, and monitoring vitals.",
                image: "https://img.freepik.com/free-photo/doctor-patient-hospital-room_23-2148962363.jpg",
                price: 1000
            }
        ];

        const result = await servicesCollection.insertMany(services);
        return NextResponse.json({ message: 'Database seeded successfully', result });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
