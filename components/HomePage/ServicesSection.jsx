
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';

const ServicesSection = ({ services }) => {
    return (
        <section id="services" className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.length > 0 ? services.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    )) : (
                        <div className="col-span-3 text-center py-20">
                            <div className="max-w-md mx-auto">
                                <h3 className="text-2xl font-bold mb-4">No Services Available</h3>
                                <p className="mb-6">It looks like our database is empty. Seed it to see our services in action.</p>
                                <Link href="/api/seed" target="_blank" className="btn btn-primary">Seed Database</Link>
                            </div>
                        </div>
                    )}
                </div>
                <div className="text-center mt-12">
                    <Link href="/services" className="btn btn-outline btn-secondary btn-wide">See All Services</Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
