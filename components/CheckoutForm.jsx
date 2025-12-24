
"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CheckoutForm = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const price = booking.totalCost; // Booking price

    useEffect(() => {
        if (price > 0) {
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId: booking._id }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [price, booking._id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("payment error", error);
            setError(error.message);
        } else {
            console.log("payment method", paymentMethod);
            setError("");
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: booking?.userEmail || "anonymous",
                    name: booking?.userName || "anonymous",
                },
            },
        });

        if (confirmError) {
            console.log("confirm error", confirmError);
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("transaction id", paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // Update booking status in database
                const paymentInfo = {
                    status: 'Paid',
                    transactionId: paymentIntent.id
                }

                fetch(`/api/bookings/${booking._id}`, {
                    method: 'PATCH',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(paymentInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('Booking status updated', data);
                        Swal.fire({
                            icon: "success",
                            title: "Payment Successful",
                            text: `Transaction ID: ${paymentIntent.id}`,
                            showConfirmButton: false,
                            timer: 2000
                        }).then(() => {
                            router.push('/my-bookings');
                        });
                    });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button className="btn btn-primary btn-sm mt-4 my-2" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
