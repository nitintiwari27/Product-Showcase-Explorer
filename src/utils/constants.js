export const API_BASE_URL = 'https://dummyjson.com';

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  SEARCH_PRODUCTS: '/products/search',
  CATEGORIES: '/products/categories',
  CATEGORY_LIST: '/products/category-list',
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
};

export const SORT_OPTIONS = [
  { value: 'title-asc', label: 'Title A-Z', sortBy: 'title', order: 'asc' },
  { value: 'title-desc', label: 'Title Z-A', sortBy: 'title', order: 'desc' },
  { value: 'price-asc', label: 'Price Low to High', sortBy: 'price', order: 'asc' },
  { value: 'price-desc', label: 'Price High to Low', sortBy: 'price', order: 'desc' },
  { value: 'rating-desc', label: 'Highest Rating', sortBy: 'rating', order: 'desc' },
  { value: 'rating-asc', label: 'Lowest Rating', sortBy: 'rating', order: 'asc' },
];

export const ITEMS_PER_PAGE = [12, 24, 36, 48];
export const DEFAULT_ITEMS_PER_PAGE = 12;

export const PRICE_RANGES = [
  { min: 0, max: 50, label: 'Under $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 500, label: '$100 - $500' },
  { min: 500, max: 1000, label: '$500 - $1000' },
  { min: 1000, max: 99999, label: 'Over $1000' },
];

export const RATING_OPTIONS = [
  { value: 4, label: '4+ Stars' },
  { value: 3, label: '3+ Stars' },
  { value: 2, label: '2+ Stars' },
  { value: 1, label: '1+ Stars' },
];

