import { useEffect, useState } from 'react';

const Overview = () => {
  const [galleryItems, setGalleryItems] = useState(0);
  const [events, setEvents] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (res.ok) {
          setGalleryItems(data.length);
        } else {
          console.error('Failed to fetch gallery items');
        }
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        if (res.ok) {
          setEvents(data.events.length);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchGalleryItems(), fetchEvents()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTotalItems(galleryItems + events);
  }, [galleryItems, events]);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-4">E-Cell Dashboard Overview</h2>
      <p className="text-lg mb-8">
        Welcome to the E-Cell Dashboard! Below is a quick overview of the
        current status of our events, users, and gallery.
      </p>

      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">No. of Events</h3>
            <p className="text-4xl font-bold">{events}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">No. of Gallery Items</h3>
            <p className="text-4xl font-bold">{galleryItems}/10</p>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Items</h3>
            <p className="text-4xl font-bold">{totalItems}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
