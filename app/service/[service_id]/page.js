
"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ServiceDetail = () => {
    const params = useParams();
    const id = params?.service_id; // Match folder name [service_id]
    const [service, setService] = useState(null);
    console.log(service);

    useEffect(() => {
        if (id) {
            fetch(`/api/services/${id}`, { cache: 'no-store' })
                .then(res => res.json())
                .then(data => setService(data));
        }
    }, [id]);

    if (!service) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="lg:w-1/2"><img src={service.image} alt={service.title} className="w-full h-96 object-cover" /></figure>
                <div className="card-body lg:w-1/2">
                    <h2 className="card-title text-4xl mb-4">{service.title}</h2>
                    <p className="text-lg mb-4">{service.description}</p>
                    <div className="stats shadow mb-6">
                        <div className="stat">
                            <div className="stat-title">Hourly Rate</div>
                            <div className="stat-value text-primary">{service.price} BDT</div>
                            <div className="stat-desc">Per hour</div>
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        <Link href={`/booking/${service._id}`} className="btn btn-primary btn-wide">Book Service</Link>
                    </div>
                </div>
            </div>

            {/* Reviews Section Placeholder */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Reviews</h3>
                <div className="alert alert-info">No reviews yet.</div>
            </div>
        </div>
    );
};

export default ServiceDetail;
