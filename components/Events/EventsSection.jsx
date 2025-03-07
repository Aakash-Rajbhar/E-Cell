'use client';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const EventsSection = ({ upcomingEvents, previousEvents }) => {
  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Events
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our upcoming and past events designed to inspire and empower
            entrepreneurs.
          </p>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-100 mb-8">
            Upcoming Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event._id}
                variants={itemVariants}
                className="bg-neutral-800/50 rounded-xl backdrop-blur-md border border-gray-700/50 hover:border-yellow-400/30 transition-all overflow-hidden"
              >
                {/* Event Poster */}
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={event.image} // Correct image URL
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Event Details */}
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-gray-100 mb-4">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-4 text-gray-300 mb-4">
                    <CalendarIcon className="h-5 w-5 text-yellow-400" />
                    <span>
                      {new Date(event.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300 mb-4">
                    <ClockIcon className="h-5 w-5 text-yellow-400" />
                    <span>Timing will be updated</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300 mb-6">
                    <MapPinIcon className="h-5 w-5 text-yellow-400" />
                    <span>{event.venue}</span>
                  </div>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Previous Events */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-100 mb-8">
            Previous Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {previousEvents.map((event) => (
              <motion.div
                key={event._id}
                variants={itemVariants}
                className="bg-neutral-800/50 rounded-xl backdrop-blur-md border border-gray-700/50 hover:border-yellow-400/30 transition-all overflow-hidden"
              >
                {/* Event Poster */}
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Event Details */}
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-gray-100 mb-4">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-4 text-gray-300 mb-4">
                    <CalendarIcon className="h-5 w-5 text-yellow-400" />
                    <span>
                      {new Date(event.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300 mb-6">
                    <MapPinIcon className="h-5 w-5 text-yellow-400" />
                    <span>{event.venue}</span>
                  </div>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
