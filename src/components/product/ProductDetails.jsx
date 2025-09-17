import React from 'react';
import { motion } from 'framer-motion';
import { Star, Truck, Shield, RotateCcw, Package } from 'lucide-react';
import { formatPrice, calculateDiscountedPrice, formatDiscountPercentage, getStockStatus, generateStarRating } from '../../utils/helpers';
import ProductImage from './ProductImage';
import Button from '../ui/Button';

const ProductDetails = ({ product, onAddToCart, onClose, className = '' }) => {
  if (!product) return null;
  
  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
  const stockStatus = getStockStatus(product.stock);
  const stars = generateStarRating(product.rating);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`bg-white ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Image Section */}
        <motion.div variants={itemVariants}>
          <ProductImage 
            images={product.images} 
            title={product.title}
          />
        </motion.div>
        
        {/* Details Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Title and Brand */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            {product.brand && (
              <p className="text-lg text-gray-600">by {product.brand}</p>
            )}
            <p className="text-sm text-gray-500 capitalize mt-1">
              Category: {product.category}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {stars.map((star, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    star === 'full' 
                      ? 'text-yellow-400 fill-current' 
                      : star === 'half'
                      ? 'text-yellow-400 fill-current opacity-50'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium text-gray-900">
              {product.rating}
            </span>
            <span className="text-gray-500">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-4xl font-bold text-gray-900">
                {formatPrice(discountedPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            {product.discountPercentage > 0 && (
              <div className="flex items-center space-x-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-semibold">
                  {formatDiscountPercentage(product.discountPercentage)}
                </span>
                <span className="text-green-600 font-medium">
                  You save {formatPrice(product.price - discountedPrice)}
                </span>
              </div>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <Package className={`w-5 h-5 ${stockStatus.color}`} />
            <span className={`font-medium ${stockStatus.color}`}>
              {stockStatus.label}
            </span>
            <span className="text-gray-500">({product.stock} available)</span>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          
          {/* Product Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Product Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">SKU:</span>
                <span className="ml-2 font-medium">{product.sku}</span>
              </div>
              <div>
                <span className="text-gray-500">Weight:</span>
                <span className="ml-2 font-medium">{product.weight} oz</span>
              </div>
              {product.dimensions && (
                <>
                  <div>
                    <span className="text-gray-500">Dimensions:</span>
                    <span className="ml-2 font-medium">
                      {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Min Order:</span>
                    <span className="ml-2 font-medium">{product.minimumOrderQuantity}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Shipping & Returns */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <Truck className="w-5 h-5 text-gray-600" />
              <div>
                <span className="font-medium text-gray-900">Shipping:</span>
                <span className="ml-2 text-gray-700">{product.shippingInformation}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-5 h-5 text-gray-600" />
              <div>
                <span className="font-medium text-gray-900">Returns:</span>
                <span className="ml-2 text-gray-700">{product.returnPolicy}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div>
                <span className="font-medium text-gray-900">Warranty:</span>
                <span className="ml-2 text-gray-700">{product.warrantyInformation}</span>
              </div>
            </div>
          </div>
          
          {/* Add to Cart */}
          {stockStatus.status !== 'unavailable' && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => alert("Sorry!! This Functionality is not implemented yet.")}
                size="large"
                className="w-full"
              >
                Add to Cart
              </Button>
            </motion.div>
          )}
          
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="border-t p-6 space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
          <div className="space-y-4">
            {product.reviews.slice(0, 3).map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {review.reviewerName}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductDetails;

