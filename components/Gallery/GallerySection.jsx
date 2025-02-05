'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { motion } from 'framer-motion';

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

const GallerySection = ({ galleryItems }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const openModal = (media) => {
    setSelectedMedia(media);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setModalIsOpen(false);
  };

  const getGridClass = (item) => {
    if (item.size === 'large') {
      return 'sm:col-span-2';
    } else {
      return 'sm:col-span-1';
    }
  };

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Relive the memories of our past events through photos and videos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 auto-rows-[minmax(200px, auto)]">
          {galleryItems.map((item) => (
            <motion.div
              key={item._id}
              className={`relative group cursor-pointer overflow-hidden rounded-lg transform transition-all duration-300 ${getGridClass(
                item
              )}`}
              onClick={() => openModal(item)}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={item.url}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  autoPlay
                />
              )}

              <motion.div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
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
                  src={selectedMedia.url}
                  alt={selectedMedia.url}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              ) : (
                <video
                  src={selectedMedia.url}
                  alt={selectedMedia.url}
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
