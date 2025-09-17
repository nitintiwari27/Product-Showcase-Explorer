import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  selectedCategory: '',
  priceRange: {
    min: null,
    max: null,
  },
  rating: null,
  sortBy: '',
  sortOrder: '',
  filtersVisible: false,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSorting: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.order;
    },
    toggleFiltersVisibility: (state) => {
      state.filtersVisible = !state.filtersVisible;
    },
    clearAllFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = '';
      state.priceRange = { min: null, max: null };
      state.rating = null;
      state.sortBy = '';
      state.sortOrder = '';
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  setRating,
  setSorting,
  toggleFiltersVisibility,
  clearAllFilters,
} = filterSlice.actions;

export default filterSlice.reducer;