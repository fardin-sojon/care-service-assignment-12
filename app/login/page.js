"use client"
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    const onSubmit = (data) => {
        const { email, password } = data;
        setLoading(true);
        signInUser(email, password)
            .then((result) => {
                console.log(result.user);
                Swal.fire({
                    title: "Success!",
                    text: "Login successful!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    router.push(redirect || '/');
                    setLoading(false);
                });
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                });
            });
    }

    const handleGoogleLogin = () => {
        setLoading(true);
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                // Save user to DB
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                    role: 'customer' // Default role
                };
                fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log("Google User saved to DB", data);
                        Swal.fire({
                            title: "Success!",
                            text: "Login successful!",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            // Small delay to ensure auth state is updated
                            setTimeout(() => {
                                router.push(redirect || '/');
                                setLoading(false);
                            }, 100);
                        });
                    });
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                });
            });
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Acccess your bookings and manage your care services easily.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                                    {...register("password", { required: true })}
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
                            {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={loading}>
                                {loading ? <span className="loading loading-spinner"></span> : "Login"}
                            </button>
                        </div>
                        <div className="divider">OR</div>
                        <button type="button" onClick={handleGoogleLogin} className="btn btn-outline btn-accent">Continue with Google</button>
                        <p className="text-center mt-4">New here? <Link href="/register" className="link link-primary">Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
