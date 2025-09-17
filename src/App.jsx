// App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import './styles/globals.css';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  const [cartItemsCount] = React.useState(0);
  const [viewMode, setViewMode] = React.useState('grid');
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  const handleToggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const handleToggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (


    <Layout
      onToggleFilters={handleToggleFilters}
      onToggleViewMode={handleToggleViewMode}
      viewMode={viewMode}
      cartItemsCount={cartItemsCount}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/products" element={<Home />} /> */}
         <Route path="/product/:id" element={<ProductDetailPage/>} />
      </Routes>
    </Layout>
  );
}

export default App;
