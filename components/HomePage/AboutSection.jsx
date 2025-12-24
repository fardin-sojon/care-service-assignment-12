
import Image from 'next/image';

const AboutSection = () => {
    return (
        <section className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">About Care Service</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                    <Image src="/assets/images/about-care.png" className="rounded-lg shadow-2xl max-h-96 w-full object-cover" alt="About Care" width={600} height={400} />
                </div>
                <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                    <p>Our goal is to make caregiving easy, secure, and accessible for everyone. Whether you need a babysitter for a night out or full-time care for an elderly parent, we connect you with trusted professionals.</p>
                    <ul className="list-disc pl-5">
                        <li>Background Verified Caregivers</li>
                        <li>Secure Booking Process</li>
                        <li>Real-time Updates</li>
                        <li>Affordable Rates</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
