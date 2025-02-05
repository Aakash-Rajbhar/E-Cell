'use client';
import { useState, useEffect } from 'react';
import {
  HomeIcon,
  CalendarIcon,
  SettingsIcon,
  MenuIcon,
  X,
} from 'lucide-react';
import EventForm from '@/components/Events/EventForm';
import { PhotoIcon } from '@heroicons/react/24/solid';
import EventTable from '@/components/Events/EventTable';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [events, setEvents] = useState([]); // State to store fetched events
  const [loading, setLoading] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false); // State to toggle the EventForm visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle

  const tabs = [
    { name: 'Overview', icon: <HomeIcon className="h-5 w-5" /> },
    { name: 'Events', icon: <CalendarIcon className="h-5 w-5" /> },
    { name: 'Gallery', icon: <PhotoIcon className="h-5 w-5" /> },
    { name: 'Settings', icon: <SettingsIcon className="h-5 w-5" /> },
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

  return (
    <div className="flex h-auto min-h-screen overflow-x-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`w-64 bg-neutral-900 text-white flex flex-col md:block ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="p-4 text-2xl font-bold">E-Cell Dashboard</div>
        <nav className="flex-1 px-2 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`w-full flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-700 transition ${
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

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 right-4 md:hidden bg-gray-800 text-white p-2 rounded-lg"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* Main Content */}
      <div className={`flex-1 p-8 w-full ${isSidebarOpen ? 'ml-64' : ''}`}>
        <h1 className="text-3xl font-bold mb-4">{activeTab}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {activeTab === 'Events' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setShowEventForm(!showEventForm)}
                  className="bg-yellow-400 text-black py-2 px-4 rounded-lg"
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
          {activeTab === 'Users' && (
            <p>View and manage registered users here.</p>
          )}
          {activeTab === 'Settings' && (
            <p>Customize your dashboard settings.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
