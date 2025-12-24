
"use client";
import React, { useEffect, useState } from 'react';

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Needs an API to get ALL bookings, reusing the one with no email query might return all if designed so
        // Or creating a specific logic for admin. 
        // For now, let's assume /api/bookings returns ALL if no email provided and user is verified? 
        // Actually, previous implementation filters by email query if present. 
        // We need to verify /api/bookings behavior for "get all".
        fetch('/api/bookings/all') // Use a specific route for all bookings to verify admin access
            .then(res => res.json())
            .then(data => setBookings(data));
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">All Bookings</h2>
            <div className="overflow-x-auto bg-base-100 rounded-2xl shadow">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>User Email</th>
                            <th>Service</th>
                            <th>Total Cost</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover">
                                <td>
                                    <div className="font-bold">{booking.userEmail || booking.email}</div>
                                </td>
                                <td>{booking.serviceName}</td>
                                <td>${booking.totalCost}</td>
                                <td>
                                    <span className={`badge ${booking.status === 'Paid' ? 'badge-primary' : booking.status === 'Pending' ? 'badge-warning' : 'badge-ghost'}`}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBookings;
