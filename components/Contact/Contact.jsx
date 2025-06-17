'use client';

import { useState } from 'react';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const ContactSection = () => {
  const [isFormClosed, setIsFormClosed] = useState(false); // Track if the form is closed

  // Form URL (it may stay the same, but manually check if it's open or closed)
  const formUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLScV2Dz0qHtu8RtIr5AiDa1NRAFhaJ59D1f03laEEVdUX9i_TQ/viewform?embedded=true';

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Get in touch with us for any queries or collaborations. We'd love to
            hear from you!
          </p>
        </div>

        {/* Contact Information and Google Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Email */}
            <div className="hover:scale-105 hover:border-yellow-400/40 transition-all ease-in 300ms flex bg-neutral-800/50 rounded-xl backdrop-blur-md border border-gray-700/50 p-6 items-start space-x-4">
              <EnvelopeIcon className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="text-xl font-bold text-gray-100">Email</h3>
                <p className="text-gray-300">
                  <a
                    href="mailto:ecell@college.edu"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    ecell@college.edu
                  </a>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="hover:scale-105 hover:border-yellow-400/40 transition-all ease-in 300ms flex bg-neutral-800/50 rounded-xl backdrop-blur-md border border-gray-700/50 p-6 items-start space-x-4">
              <PhoneIcon className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="text-xl font-bold text-gray-100">Phone</h3>
                <p className="text-gray-300">
                  <a
                    href="tel:+911234567890"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    +91 966-7441-895
                  </a>
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="hover:scale-105 hover:border-yellow-400/40 transition-all ease-in 300ms flex bg-neutral-800/50 rounded-xl backdrop-blur-md border border-gray-700/50 p-6 items-start space-x-4">
              <MapPinIcon className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="text-xl font-bold text-gray-100">Follow Us</h3>
                <div className="flex space-x-6 mt-2">
                  <a
                    href="https://linkedin.com/company/ecell-adgitm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://twitter.com/ecell"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <FaTwitter className="h-6 w-6" />
                  </a>
                  <a
                    href="https://instagram.com/ecell"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://facebook.com/ecelladgips"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <FaFacebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Google Form Embed */}
          <div className="bg-neutral-800/50 rounded-xl backdrop-blur-md border border-gray-700/50 p-4 w-full">
            <h3 className="text-2xl font-bold text-gray-100 mb-6">
              Register for Upcoming Events
            </h3>

            {/* Check if the form is closed */}
            {isFormClosed ? (
              <div className="text-center text-gray-300 text-lg py-10">
                🎉 Currently, no events are upcoming.
              </div>
            ) : (
              <iframe
                src={formUrl}
                width="100%"
                height="400"
                className="rounded-lg"
                title="Google Form"
              >
                Loading…
              </iframe>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
