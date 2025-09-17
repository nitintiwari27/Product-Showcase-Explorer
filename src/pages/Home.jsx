import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import ProductGrid from '../components/product/ProductGrid';
import FilterPanel from '../components/filters/FilterPanel';
import SortOptions from '../components/sorting/SortOptions';
import Pagination from '../components/pagination/Pagination';
import ProductDetails from '../components/product/ProductDetails';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { Filter, X } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useFilters } from '../hooks/useFilters';
import { usePagination } from '../hooks/usePagination';
import { openProductModal, closeProductModal } from '../store/slices/uiSlice';
import { fetchProductById } from '../store/slices/productSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isProductModalOpen } = useSelector(state => state.ui);
  const { selectedProduct } = useSelector(state => state.products);
  
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const {
    products,
    loading,
    error,
    categories,
    total,
    loadProducts,
    loadCategories,
  } = useProducts();
  
  const {
    filters,
    updateSorting,
    updateAllFilters
  } = useFilters();
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    goToPage,
    changeItemsPerPage
  } = usePagination(total);
  
  // Load initial data
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  
  // Load products when filters or pagination changes
  useEffect(() => {
    loadProducts(currentPage, itemsPerPage);
  }, [loadProducts, currentPage, itemsPerPage, filters]);
  
  // Reset to first page when filters change
  useEffect(() => {
    if (currentPage > 1) {
      goToPage(1);
    }
  }, [filters.searchQuery, filters.selectedCategory, filters.sortBy, filters.sortOrder]);
  
  const handleViewProductDetails = async (product) => {
    try {
      await dispatch(fetchProductById(product.id));
      // dispatch(openProductModal());
      navigate(`/product/${product.id}`)
    } catch (error) {
      console.error('Failed to load product details:', error);
    }
  };
  
  const handleAddToCart = (product) => {    
    return alert("Sorry!! This Functionality is not implemented yet.")
  };
  
  const handleCloseModal = () => {
    dispatch(closeProductModal());
  };
  
  const handleRetryLoad = () => {
    loadProducts(currentPage, itemsPerPage);
  };
  
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };
  
  //paginated products for display
  const paginatedProducts = products;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={toggleFilters}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>
          
          <FilterPanel
            isOpen={filtersOpen || window.innerWidth >= 1024}
            onClose={() => setFiltersOpen(false)}
            filters={filters}
            onFiltersChange={updateAllFilters}
            categories={categories}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header with Sort Options */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filters.searchQuery
                  ? `Search results for "${filters.searchQuery}"`
                  : filters.selectedCategory
                  ? `${filters.selectedCategory.charAt(0).toUpperCase() + filters.selectedCategory.slice(1)} Products`
                  : 'All Products'
                }
              </h2>
              <p className="text-gray-600 mt-1">
                {products.length} product{products.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <SortOptions
              value={filters.sortBy ? `${filters.sortBy}-${filters.sortOrder}` : ''}
              onChange={updateSorting}
            />
          </motion.div>
          
          {/* Product Grid */}
          <motion.div variants={itemVariants}>
            <ProductGrid
              products={paginatedProducts}
              loading={loading}
              error={error}
              onViewDetails={handleViewProductDetails}
              onAddToCart={handleAddToCart}
              onRetry={handleRetryLoad}
            />
          </motion.div>
          
          {/* Pagination */}
          {products.length > 0 && totalPages > 1 && (
         
            <motion.div variants={itemVariants} className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={changeItemsPerPage}
                totalItems={products.length}
              />
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Product Details Modal */}
      <Modal
        isOpen={isProductModalOpen}
        onClose={handleCloseModal}
        size="large"
        showCloseButton={true}
      >
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </motion.div>
  );
};

export default Home;


