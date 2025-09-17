import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { RATING_OPTIONS } from '../../utils/constants';

const RatingFilter = ({ value, onChange, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-3 ${className}`}
    >
      <label className="block text-sm font-medium text-gray-700">
        Minimum Rating
      </label>
      
      <div className="space-y-2">
        {RATING_OPTIONS.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(value === option.value ? null : option.value)}
            className={`
              flex items-center space-x-2 w-full p-2 rounded-lg border transition-colors
              ${value === option.value 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }
            `}
          >
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < option.value
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{option.label}</span>
          </motion.button>
        ))}
        
        {value && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(null)}
            className="w-full p-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            Clear Rating Filter
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default RatingFilter;