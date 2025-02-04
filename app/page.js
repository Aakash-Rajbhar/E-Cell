'use client';

import AboutSection from '@/components/About/About';
import ContactSection from '@/components/Contact/Contact';
import EventsSection from '@/components/Events/Events';
import Footer from '@/components/Footer/Footer';
import GallerySection from '@/components/Gallery/Gallery';
import EcellHero from '@/components/Hero/Hero';
import Loader from '@/components/Loader/Loader';
import MagneticComponent from '@/components/MagneticComponent';
import Navbar from '@/components/Navbar/Navbar';
import ScrollTop from '@/components/scrollTop/ScrollTop';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   // Function to handle the load event
  //   const handleLoad = () => {
  //     setLoading(false); // Hide the loader when everything is loaded
  //   };

  //   // Check if the page has already loaded
  //   if (document.readyState === 'complete') {
  //     setLoading(false); // If already loaded, hide the loader immediately
  //   } else {
  //     // Add event listener for the load event
  //     window.addEventListener('load', handleLoad);
  //   }

  //   // Cleanup the event listener
  //   return () => {
  //     window.removeEventListener('load', handleLoad);
  //   };
  // }, []);

  return (
    <>
      <div className="w-full max-w-full overflow-x-hidden">
        <AnimatePresence>
          {loading && <Loader setLoading={setLoading} />}
        </AnimatePresence>

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
    </>
  );
}
