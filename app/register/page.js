'use client';

import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { AuthContext } from '@/providers/AuthProvider';
import { imageUpload } from '@/lib/utils';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) { // 4MB limit
                Swal.fire({
                    title: "File too large",
                    text: "Please select an image under 4MB",
                    icon: "warning"
                });
                e.target.value = null; // Clear input
                setSelectedImage(null);
                return;
            }
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        const { name, email, password, contact, nid, address, image } = data;

        if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
            Swal.fire({
                title: "Configuration Error",
                text: "Cloudinary keys are missing in .env.local",
                icon: "error"
            });
            return;
        }

        setLoading(true);

        try {
            console.log("Starting registration...");
            // 1. Upload Image
            console.log("Uploading image...");
            const imageUrl = await imageUpload(image[0]);
            console.log("Image uploaded:", imageUrl);

            // 2. Create User
            console.log("Creating user in Firebase...");
            const result = await createUser(email, password);
            console.log("User created:", result.user);

            // 3. Update Firebase Profile
            console.log("Updating Firebase profile...");
            await updateUserProfile(name, imageUrl);
            console.log("Profile updated");

            // 4. Save to Database
            const userInfo = {
                email: result.user?.email,
                name: name,
                image: imageUrl,
                role: 'customer',
                nid: nid,
                contact: contact,
                address: address
            };

            console.log("Saving to MongoDB...", userInfo);
            const dbResponse = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });

            const dbData = await dbResponse.json();
            console.log("User profile updated and saved to DB", dbData);

            Swal.fire({
                title: "Success!",
                text: "Registration successful!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                router.push(redirect || '/');
                setLoading(false);
            });

        } catch (error) {
            console.error(error);
            setLoading(false);
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error"
            });
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Join Care Service to find the best care services for your family.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="input input-bordered"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">NID Number</span>
                            </label>
                            <input
                                type="text"
                                placeholder="NID Number"
                                className="input input-bordered"
                                {...register("nid", { required: true })}
                            />
                            {errors.nid && <span className="text-red-500 text-sm">NID is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contact No</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Contact Number"
                                className="input input-bordered"
                                {...register("contact", { required: true })}
                            />
                            {errors.contact && <span className="text-red-500 text-sm">Contact is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    className="input input-bordered w-full pr-10"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        pattern: /(?=.*[A-Z])(?=.*[a-z])/
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password?.type === 'required' && <span className="text-red-500 text-sm">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-500 text-sm">Password must be 6+ chars</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-500 text-sm">Password must have 1 uppercase and 1 lowercase</span>}
                            <label className="label">
                                <span className="label-text-alt text-error">Must be 6+ chars, 1 uppercase, 1 lowercase</span>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Image</span>
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    {...register("image", {
                                        required: true,
                                        onChange: handleImageChange
                                    })}
                                />
                                {selectedImage && (
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={selectedImage} alt="Preview" className="object-cover w-full h-full" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={loading}>
                                {loading ? <span className="loading loading-spinner"></span> : "Register"}
                            </button>
                        </div>
                        <p className="text-center mt-4">Already have an account? <Link href="/login" className="link link-primary">Login</Link></p>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default Register;
