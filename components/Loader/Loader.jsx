'use client';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 bg-black z-[100] overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    >
      <motion.div
        className="relative w-24 h-24"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
        }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-yellow-500 rounded-full animate-pulse" />

        {/* Inner spinner */}
        <motion.div
          className="absolute inset-2 border-4 border-t-4 border-t-black border-yellow-500 rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
    </div>
  );
};

export default Loader;
