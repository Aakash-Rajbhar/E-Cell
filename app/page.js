'use client';

import AboutSection from '@/components/About/About';
import ContactSection from '@/components/Contact/Contact';
import EventsSection from '@/components/Events/EventsSection';
import Footer from '@/components/Footer/Footer';
import GallerySection from '@/components/Gallery/GallerySection';
import EcellHero from '@/components/Hero/Hero';
import Loader from '@/components/Loader/Loader';
import MagneticComponent from '@/components/MagneticComponent';
import Navbar from '@/components/Navbar/Navbar';
import ScrollTop from '@/components/scrollTop/ScrollTop';
import { AnimatePresence } from 'framer-motion';
import { set } from 'mongoose';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchGalleryItems = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();

        setGalleryItems(data);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();

        if (response.ok) {
          const upcoming = data.events.filter(
            (event) => event.category === 'Upcoming'
          );
          const previous = data.events.filter(
            (event) => event.category === 'Previous'
          );

          setUpcomingEvents(upcoming);
          setPreviousEvents(previous);
        } else {
          alert('Failed to fetch events');
          console.error('Error fetching events:', data.error);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    try {
      fetchGalleryItems();
      fetchEvents();
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className="w-full max-w-full overflow-x-hidden">
        <AnimatePresence>{loading && <Loader />}</AnimatePresence>

        <Navbar />
        <EcellHero />
        <div ref={containerRef} className="w-full overflow-hidden relative z-0">
          <MagneticComponent containerRef={containerRef} />
          <AboutSection />
          <EventsSection
            upcomingEvents={upcomingEvents}
            previousEvents={previousEvents}
          />
          <GallerySection galleryItems={galleryItems} />
          <ContactSection />
        </div>
        <Footer />
        <ScrollTop />
      </div>
    </>
  );
}
