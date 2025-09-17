import { apiService } from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const productService = {
  // Get all products with pagination and sorting
  async getProducts({ limit = 12, skip = 0, sortBy, order } = {}) {
    const params = { limit, skip };
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;
    
    return apiService.get(API_ENDPOINTS.PRODUCTS, params);
  },

  // Get single product by ID
  async getProductById(id) {
    return apiService.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
  },

  // Search products
  async searchProducts({ q, limit = 12, skip = 0, sortBy, order } = {}) {
    const params = { q, limit, skip };
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;
    
    return apiService.get(API_ENDPOINTS.SEARCH_PRODUCTS, params);
  },

  // Get all categories
  async getCategories() {
    return apiService.get(API_ENDPOINTS.CATEGORIES);
  },

  // Get category list (simple array)
  async getCategoryList() {
    return apiService.get(API_ENDPOINTS.CATEGORY_LIST);
  },

  // Get products by category
  async getProductsByCategory({ category, limit = 12, skip = 0, sortBy, order } = {}) {
    const params = { limit, skip };
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;
    
    return apiService.get(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category), params);
  },
};