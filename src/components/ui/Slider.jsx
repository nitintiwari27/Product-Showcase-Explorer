import React from 'react';
import { motion } from 'framer-motion';

const Slider = ({
  label,
  min = 0,
  max = 100,
  value,
  onChange,
  step = 1,
  showValue = true,
  className = '',
  ...props
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {showValue && (
            <span className="text-sm text-gray-600">{value}</span>
          )}
        </div>
      )}
      
      <div className="relative">
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          step={step}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
          }}
          {...props}
        />
      </div>
    </div>
  );
};

export default Slider;