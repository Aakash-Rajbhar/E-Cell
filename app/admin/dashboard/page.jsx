'use client';
import { useState, useEffect } from 'react';
import { HomeIcon, CalendarIcon, MenuIcon, X } from 'lucide-react';
import EventForm from '@/components/Events/EventForm';
import { PhotoIcon } from '@heroicons/react/24/solid';
import EventTable from '@/components/Events/EventTable';
import Overview from '@/components/Dashboard/Overview';
import Gallery from '@/components/Dashboard/Gallery';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [events, setEvents] = useState([]); // State to store fetched events
  const [loading, setLoading] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false); // State to toggle the EventForm visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for mobile sidebar toggle

  const tabs = [
    { name: 'Overview', icon: <HomeIcon className="h-5 w-5" /> },
    { name: 'Events', icon: <CalendarIcon className="h-5 w-5" /> },
    { name: 'Gallery', icon: <PhotoIcon className="h-5 w-5" /> },
  ];

  // Fetch events when "Events" tab is active
  useEffect(() => {
    if (activeTab === 'Events') {
      const fetchEvents = async () => {
        setLoading(true);
        try {
          const res = await fetch('/api/events');
          const data = await res.json();
          if (res.ok) {
            setEvents(data.events); // Store the fetched events
          } else {
            console.error('Failed to fetch events');
          }
        } catch (error) {
          console.error('Error fetching events:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }
  }, [activeTab]); // Fetch events whenever the active tab changes to 'Events'

  // Delete event function
  const deleteEvent = async (eventId) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this event?'
    );
    if (isConfirmed) {
      try {
        // API request to delete the event from the backend
        const res = await fetch(`/api/events?id=${eventId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          // Remove event from local state after successful deletion
          setEvents(events.filter((event) => event._id !== eventId));
          alert('Event deleted successfully');
        } else {
          alert('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event');
      }
    }
  };

  // Ensure sidebar is always open on large devices
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (
    typeof window !== 'undefined' &&
    localStorage.getItem('isAdmin') !== 'true'
  ) {
    redirect('/admin');
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    redirect('/admin');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`absolute md:fixed top-0 left-0 h-full w-64 bg-neutral-800 text-white flex flex-col justify-between px-2 py-4 transition-transform transform-gpu z-50 
          ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        <div>
          <h2 className="p-4 text-2xl font-bold">E-Cell Dashboard</h2>
          <nav className="flex-1 px-2 space-y-2 justify-between h-full">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`w-full flex items-center gap-2 p-2 rounded-full hover:bg-neutral-700 transition ${
                  activeTab === tab.name ? 'bg-yellow-500 text-black' : ''
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex justify-center p-2">
          <button
            className="w-full text-black rounded-full bg-yellow-500 py-3 hover:bg-neutral-700 transition hover:text-white "
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 right-4 md:hidden bg-gray-800 text-white p-2 rounded-lg z-50"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 p-4 lg:p-8 overflow-y-auto ${
          isSidebarOpen ? 'md:ml-64' : ''
        }`}
        style={{ height: '100vh' }}
      >
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
          {activeTab === 'Overview' && <Overview />}
          {activeTab === 'Events' && (
            <div>
              <div className="flex justify-end items-center mb-4">
                <button
                  onClick={() => setShowEventForm(!showEventForm)}
                  className={`${
                    showEventForm ? 'bg-red-500 text-white' : 'bg-yellow-400'
                  } text-black py-2 px-4 rounded-lg`}
                >
                  {showEventForm ? 'Cancel' : 'Add Event'}
                </button>
              </div>
              {showEventForm ? (
                <EventForm />
              ) : (
                <EventTable events={events} onDeleteEvent={deleteEvent} />
              )}
            </div>
          )}
          {activeTab === 'Gallery' && <Gallery />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
