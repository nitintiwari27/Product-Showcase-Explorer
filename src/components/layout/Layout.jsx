import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ 
  children, 
  onToggleFilters, 
  onToggleViewMode, 
  viewMode,
  cartItemsCount,
  className = '' 
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${className}`}>
      <Header
        onToggleFilters={onToggleFilters}
        onToggleViewMode={onToggleViewMode}
        viewMode={viewMode}
        cartItemsCount={cartItemsCount}
      />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1"
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Layout;

