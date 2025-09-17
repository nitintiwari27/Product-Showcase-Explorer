import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { debounce } from '../../utils/helpers';
import Input from '../ui/Input';

const SearchFilter = ({ value, onChange, placeholder = "Search products...", className = '' }) => {
  const [localValue, setLocalValue] = useState(value);
  
  // Debounced search function
  const debouncedOnChange = debounce(onChange, 300);
  
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };
  
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder={placeholder}
          value={localValue}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default SearchFilter;

