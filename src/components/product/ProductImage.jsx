import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import Button from '../ui/Button';

const ProductImage = ({ images = [], title, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const goToImage = (index) => {
    setCurrentIndex(index);
  };
  
  if (!images.length) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-lg h-64">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className="relative group">
        <motion.div
          className="relative overflow-hidden rounded-lg bg-gray-100"
          style={{ aspectRatio: '1' }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-zoom-in"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsZoomed(true)}
            />
          </AnimatePresence>
          
          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="small"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="small"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
          
          {/* Zoom Button */}
          <Button
            variant="ghost"
            size="small"
            className="absolute top-2 right-2 bg-white bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsZoomed(true)}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
      
      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors
                ${index === currentIndex ? 'border-blue-500' : 'border-gray-200'}
              `}
              onClick={() => goToImage(index)}
            >
              <img
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
      
      {/* Zoomed Modal */}
      <AnimatePresence>
        {isZoomed && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setIsZoomed(false)}
            >
              <motion.img
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                src={images[currentIndex]}
                alt={`${title} - Zoomed`}
                className="max-w-full max-h-full object-contain"
              />
              
              <Button
                variant="ghost"
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsZoomed(false)}
              >
                ✕
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductImage;