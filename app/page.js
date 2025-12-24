import clientPromise from '@/lib/connectDB';
import HeroSection from '@/components/HomePage/HeroSection';
import AboutSection from '@/components/HomePage/AboutSection';
import ServicesSection from '@/components/HomePage/ServicesSection';
import HowItWorksSection from '@/components/HomePage/HowItWorksSection';
import TestimonialsSection from '@/components/HomePage/TestimonialsSection';
import WhyChooseUsSection from '@/components/HomePage/WhyChooseUsSection';
import FAQSection from '@/components/HomePage/FAQSection';
import NewsletterSection from '@/components/HomePage/NewsletterSection';

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
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services} />
      <TestimonialsSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
}
