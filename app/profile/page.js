"use client";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { imageUpload } from "@/lib/utils";

const ProfilePage = () => {
    const { user, loading, updateUserProfile } = useContext(AuthContext);
    const router = useRouter();
    const [uploading, setUploading] = React.useState(false);
    const [dbUser, setDbUser] = React.useState(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login?redirect=/profile');
        }
    }, [user, loading, router]);

    React.useEffect(() => {
        if (user?.email) {
            fetch(`/api/users/${user.email}`)
                .then(res => res.json())
                .then(data => setDbUser(data));
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoFile = form.photo.files[0];
        const nid = form.nid.value;
        const contact = form.contact.value;
        const address = form.address.value;

        setUploading(true);

        try {
            // 1. Upload image if a new one is selected
            let photoUrl = user?.photoURL; // Keep existing photo by default
            if (photoFile) {
                photoUrl = await imageUpload(photoFile);
            }

            // 2. Update Firebase Profile
            await updateUserProfile(name, photoUrl);

            // 3. Update MongoDB Database
            const updates = {
                name,
                image: photoUrl,
                nid,
                contact,
                address
            };

            await fetch(`/api/users/${user.email}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(updates)
            });

            document.getElementById('profile_modal').close();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            });

            // Update local state
            setDbUser({ ...dbUser, ...updates });
            setUploading(false);
            router.refresh();
        } catch (error) {
            console.error(error);
            setUploading(false);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        }
    };

    // Show loading spinner while auth is loading
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-10">
                <div className="max-w-lg mx-auto bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-200 min-h-[500px] flex flex-col justify-center items-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    // If not logged in, will redirect (via useEffect)
    if (!user) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="max-w-lg mx-auto bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-200 min-h-[500px] flex flex-col justify-center">
                <div className="bg-primary/10 p-10 text-center flex-grow flex flex-col justify-center items-center">
                    <div className="avatar mb-4">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Profile" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-primary">{user?.displayName}</h2>
                    <p className="text-gray-600">{user?.email}</p>

                    <div className="mt-4 text-left w-full pl-4 space-y-2">
                        <p><strong>NID:</strong> {dbUser?.nid || 'N/A'}</p>
                        <p><strong>Contact:</strong> {dbUser?.contact || 'N/A'}</p>
                        <p><strong>Address:</strong> {dbUser?.address || 'N/A'}</p>
                    </div>

                    <button
                        className="btn btn-primary mt-6 w-full"
                        onClick={() => document.getElementById('profile_modal').showModal()}
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Profile Update Modal */}
            <dialog id="profile_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4 text-center">Update Profile</h3>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={user?.displayName}
                                    placeholder="Your Name"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Photo</span>
                                </label>
                                <input
                                    type="file"
                                    name="photo"
                                    className="file-input file-input-bordered w-full"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">NID Number</span>
                                </label>
                                <input
                                    type="text"
                                    name="nid"
                                    defaultValue={dbUser?.nid}
                                    placeholder="NID Number"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contact No</span>
                                </label>
                                <input
                                    type="text"
                                    name="contact"
                                    defaultValue={dbUser?.contact}
                                    placeholder="Contact Number"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={dbUser?.address}
                                    placeholder="Full Address"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={uploading}>
                                {uploading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ProfilePage;
