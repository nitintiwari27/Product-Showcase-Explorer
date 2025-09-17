import React from 'react';
import { motion } from 'framer-motion';
import Select from '../ui/Select';

const CategoryFilter = ({ categories, value, onChange, className = '' }) => {
  const categoryOptions = categories.map(category => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
  }));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Select
        label="Category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={categoryOptions}
        placeholder="All Categories"
      />
    </motion.div>
  );
};

export default CategoryFilter;