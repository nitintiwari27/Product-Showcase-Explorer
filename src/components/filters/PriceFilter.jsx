import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/helpers';
import Slider from '../ui/Slider';
import Input from '../ui/Input';
import Button from '../ui/Button';

const PriceFilter = ({ value, onChange, min = 0, max = 2000, className = '' }) => {
  const [localMin, setLocalMin] = useState(value.min || min);
  const [localMax, setLocalMax] = useState(value.max || max);
  const [useSlider, setUseSlider] = useState(true);
  
  useEffect(() => {
    setLocalMin(value.min || min);
    setLocalMax(value.max || max);
  }, [value, min, max]);
  
  const handleMinChange = (newMin) => {
    const minValue = Math.min(newMin, localMax);
    setLocalMin(minValue);
    onChange({ min: minValue, max: localMax });
  };
  
  const handleMaxChange = (newMax) => {
    const maxValue = Math.max(newMax, localMin);
    setLocalMax(maxValue);
    onChange({ min: localMin, max: maxValue });
  };
  
  const handleReset = () => {
    setLocalMin(min);
    setLocalMax(max);
    onChange({ min: null, max: null });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <Button
          variant="ghost"
          size="small"
          onClick={() => setUseSlider(!useSlider)}
          className="text-xs"
        >
          {useSlider ? 'Manual' : 'Slider'}
        </Button>
      </div>
      
      <div className="text-sm text-gray-600 mb-2">
        {formatPrice(localMin)} - {formatPrice(localMax)}
      </div>
      
      {useSlider ? (
        <div className="space-y-3">
          <Slider
            min={min}
            max={max}
            value={localMin}
            onChange={(e) => handleMinChange(parseInt(e.target.value))}
            label="Min Price"
            showValue={false}
          />
          <Slider
            min={min}
            max={max}
            value={localMax}
            onChange={(e) => handleMaxChange(parseInt(e.target.value))}
            label="Max Price"
            showValue={false}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={localMin}
            onChange={(e) => handleMinChange(parseInt(e.target.value) || min)}
            min={min}
            max={max}
          />
          <Input
            type="number"
            placeholder="Max"
            value={localMax}
            onChange={(e) => handleMaxChange(parseInt(e.target.value) || max)}
            min={min}
            max={max}
          />
        </div>
      )}
      
      <Button
        variant="outline"
        size="small"
        onClick={handleReset}
        className="w-full"
      >
        Reset Price Range
      </Button>
    </motion.div>
  );
};

export default PriceFilter;