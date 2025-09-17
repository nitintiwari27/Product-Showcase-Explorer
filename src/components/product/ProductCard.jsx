import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { formatPrice, calculateDiscountedPrice, formatDiscountPercentage, getStockStatus, generateStarRating } from '../../utils/helpers';
import Button from '../ui/Button';

const ProductCard = ({ product, onViewDetails, onAddToCart, className = '' }) => {
  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
  const stockStatus = getStockStatus(product.stock);
  const stars = generateStarRating(product.rating);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: { 
      y: -5,
      transition: { duration: 0.2 }
    }
  };
  
  const imageVariants = {
    hover: { scale: 1.05 }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer ${className}`}
      onClick={() => onViewDetails(product)}
    >
      <div className="relative overflow-hidden">
        <motion.img
          variants={imageVariants}
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            {formatDiscountPercentage(product.discountPercentage)}
          </div>
        )}
        
        {/* Stock Status */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-md text-xs font-medium bg-white ${stockStatus.color}`}>
            {stockStatus.label}
          </span>
        </div>
        
        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/30  flex items-center justify-center space-x-2"
        >
        </motion.div>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 capitalize">{product.category}</p>
        </div>
        
        {/* Brand */}
        {product.brand && (
          <p className="text-sm text-gray-500 mb-2">by {product.brand}</p>
        )}
        
        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {stars.map((star, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  star === 'full' 
                    ? 'text-yellow-400 fill-current' 
                    : star === 'half'
                    ? 'text-yellow-400 fill-current opacity-50'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.rating})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-600">Stock: {product.stock}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;