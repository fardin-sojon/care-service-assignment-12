
"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ServiceDetail = () => {
    const params = useParams();
    const id = params?.service_id;
    const [service, setService] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/services/${id}`, { cache: 'no-store' })
                .then(res => res.json())
                .then(data => {
                    setService(data);
                    setImgSrc(data.image);
                });
        }
    }, [id]);

    if (!service) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden min-h-[500px]">
                <figure className="lg:w-1/2 relative h-96 lg:h-auto">
                    {imgSrc && (
                        <Image
                            src={imgSrc}
                            alt={service.title}
                            fill
                            className="object-cover z-100"
                            onError={() => setImgSrc("https://placehold.co/600x400/png?text=Image+Unavailable")}
                        />
                    )}
                    <div className="absolute top-4 left-4 badge badge-secondary badge-lg shadow-lg z-10">{service.category}</div>
                </figure>
                <div className="card-body lg:w-1/2 p-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                            <h2 className="text-4xl font-bold text-gray-800">{service.title}</h2>
                            <div className={`badge ${service.availability === 'Available' ? 'badge-success' : 'badge-warning'} badge-lg text-white`}>
                                {service.availability}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            </div>
                            <span className="text-lg font-medium">({service.rating})</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{service.totalBookings} Bookings</span>
                        </div>
                    </div>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">{service.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="stat bg-blue-50 rounded-2xl p-4 border border-blue-100">
                            <div className="stat-title text-blue-600 font-medium">Price</div>
                            <div className="stat-value text-blue-700 text-3xl">{service.price} <span className="text-base font-normal">BDT</span></div>
                            <div className="stat-desc text-blue-500 font-medium">{service.duration}</div>
                        </div>
                        <div className="stat bg-purple-50 rounded-2xl p-4 border border-purple-100">
                            <div className="stat-title text-purple-600 font-medium">Features</div>
                            <div className="text-purple-700 font-bold mt-1">{service.features?.length}+ Included</div>
                            <div className="stat-desc text-purple-500 mt-1">Premium Support</div>
                        </div>
                    </div>

                    <div className="divider text-gray-400">What's Included</div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                        {service.features?.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="card-actions justify-end mt-auto">
                        <Link href={`/booking/${service._id}`} className="btn btn-primary btn-lg w-full md:w-auto">
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Reviews Section Placeholder */}
            <div className="mt-12 bg-base-100 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                <div className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>No reviews yet. Be the first to review after booking!</span>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
