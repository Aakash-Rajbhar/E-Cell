// components/Loader.js
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-[999]"
      initial={{ opacity: 1, visibility: 'visible' }}
      animate={{ opacity: 0, visibility: 'hidden' }}
      exit={{ opacity: 1, visibility: 'visible' }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-t-transparent border-yellow-500 rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
    </motion.div>
  );
};

export default Loader;
