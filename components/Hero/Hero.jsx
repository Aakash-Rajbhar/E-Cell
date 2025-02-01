'use client';

import { motion } from 'framer-motion';
import { RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/solid';

const EcellHero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute top-20 left-40 w-48 h-48 bg-purple-500 rounded-full mix-blend-screen opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-32 w-56 h-56 bg-blue-500 rounded-full mix-blend-screen opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-screen opacity-30 animate-blob animation-delay-4000"></div>
      </motion.div>

      {/* Main Content */}
      <div className="relative w-screen mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="text-center w-full">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SparklesIcon className="h-16 w-16 text-yellow-400 mx-auto mb-8 animate-pulse" />
          </motion.div>

          {/* Animated Welcome Text */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-4xl font-medium text-gray-200 mb-2"
          >
            Welcome to <span className="text-yellow-400">E-Cell, ADGIPS</span>
          </motion.div>

          {/* Ignite Innovation Text */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl/relaxed font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2"
          >
            Ignite Innovation
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-3xl text-gray-200 mb-12 max-w-3xl mx-auto"
          >
            Join the entrepreneurship revolution. Build, Learn, and Grow with
            the E-Cell Community
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <button className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform duration-300">
              <RocketLaunchIcon className="h-6 w-6 inline-block mr-2 group-hover:rotate-45 transition-transform" />
              Launch Your Journey
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-20 left-10 animate-float">
        <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-50"></div>
      </div>
      <div className="absolute top-20 right-10 animate-float animation-delay-2000">
        <div className="w-12 h-12 bg-purple-400 rounded-full opacity-50"></div>
      </div>
    </section>
  );
};

export default EcellHero;
