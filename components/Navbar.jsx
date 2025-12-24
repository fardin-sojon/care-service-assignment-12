"use client"
import Link from 'next/link';
import Image from 'next/image';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [profileImg, setProfileImg] = useState("https://res.cloudinary.com/dnv4bs90s/image/upload/v1766586547/lm5qsbommvqxryozyjv3.webp");

    useEffect(() => {
       if(user?.photoURL) {
         setProfileImg(user.photoURL);
       }
    }, [user?.photoURL]);

    const handleLogOut = () => {
        logOut()
            .then(() => console.log('Logged out'))
            .catch(error => console.error(error))
    }

    const navLinks = <>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/services">Services</Link></li>
        {user && <li><Link href="/my-bookings">My Bookings</Link></li>}
    </>

    return (
        <div className="bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar container mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
                    <Image src="/assets/logo/care-service-logo.png" alt="Care Service" width={32} height={32} className="h-8 w-8" />
                    Care Service
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-primary/20 hover:border-primary">
                            <div className="w-10 h-10 rounded-full relative">
                                <Image
                                    alt="User Profile"
                                    src={profileImg}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover w-full h-full"
                                    onError={() => setProfileImg("https://i.ibb.co/MgsD15N/user.png")}
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-200">
                            <li className="menu-title px-4 py-2 border-b border-base-200 mb-2">
                                <span className="text-primary font-bold">{user?.displayName || "User"}</span>
                                <span className="text-xs font-normal text-base-content/60 truncate max-w-[150px]">{user?.email}</span>
                            </li>
                            <li><Link href="/profile">Profile</Link></li>
                            <li><Link href="/my-bookings">My Bookings</Link></li>
                            <div className="divider my-1"></div>
                            <li><button onClick={handleLogOut} className="text-error">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/login" className="btn btn-primary btn-sm md:btn-md">Login</Link>
                        <Link href="/register" className="btn btn-outline btn-primary btn-sm md:btn-md hidden md:flex">Register</Link>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default Navbar;
