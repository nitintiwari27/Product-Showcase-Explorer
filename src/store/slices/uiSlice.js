import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isProductModalOpen: false,
  isSidebarOpen: false,
  currentPage: 1,
  itemsPerPage: 12,
  viewMode: 'grid',
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openProductModal: (state) => {
      state.isProductModalOpen = true;
    },
    closeProductModal: (state) => {
      state.isProductModalOpen = false;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const {
  openProductModal,
  closeProductModal,
  toggleSidebar,
  setCurrentPage,
  setItemsPerPage,
  setViewMode,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;