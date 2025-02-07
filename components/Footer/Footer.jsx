'use client';

import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-t border-gray-700/50 z-[99]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-100 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#events"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-100 mb-4">
                Contact Us
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:ecell@college.edu"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    ecell@college.edu
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+911234567890"
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    +91 12345 67890
                  </a>
                </li>
                <li>
                  <p className="text-gray-300">
                    123, Main Street, <br />
                    City, Country, Pincode
                  </p>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-100 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-6">
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
                  href="https://instagram.com/ecelladgips"
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
          {/* Newsletter Subscription (Optional) */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-100 mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest events and news.
            </p>
            <form className="flex space-x-2 max-w-64">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-gray-100 focus:outline-none focus:border-yellow-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 text-neutral-900 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} E-Cell | ADGIPS. All rights
            reserved.
          </p>
          <p className="text-gray-300">
            <a
              href="/privacy-policy"
              className="hover:text-yellow-400 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
