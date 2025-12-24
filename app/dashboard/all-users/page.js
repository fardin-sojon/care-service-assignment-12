
"use client";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Promote ${user.name} to Admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Do It!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/users/${user.email}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ role: 'admin' })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            Swal.fire("Success", `${user.name} is now an Admin!`, "success");
                            fetchUsers();
                        }
                    });
            }
        });
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">All Users</h2>
            <div className="overflow-x-auto bg-base-100 rounded-2xl shadow">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ?
                                        <span className="badge badge-primary">Admin</span> :
                                        <span className="badge badge-ghost">User</span>
                                    }
                                </td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <button className="btn btn-xs btn-disabled" disabled>Admin</button>
                                    ) : (
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-xs btn-outline btn-primary">
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
