import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import SearchFilter from './SearchFilter';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import RatingFilter from './RatingFilter';
import Button from '../ui/Button';

const FilterPanel = ({ 
  isOpen, 
  onClose,
  filters,
  onFiltersChange,
  categories = [],
  className = '' 
}) => {
  const panelVariants = {
    closed: { x: '-100%', opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', damping: 20, stiffness: 300 }
    }
  };
  
  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };
  
  const handleClearAll = () => {
    onFiltersChange({
      searchQuery: '',
      selectedCategory: '',
      priceRange: { min: null, max: null },
      rating: null
    });
  };
  
  const hasActiveFilters = filters.searchQuery || 
                          filters.selectedCategory || 
                          filters.priceRange.min !== null || 
                          filters.priceRange.max !== null || 
                          filters.rating;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
          
          {/* Filter Panel */}
          <motion.div
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`
              fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto
              lg:relative lg:w-64 lg:shadow-none lg:border-r lg:border-gray-200
              ${className}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>
              <Button
                variant="ghost"
                size="small"
                onClick={onClose}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="small"
                  onClick={handleClearAll}
                  className="text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>
            
            {/* Filter Content */}
            <div className="p-4 space-y-6">
              {/* Search Filter */}
              <SearchFilter
                value={filters.searchQuery}
                onChange={(value) => onFiltersChange({ ...filters, searchQuery: value })}
                placeholder="Search products..."
              />
              
              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                value={filters.selectedCategory}
                onChange={(value) => onFiltersChange({ ...filters, selectedCategory: value })}
              />
              
              {/* Price Filter */}
              <PriceFilter
                value={filters.priceRange}
                onChange={(value) => onFiltersChange({ ...filters, priceRange: value })}
              />
              
              {/* Rating Filter */}
              <RatingFilter
                value={filters.rating}
                onChange={(value) => onFiltersChange({ ...filters, rating: value })}
              />
            </div>
            
            {/* Mobile Footer */}
            <div className="p-4 border-t border-gray-200 lg:hidden">
              <div className="space-y-2">
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={handleClearAll}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                )}
                <Button
                  onClick={onClose}
                  className="w-full"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;



