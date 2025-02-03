'use client';

import AboutSection from '@/components/About/About';
import ContactSection from '@/components/Contact/Contact';
import EventsSection from '@/components/Events/Events';
import Footer from '@/components/Footer/Footer';
import GallerySection from '@/components/Gallery/Gallery';
import EcellHero from '@/components/Hero/Hero';
import MagneticComponent from '@/components/MagneticComponent';
import Navbar from '@/components/Navbar/Navbar';
import ScrollTop from '@/components/scrollTop/ScrollTop';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

export default function Home() {
  const containerRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Navbar />
      <EcellHero />
      <div ref={containerRef} className="w-full overflow-hidden relative z-0">
        <MagneticComponent containerRef={containerRef} />
        <AboutSection />
        <EventsSection />
        <GallerySection />
        <ContactSection />
      </div>
      <Footer />
      <ScrollTop />
    </div>
  );
}
