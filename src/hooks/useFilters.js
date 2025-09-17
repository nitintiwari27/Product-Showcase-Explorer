import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  setRating,
  setSorting,
  toggleFiltersVisibility,
  clearAllFilters
} from '../store/slices/filterSlice';

export const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  
  const updateSearchQuery = useCallback((query) => {
    dispatch(setSearchQuery(query));
  }, [dispatch]);
  
  const updateSelectedCategory = useCallback((category) => {
    dispatch(setSelectedCategory(category));
  }, [dispatch]);
  
  const updatePriceRange = useCallback((priceRange) => {
    dispatch(setPriceRange(priceRange));
  }, [dispatch]);
  
  const updateRating = useCallback((rating) => {
    dispatch(setRating(rating));
  }, [dispatch]);
  
  const updateSorting = useCallback((sorting) => {
    dispatch(setSorting(sorting));
  }, [dispatch]);
  
  const toggleFilters = useCallback(() => {
    dispatch(toggleFiltersVisibility());
  }, [dispatch]);
  
  const clearFilters = useCallback(() => {
    dispatch(clearAllFilters());
  }, [dispatch]);
  
  const updateAllFilters = useCallback((newFilters) => {
    Object.entries(newFilters).forEach(([key, value]) => {
      switch (key) {
        case 'searchQuery':
          dispatch(setSearchQuery(value));
          break;
        case 'selectedCategory':
          dispatch(setSelectedCategory(value));
          break;
        case 'priceRange':
          dispatch(setPriceRange(value));
          break;
        case 'rating':
          dispatch(setRating(value));
          break;
        default:
          break;
      }
    });
  }, [dispatch]);
  
  return {
    filters,
    updateSearchQuery,
    updateSelectedCategory,
    updatePriceRange,
    updateRating,
    updateSorting,
    toggleFilters,
    clearFilters,
    updateAllFilters
  };
};

