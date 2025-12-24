
const WhyChooseUsSection = () => {
    return (
        <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Care Service?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="p-6 border rounded-box bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4 text-primary">🛡️</div>
                    <h3 className="font-bold text-xl mb-2">Verified Professionals</h3>
                    <p className="text-sm">Every caregiver undergoes a strict background check.</p>
                </div>
                <div className="p-6 border rounded-box bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4 text-secondary">🕒</div>
                    <h3 className="font-bold text-xl mb-2">24/7 Support</h3>
                    <p className="text-sm">Our support team is always available to assist you.</p>
                </div>
                <div className="p-6 border rounded-box bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4 text-accent">💳</div>
                    <h3 className="font-bold text-xl mb-2">Secure Payments</h3>
                    <p className="text-sm">Safe and transparent transaction process.</p>
                </div>
                <div className="p-6 border rounded-box bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4 text-success">😊</div>
                    <h3 className="font-bold text-xl mb-2">Satisfaction Guaranteed</h3>
                    <p className="text-sm">Not happy? We will make it right.</p>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
