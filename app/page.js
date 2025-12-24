
import Link from 'next/link';
import Image from 'next/image';
import clientPromise from '@/lib/connectDB';
import ServiceCard from '@/components/ServiceCard';

async function getServices() {
  try {
    const client = await clientPromise;
    const db = client.db("care_service");
    const services = await db.collection("services").find({}).limit(3).toArray();
    // Convert ObjectId to string to avoid serialization warning in Client Components if passed down, 
    // but here we render directly.
    return JSON.parse(JSON.stringify(services));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home() {
  const services = await getServices();

  return (
    <div className="flex flex-col gap-10">
      {/* Enhanced Hero Section */}
      <div className="hero min-h-[80vh] bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
        </div>

        <div className="hero-content text-center relative z-10 py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-block mb-6">
              <div className="badge badge-primary badge-lg gap-2 py-4 px-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Trusted by 1000+ Families
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Caring for your loved ones
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl mb-8 text-base-content/80 max-w-2xl mx-auto">
              Professional care services for children, elderly, and those who need special attention.
              We connect you with verified, compassionate caregivers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/services" className="btn btn-primary btn-lg gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Care Services
              </Link>
              <Link href="/register" className="btn btn-outline btn-lg gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Join as Provider
              </Link>
            </div>

            {/* Stats */}
            <div className="stats stats-vertical lg:stats-horizontal shadow-lg bg-base-100/80 backdrop-blur">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="stat-title">Verified Caregivers</div>
                <div className="stat-value text-primary">500+</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="stat-title">Successful Bookings</div>
                <div className="stat-value text-secondary">5,000+</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="stat-title">Average Rating</div>
                <div className="stat-value text-accent">4.9</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
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

      {/* Services Section */}
      <section id="services" className="bg-base-200 py-16">
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

      {/* Testimonials */}
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
      {/* How It Works Section */}
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="steps steps-vertical lg:steps-horizontal w-full">
            <div className="step step-primary">Search for efficient caregivers in your area</div>
            <div className="step step-primary">Review profiles and book your preferred time</div>
            <div className="step step-primary">Relax while our professional takes care of everything</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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

      {/* FAQ Section */}
      <section className="bg-base-200 py-16">
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

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-primary text-primary-content p-10 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">Subscribe to our newsletter for the latest updates, caregiving tips, and exclusive offers.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input suppressHydrationWarning type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs text-base-content" />
            <button className="btn btn-secondary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
