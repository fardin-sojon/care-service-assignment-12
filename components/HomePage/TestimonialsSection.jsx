
const TestimonialsSection = () => {
    return (
        <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-base-100 shadow-lg border border-base-200">
                    <div className="card-body">
                        <div className="rating rating-sm mb-2">
                            <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" checked readOnly />
                        </div>
                        <p>&quot;The best babysitting service I have used! Professional and kind.&quot;</p>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="avatar placeholder">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                    <span>SJ</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold">Sarah Jenkins</h4>
                                <span className="text-xs">Mother of 2</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-lg border border-base-200">
                    <div className="card-body">
                        <div className="rating rating-sm mb-2">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                        </div>
                        <p>&quot;Found excellent care for my father. Highly recommended.&quot;</p>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="avatar placeholder">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                    <span>MK</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold">Mike Khan</h4>
                                <span className="text-xs">Businessman</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-lg border border-base-200">
                    <div className="card-body">
                        <div className="rating rating-sm mb-2">
                            <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" checked readOnly />
                        </div>
                        <p>&quot;Reliable and trustworthy service. My family feels safe and cared for.&quot;</p>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="avatar placeholder">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                    <span>AR</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold">Ayesha Rahman</h4>
                                <span className="text-xs">Teacher</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
