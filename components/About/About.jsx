'use client';

import { motion } from 'framer-motion';
import {
  LightBulbIcon,
  UsersIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';

const AboutSection = () => {
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
      id="about"
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
            About Us
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Empowering the next generation of innovators, leaders, and
            entrepreneurs.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Who We Are */}
          <motion.div
            variants={itemVariants}
            className="bg-neutral-800/50 p-8 rounded-xl backdrop-blur-md border border-gray-700/50 hover:border-yellow-400/30 transition-all"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-400/10 rounded-lg mb-6">
              <UsersIcon className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-4">
              Who We Are
            </h3>
            <p className="text-gray-300">
              We are a community of passionate students dedicated to fostering
              entrepreneurship and innovation. Our mission is to inspire,
              educate, and empower aspiring entrepreneurs.
            </p>
          </motion.div>

          {/* What We Do */}
          <motion.div
            variants={itemVariants}
            className="bg-neutral-800/50 p-8 rounded-xl backdrop-blur-md border border-gray-700/50 hover:border-yellow-400/30 transition-all"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-400/10 rounded-lg mb-6">
              <LightBulbIcon className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-4">
              What We Do
            </h3>
            <p className="text-gray-300">
              We organize workshops, hackathons, and networking events to
              provide students with the skills, resources, and connections
              needed to turn ideas into reality.
            </p>
          </motion.div>

          {/* Our Goals */}
          <motion.div
            variants={itemVariants}
            className="bg-neutral-800/50 p-8 rounded-xl backdrop-blur-md border border-gray-700/50 hover:border-yellow-400/30 transition-all"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-400/10 rounded-lg mb-6">
              <ChartBarIcon className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-4">Our Goals</h3>
            <p className="text-gray-300">
              To create a thriving entrepreneurial ecosystem, nurture innovative
              ideas, and bridge the gap between academia and industry.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
