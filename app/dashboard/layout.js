
"use client";
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isRoleLoading, setIsRoleLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (user?.email) {
            fetch(`/api/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.role === 'admin') {
                        setIsAdmin(true);
                    } else {
                        router.push('/');
                    }
                    setIsRoleLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setIsRoleLoading(false);
                    router.push('/');
                });
        }
    }, [user, router]);

    if (loading || isRoleLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (!isAdmin) {
        return null; // or a forbidden page
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col p-10 bg-base-200 min-h-screen">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">Open Drawer</label>
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content border-r border-base-200">
                    <div className="mb-6 px-4">
                        <Link href="/" className="text-xl font-bold text-primary">Care Service Admin</Link>
                    </div>
                    <li><Link href="/dashboard">Dashboard Home</Link></li>
                    <li><Link href="/dashboard/all-users">All Users</Link></li>
                    <li><Link href="/dashboard/bookings">All Bookings</Link></li>
                    <div className="divider"></div>
                    <li><Link href="/">Home</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
