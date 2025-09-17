import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ className = '' }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-gray-50 border-t border-gray-200 py-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600">
            © 2025 Product Showcase Explorer. Built with React, Redux, and Framer Motion.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Data provided by DummyJSON API
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

