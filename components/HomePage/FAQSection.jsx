
const FAQSection = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="join join-vertical w-full bg-base-100 shadow-lg rounded-xl">
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" defaultChecked />
                        <div className="collapse-title text-xl font-medium">How do I verify a caregiver?</div>
                        <div className="collapse-content">
                            <p>All our caregivers are pre-verified. You can view their verified badge and detailed background checks on their profile.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">Is there a booking fee?</div>
                        <div className="collapse-content">
                            <p>We charge a small platform fee to ensure secure transactions and maintain our high service standards.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">Can I cancel a booking?</div>
                        <div className="collapse-content">
                            <p>Yes, you can cancel up to 24 hours before the scheduled time for a full refund.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
