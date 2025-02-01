'use client';

import AboutSection from '@/components/About/About';
import ContactSection from '@/components/Contact/Contact';
import EventsSection from '@/components/Events/Events';
import Footer from '@/components/Footer/Footer';
import GallerySection from '@/components/Gallery/Gallery';
import EcellHero from '@/components/Hero/Hero';
import Navbar from '@/components/Navbar/Navbar';
import ScrollTop from '@/components/scrollTop/ScrollTop';

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Navbar />
      <EcellHero />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <ContactSection />
      <ScrollTop />
      <Footer />
    </div>
  );
}
