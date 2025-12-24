"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionId) {
            fetch('/api/payment/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Confirmed!',
                            text: 'Your booking has been successfully paid.',
                            timer: 2000,
                            showConfirmButton: false
                        }).then(() => {
                            router.push('/my-bookings');
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Payment Verification Failed',
                            text: 'Please contact support.'
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [sessionId, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            {loading ? (
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-xl">Verifying your payment...</p>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Processing...</h2>
                    <p>Please wait while we confirm your transaction.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;
