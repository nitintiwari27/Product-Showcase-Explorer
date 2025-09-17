import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Filter, Grid, List, Search } from 'lucide-react';
import Button from '../ui/Button';

const Header = ({ 
  onToggleFilters, 
  onToggleViewMode, 
  viewMode = 'grid',
  cartItemsCount = 0,
  className = '' 
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white shadow-sm border-b border-gray-200 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <h1 className="text-2xl font-bold text-blue-600">
              Product Showcase Explorer
            </h1>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

