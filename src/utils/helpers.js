export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateDiscountedPrice = (price, discountPercentage) => {
  return price - (price * discountPercentage / 100);
};

export const formatDiscountPercentage = (percentage) => {
  return `${Math.round(percentage)}% OFF`;
};

export const getStockStatus = (stock) => {
  if (stock > 20) return { status: 'available', label: 'In Stock', color: 'text-green-600' };
  if (stock > 0) return { status: 'low', label: 'Low Stock', color: 'text-yellow-600' };
  return { status: 'unavailable', label: 'Out of Stock', color: 'text-red-600' };
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const generateStarRating = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }
  
  if (hasHalfStar) {
    stars.push('half');
  }
  
  while (stars.length < 5) {
    stars.push('empty');
  }
  
  return stars;
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const filterProducts = (products, filters) => {
  return products.filter(product => {
    // Price range filter
    if (filters.priceRange.min !== null && product.price < filters.priceRange.min) {
      return false;
    }
    if (filters.priceRange.max !== null && product.price > filters.priceRange.max) {
      return false;
    }
    
    // Rating filter
    if (filters.rating && product.rating < filters.rating) {
      return false;
    }
    
    return true;
  });
};