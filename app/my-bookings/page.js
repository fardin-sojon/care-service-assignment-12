
"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Add import
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2'

const MyBookings = () => {
    // Data Fetching
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const { user, loading } = useContext(AuthContext);
    const router = useRouter(); // Use useRouter

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login?redirect=/my-bookings');
        } else if (user?.email) {
            fetch(`/api/bookings?email=${user.email}`)
                .then(res => res.json())
                .then(data => setBookings(data));
        }
    }, [user, loading, router]); // Add dependencies

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBooking(id);
            }
        });
    }

    const deleteBooking = (id) => {
        fetch(`/api/bookings/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your booking has been cancelled.",
                        icon: "success"
                    });
                    const remaining = bookings.filter(booking => booking._id !== id);
                    setBookings(remaining);
                }
            })
    }

    if (loading || !user) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Duration</th>
                            <th>Location</th>
                            <th>Total Cost</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead >
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>
                                    <div className="font-bold">{booking.serviceName}</div>
                                </td>
                                <td>{booking.duration}</td>
                                <td>{booking.location?.city}, {booking.location?.address}</td>
                                <td>{booking.totalCost} BDT</td>
                                <td>
                                    <span className={`badge ${booking.status === 'Pending' ? 'badge-warning' : booking.status === 'Confirmed' || booking.status === 'Paid' ? 'badge-success' : 'badge-ghost'}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <th>
                                    {booking.status === 'Pending' && (
                                        <Link href={`/payment/${booking._id}`}>
                                            <button className="btn btn-xs btn-success mr-2">Pay</button>
                                        </Link>
                                    )}
                                    <button onClick={() => handleDelete(booking._id)} className="btn btn-xs btn-error">Cancel</button>
                                    <button
                                        onClick={() => {
                                            setSelectedBooking(booking);
                                            document.getElementById('details_modal').showModal();
                                        }}
                                        className="btn btn-xs btn-ghost ml-2"
                                    >
                                        Details
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div >
            {bookings.length === 0 && <p className="text-center mt-10">No bookings found.</p>}

            {/* Details Modal */}
            <dialog id="details_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {selectedBooking && (
                        <div>
                            <h3 className="font-bold text-2xl mb-4 text-center border-b pb-2">Booking Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-500">Service</h4>
                                    <p className="text-lg">{selectedBooking.serviceName}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-500">Booking ID</h4>
                                    <p className="text-sm">{selectedBooking._id}</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-500">Status</h4>
                                    <span className={`badge ${selectedBooking.status === 'Pending' ? 'badge-warning' : selectedBooking.status === 'Paid' ? 'badge-success' : 'badge-ghost'}`}>
                                        {selectedBooking.status}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-500">Total Cost</h4>
                                    <p className="text-lg font-bold text-primary">{selectedBooking.totalCost} BDT</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-500">Date</h4>
                                    <p>{new Date(selectedBooking.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-500">Duration</h4>
                                    <p>{selectedBooking.duration}</p>
                                </div>

                                <div className="col-span-1 md:col-span-2 mt-2 p-3 bg-base-200 rounded-lg">
                                    <h4 className="font-bold mb-2">Location Details</h4>
                                    <p><span className="font-semibold">Division:</span> {selectedBooking.location?.division}</p>
                                    <p><span className="font-semibold">District:</span> {selectedBooking.location?.district}</p>
                                    <p><span className="font-semibold">City/Upazila:</span> {selectedBooking.location?.city}</p>
                                    <p><span className="font-semibold">Address:</span> {selectedBooking.location?.address}</p>
                                </div>

                                {selectedBooking.transactionId && (
                                    <div className="col-span-1 md:col-span-2 mt-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                                        <p className="font-bold">✓ Payment Verified</p>
                                        <p className="text-xs">Transaction ID: {selectedBooking.transactionId}</p>
                                    </div>
                                )}
                            </div>

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </dialog>
        </div >
    );
};

export default MyBookings;
