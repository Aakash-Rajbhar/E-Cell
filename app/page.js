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
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [galleryRes, eventsRes] = await Promise.all([
          fetch('/api/gallery'),
          fetch('/api/events'),
        ]);

        const galleryData = await galleryRes.json();
        const eventsData = await eventsRes.json();

        const upcoming = eventsData.events.filter(
          (event) => event.category === 'Upcoming'
        );
        const previous = eventsData.events.filter(
          (event) => event.category === 'Previous'
        );

        setGalleryItems(galleryData);
        setUpcomingEvents(upcoming);
        setPreviousEvents(previous);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />; // Show loader while data is being fetched
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Navbar />
      <EcellHero />
      <div ref={containerRef}>
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
  );
}
