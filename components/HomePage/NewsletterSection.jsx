"use client";
import Swal from 'sweetalert2';

const NewsletterSection = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        const emailInput = e.target.closest('div').querySelector('input');
        
        if (emailInput.value) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Subscribed successfully!",
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
            emailInput.value = "";
        } else {
             Swal.fire({
                position: "top",
                icon: "error",
                title: "Please enter your email",
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
        }
    }

    return (
        <section className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-2xl mx-auto bg-primary text-primary-content p-10 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="mb-8">Subscribe to our newsletter for the latest updates, caregiving tips, and exclusive offers.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <input suppressHydrationWarning type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs text-base-content" />
                    <button onClick={handleSubscribe} className="btn btn-secondary">Subscribe</button>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
