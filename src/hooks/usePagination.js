import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setItemsPerPage } from '../store/slices/uiSlice';

export const usePagination = (totalItems = 0) => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector(state => state.ui);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  }, [dispatch, totalPages]);
  
  const changeItemsPerPage = useCallback((items) => {
    dispatch(setItemsPerPage(items));
  }, [dispatch]);
  
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  }, [dispatch, currentPage, totalPages]);
  
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  }, [dispatch, currentPage]);
  
  const goToFirstPage = useCallback(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);
  
  const goToLastPage = useCallback(() => {
    dispatch(setCurrentPage(totalPages));
  }, [dispatch, totalPages]);
  
  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    goToPage,
    changeItemsPerPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};