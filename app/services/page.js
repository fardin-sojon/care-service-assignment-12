import clientPromise from '@/lib/connectDB';
import ServiceCard from '@/components/ServiceCard';

async function getServices() {
    try {
        const client = await clientPromise;
        const db = client.db("care_service");
        const services = await db.collection("services").find({}).limit(20).toArray(); // Increased limit or remove it
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
                    <ServiceCard key={service._id} service={service} />
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
