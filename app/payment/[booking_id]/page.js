
"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const PaymentPage = ({ params }) => {
    // Note: In Next 15 params is a promise, so we need to handle it, 
    // but for Client Components (use client), props are passed regularly in older versions, 
    // or use `useParams` hook.
    // However, if this is a page receiving params as prop:
    // Safer to use useParams() hook in client component for dynamic segments

    const { booking_id } = useParams();
    const router = useRouter(); // To handle redirect if needed, though window.location is used for external
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (booking_id) {
            fetch(`/api/bookings/${booking_id}`)
                .then(res => res.json())
                .then(data => setBooking(data));
        }
    }, [booking_id])


    const handlePayment = () => {
        setLoading(true);
        fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId: booking._id })
        })
            .then(res => res.json())
            .then(data => {
                if (data.url) {
                    window.location.href = data.url; // Redirect to Stripe
                } else {
                    console.error("Failed to create checkout session", data);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };


    // Wait for booking data
    if (!booking) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Payment</h2>
            <div className="card w-full max-w-md mx-auto shadow-2xl bg-base-100">
                <div className="card-body">
                    <h3 className="card-title text-2xl mb-4">Payment for {booking.serviceName}</h3>

                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Amount to Pay:</span>
                        <span className="text-xl font-bold text-primary">${booking.totalCost}</span>
                    </div>

                    <p className="text-gray-500 mb-6">You will be redirected to Stripe's secure payment page to complete the transaction.</p>

                    <button
                        onClick={handlePayment}
                        className="btn btn-primary w-full text-lg"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Pay with Stripe"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
