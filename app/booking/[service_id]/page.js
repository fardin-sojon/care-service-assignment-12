"use client"
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

import { divisions } from '../../data/bangladeshData';

const Booking = () => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();
    const params = useParams();
    const serviceId = params?.service_id;

    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    // Derived state for dropdowns
    const availableDistricts = divisions.find(d => d.name === selectedDivision)?.districts || [];
    const availableUpazilas = availableDistricts.find(d => d.name === selectedDistrict)?.upazilas || [];

    const [service, setService] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            duration: 1,
            durationType: 'hour'
        }
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push(`/login?redirect=/booking/${serviceId}`);
        }
    }, [user, loading, router, serviceId]);

    useEffect(() => {
        if (serviceId) {
            fetch(`/api/services/${serviceId}`)
                .then(res => res.json())
                .then(data => setService(data));
        }
    }, [serviceId]);

    if (loading || !user) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;
    if (!service) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    const calculateTotal = (duration, durationType) => {
        if (!duration) return 0;
        let multiplier = 1;
        if (durationType === 'day') {
            multiplier = 24;
        }
        return service.price * duration * multiplier;
    };

    const handleBooking = async (data) => {
        const { duration, durationType, division, district, city, address } = data;
        const bookingData = {
            serviceId,
            serviceName: service.title,
            duration: `${duration} ${durationType}`,
            location: { division, district, city, address },
            totalCost: calculateTotal(duration, durationType),
            status: 'Pending',
            date: new Date().toISOString(),
            email: user?.email
        };
        console.log('Booking Data:', bookingData);
        // Here we would send to API
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });
            if (response.ok) {
                Swal.fire({
                    title: "Booking Confirmed!",
                    text: "Proceeding to payment...",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                const result = await response.json();
                router.push(`/payment/${result.insertedId}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10 max-w-2xl">
            <h2 className="text-3xl font-bold text-center mb-8">Book {service.title}</h2>

            <form onSubmit={handleSubmit(handleBooking)} className="card bg-base-100 shadow-xl p-8 space-y-4">

                {/* Service Info Readonly */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Service</span></label>
                    <input type="text" value={service.title} readOnly className="input input-bordered bg-base-200" />
                </div>

                {/* Duration */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Duration</span></label>
                        <input
                            type="number"
                            min="1"
                            className="input input-bordered"
                            {...register("duration", { required: true, min: 1 })}
                        />
                        {errors.duration && <span className="text-red-500 text-sm">Duration is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Unit</span></label>
                        <select className="select select-bordered" {...register("durationType")}>
                            <option value="hour">Hours</option>
                            <option value="day">Days</option>
                        </select>
                    </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Division</span></label>
                        <select
                            className="select select-bordered"
                            {...register("division", {
                                required: true,
                                onChange: (e) => {
                                    setSelectedDivision(e.target.value);
                                    setSelectedDistrict(''); 
                                }
                            })}
                        >
                            <option value="">Select Division</option>
                            {divisions.map(div => (
                                <option key={div.id} value={div.name}>{div.name}</option>
                            ))}
                        </select>
                        {errors.division && <span className="text-red-500 text-sm">Division is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">District</span></label>
                        <select
                            className="select select-bordered"
                            disabled={!selectedDivision}
                            {...register("district", {
                                required: true,
                                onChange: (e) => setSelectedDistrict(e.target.value)
                            })}
                        >
                            <option value="">Select District</option>
                            {availableDistricts.map(dist => (
                                <option key={dist.id} value={dist.name}>{dist.name}</option>
                            ))}
                        </select>
                        {errors.district && <span className="text-red-500 text-sm">District is required</span>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">City / Upazila</span></label>
                        <select
                            className="select select-bordered"
                            disabled={!selectedDistrict}
                            {...register("city", { required: true })}
                        >
                            <option value="">Select City / Upazila</option>
                            {availableUpazilas.map(upz => (
                                <option key={upz} value={upz}>{upz}</option>
                            ))}
                        </select>
                        {errors.city && <span className="text-red-500 text-sm">City is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Area / Address</span></label>
                        <input
                            type="text"
                            placeholder="House, Road, Area"
                            className="input input-bordered"
                            {...register("address", { required: true })}
                        />
                        {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
                    </div>
                </div>

                {/* Total Cost */}
                <div className="alert alert-success mt-4">
                    <div>
                        <h3 className="font-bold">Total Cost</h3>
                        <div className="text-xl">{calculateTotal(watch("duration"), watch("durationType"))} BDT</div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-6">Confirm Booking</button>

            </form>
        </div>
    );
};

export default Booking;
