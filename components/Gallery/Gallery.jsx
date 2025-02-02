'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { motion } from 'framer-motion';

// Sample gallery data (images and videos)
const galleryData = [
  {
    id: 1,
    type: 'image',
    src: '/images/gallery/event1.jpg',
    alt: 'Startup Bootcamp 2023',
    description:
      'The Startup Bootcamp was a huge success! 🚀. Thank you to all the participants and mentors for making it possible.',
    size: 'large', // Large image
  },
  {
    id: 2,
    type: 'video',
    src: '/videos/gallery/event2.webm',
    alt: 'Innovation Hackathon',
    description: 'Check out the highlights from our Innovation Hackathon 2023.',
    size: 'small', // Small video
  },
  {
    id: 3,
    type: 'image',
    src: '/images/gallery/event3.jpg',
    alt: 'Entrepreneurship Summit 2023',
    description:
      'The Entrepreneurship Summit was a huge success! 🚀. Thank you to all the participants and mentors for making it possible.',
    size: 'small', // Small image
  },
  {
    id: 4,
    type: 'image',
    src: '/images/gallery/event4.jpg',
    alt: 'Pitch Perfect Competition',
    description:
      'Congratulations to the winners of the Pitch Perfect Competition 2023!',
    size: 'large', // Large image
  },
  {
    id: 5,
    type: 'video',
    src: '/videos/gallery/event5.webm',
    alt: 'Networking Night',
    description: 'Relive the memories from our Networking Night 2023.',
    size: 'large', // Large video
  },
  {
    id: 6,
    type: 'image',
    src: '/images/gallery/event6.jpg',
    alt: 'Workshop on AI',
    description:
      'Thank you to all the participants for attending our Workshop on AI.',
    size: 'small', // Small image
  },
  {
    id: 7,
    type: 'image',
    src: '/images/gallery/event7.jpg',
    alt: 'Tech Talk Series',
    description:
      'Join us for our Tech Talk Series on the latest trends in technology.',
    size: 'small', // Small image
  },
  {
    id: 8,
    type: 'image',
    src: '/images/gallery/event8.jpg',
    alt: 'Fireside Chat with Founders',
    description:
      'Join us for our Fireside Chat with Founders from successful startups.',
    size: 'large', // Large image
  },
  // Add more items as needed
];

// Modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 1000,
  },
};

const GallerySection = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const galleryRef = useRef(null);

  // Set app element for accessibility
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const appElement = document.getElementById('__next') || document.body;
      Modal.setAppElement(appElement);
    }
  }, []);

  const openModal = (media) => {
    setSelectedMedia(media);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setModalIsOpen(false);
  };

  // Function to dynamically calculate grid layout
  const getGridClass = (index) => {
    if (galleryData[index].size === 'large') {
      return 'sm:col-span-2';
    } else {
      return 'sm:col-span-1';
    }
  };

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-50">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Relive the memories of our past events through photos and videos.
          </p>
        </div>

        {/* Dynamic Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 auto-rows-[minmax(200px, auto)]">
          {galleryData.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative group cursor-pointer overflow-hidden rounded-lg transform transition-all duration-300 ${getGridClass(
                index
              )}`}
              onClick={() => openModal(item)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Media Thumbnail */}
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  autoPlay
                />
              )}

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="text-white text-lg font-semibold">View</span>
                {item.description && (
                  <p className="text-white text-sm text-center mt-2">
                    {item.description}
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Full-Size Media */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Media Modal"
        >
          {selectedMedia && (
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {selectedMedia.type === 'image' ? (
                <Image
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              ) : (
                <video
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  className="max-w-full max-h-[90vh]"
                  controls
                  autoPlay
                />
              )}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
              >
                &times;
              </button>
            </motion.div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default GallerySection;
