import Link from 'next/link';
import clientPromise from '@/lib/connectDB';

async function getServices() {
    try {
        const client = await clientPromise;
        const db = client.db("care_service");
        const services = await db.collection("services").find({}).toArray();
        return JSON.parse(JSON.stringify(services));
    } catch (e) {
        console.error(e);
        return [];
    }
}

const ServicesPage = async () => {
    const services = await getServices();

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10">All Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.length > 0 ? services.map(service => (
                    <div key={service._id} className="card bg-base-100 shadow-xl">
                        <figure><img src={service.image} alt={service.title} className="h-48 w-full object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{service.title}</h2>
                            <p>{service.description}</p>
                            <div className="card-actions justify-end">
                                <Link href={`/service/${service._id}`} className="btn btn-secondary">View Details</Link>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-3 text-center">
                        <p>No services available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicesPage;
