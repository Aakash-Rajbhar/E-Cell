'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let totalResources = 0;
    let loadedResources = 0;

    const updateProgress = () => {
      loadedResources++;
      const newProgress = Math.min(
        (loadedResources / totalResources) * 100,
        100
      );
      setProgress(newProgress);
    };

    const countResources = () => {
      const resources = document.querySelectorAll(
        "img, script, link[rel='stylesheet'], iframe, video, audio"
      );
      totalResources = resources.length;

      if (totalResources === 0) {
        setProgress(100);
        setTimeout(() => setLoading(false), 500);
        return;
      }

      resources.forEach((resource) => {
        if (resource.complete || resource.readyState === 'complete') {
          updateProgress();
        } else {
          resource.addEventListener('load', updateProgress);
          resource.addEventListener('error', updateProgress);
        }
      });
    };

    if (document.readyState === 'complete') {
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    } else {
      countResources();
      document.addEventListener('readystatechange', countResources);
    }

    window.addEventListener('load', () => {
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    });

    return () => {
      document.removeEventListener('readystatechange', countResources);
      window.removeEventListener('load', () => {});
    };
  }, [setLoading]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center z-[100]"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: progress === 100 ? 'none' : 'auto' }}
    >
      <motion.div
        className="absolute top-0 left-0 h-1 bg-yellow-500"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
      />
      <p className="text-white text-xl font-semibold mt-10">
        {Math.round(progress)}%
      </p>
    </motion.div>
  );
};

export default Loader;
