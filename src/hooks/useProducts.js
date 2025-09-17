import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  searchProducts,
  fetchProductsByCategory,
  fetchCategories,
  resetProducts
} from '../store/slices/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const { 
    products, 
    loading, 
    error, 
    total, 
    skip, 
    limit, 
    hasMore,
    categories 
  } = useSelector(state => state.products);
  
  const filters = useSelector(state => state.filters);
  
  // Load products based on current filters
  const loadProducts = useCallback(async (page = 1, itemsPerPage = 12) => {
    const skipItems = (page - 1) * itemsPerPage;
    
    const params = {
      limit: itemsPerPage,
      skip: skipItems,
      sortBy: filters.sortBy || undefined,
      order: filters.sortOrder || undefined
    };
    
    try {
      if (filters.searchQuery) {
        await dispatch(searchProducts({
          ...params,
          q: filters.searchQuery
        }));
      } else if (filters.selectedCategory) {
        await dispatch(fetchProductsByCategory({
          ...params,
          category: filters.selectedCategory
        }));
      } else {
        await dispatch(fetchProducts(params));
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  }, [dispatch, filters]);
  
  // Load categories
  const loadCategories = useCallback(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);
  
  // Reset products when filters change significantly
  const resetProductsList = useCallback(() => {
    dispatch(resetProducts());
  }, [dispatch]);
  
  // Filter products client-side for price and rating
  const getFilteredProducts = useCallback(() => {
    let filtered = [...products];
    
    // Price filter
    if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
      filtered = filtered.filter(product => {
        const price = product.price;
        const minPrice = filters.priceRange.min;
        const maxPrice = filters.priceRange.max;
        
        if (minPrice !== null && price < minPrice) return false;
        if (maxPrice !== null && price > maxPrice) return false;
        
        return true;
      });
    }
    
    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }
    
    return filtered;
  }, [products, filters]);
  
  return {
    products: getFilteredProducts(),
    allProducts: products,
    loading,
    error,
    total,
    skip,
    limit,
    hasMore,
    categories,
    loadProducts,
    loadCategories,
    resetProductsList
  };
};

