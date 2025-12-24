"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ServiceCard = ({ service }) => {
    const [imgSrc, setImgSrc] = useState(service.image);

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <figure className="relative h-48 bg-base-200">
                <Image
                    src={imgSrc || service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    onError={() => setImgSrc("https://placehold.co/600x400/png?text=Image+Unavailable")}
                />
                <div className="absolute top-2 right-2 badge badge-secondary">{service.category}</div>
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-between">
                    {service.title}
                    <div className="badge badge-outline text-xs">{service.rating} ★</div>
                </h2>
                <p className="text-sm text-base-content/70">
                    {service.description.length > 100 ? service.description.substring(0, 100) + '...' : service.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <div className="text-primary font-bold text-lg">
                        Tk {service.price} <span className="text-xs font-normal text-base-content/60">/ {service.duration === 'Per Day' ? 'Day' : 'Hr'}</span>
                    </div>
                    <div className="card-actions">
                        <Link href={`/service/${service._id}`} className="btn btn-sm btn-secondary">
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
