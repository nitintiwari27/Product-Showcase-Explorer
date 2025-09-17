import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';
import { SORT_OPTIONS } from '../../utils/constants';
import Select from '../ui/Select';

const SortOptions = ({ value, onChange, className = '' }) => {
  const sortOptions = SORT_OPTIONS.map(option => ({
    value: option.value,
    label: option.label
  }));
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center space-x-2 ${className}`}
    >
      <ArrowUpDown className="w-4 h-4 text-gray-500" />
      <Select
        value={value}
        onChange={(e) => {
          const selectedOption = SORT_OPTIONS.find(opt => opt.value === e.target.value);
          if (selectedOption) {
            onChange({
              sortBy: selectedOption.sortBy,
              order: selectedOption.order
            });
          } else {
            onChange({ sortBy: '', order: '' });
          }
        }}
        options={sortOptions}
        placeholder="Sort by"
        className="min-w-48"
      />
    </motion.div>
  );
};

export default SortOptions;