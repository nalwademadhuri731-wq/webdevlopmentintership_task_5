import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RotateCcw, ChevronDown, LayoutGrid } from 'lucide-react';
import { fetchProducts, fetchCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [maxProductPrice, setMaxProductPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('rating'); // default sort
  
  // Pagination State
  const [visibleCount, setVisibleCount] = useState(8);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Initial Data Fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);

        // Find max price to set slider max dynamically
        const maxPrice = Math.ceil(Math.max(...productsData.map(p => p.price)));
        setMaxProductPrice(maxPrice);
        setPriceRange(maxPrice);

        // Handle category from URL search params
        const catParam = searchParams.get('category');
        if (catParam) {
          setSelectedCategories([catParam]);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch catalog data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Listen for changes in URL category parameter
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam && !selectedCategories.includes(catParam)) {
      setSelectedCategories([catParam]);
    }
  }, [searchParams]);

  // Handle Category Toggle
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      const updated = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      
      // Update URL search parameters
      if (updated.length === 1) {
        setSearchParams({ category: updated[0] });
      } else {
        setSearchParams({});
      }
      return updated;
    });
  };

  // Reset All Filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange(maxProductPrice);
    setSortBy('rating');
    setVisibleCount(8);
    setSearchParams({});
  };

  // Filter and Sort Logic (Memoized)
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesPrice = product.price <= priceRange;
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
        if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [products, searchQuery, selectedCategories, priceRange, sortBy]);

  // Products to display (based on pagination)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  if (loading) return <Spinner message="Loading catalog..." />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="products-page animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <div className="catalog-header">
          <h1 className="catalog-title">Explore <span className="text-gradient">Catalog</span></h1>
          <p className="catalog-subtitle">Browse through our wide range of premium products</p>
        </div>

        {/* Toolbar (Search & Sort) */}
        <div className="catalog-toolbar glass-panel">
          <div className="search-bar-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(8); // Reset pagination on search
              }}
              className="search-input"
            />
          </div>

          <div className="toolbar-actions">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="btn btn-secondary mobile-filter-btn"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="sort-wrapper">
              <label htmlFor="sort-select" className="sort-label">Sort By:</label>
              <div className="select-container">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="rating">Top Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="alphabetical">Alphabetical (A-Z)</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Layout */}
        <div className="catalog-layout">
          {/* Sidebar Filters - Desktop */}
          <aside className={`catalog-sidebar glass-panel ${showMobileFilters ? 'mobile-show' : ''}`}>
            <div className="sidebar-header">
              <div className="sidebar-title">
                <SlidersHorizontal size={18} />
                <h3>Filters</h3>
              </div>
              <button onClick={handleClearFilters} className="clear-filters-btn" title="Reset all filters">
                <RotateCcw size={14} />
                Clear All
              </button>
            </div>

            {/* Categories Multi-select */}
            <div className="filter-group-box">
              <h4>Categories</h4>
              <div className="category-checkbox-list">
                {categories.map((cat) => (
                  <label key={cat} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => {
                        handleCategoryToggle(cat);
                        setVisibleCount(8); // Reset pagination
                      }}
                      className="custom-checkbox"
                    />
                    <span className="checkbox-text">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group-box">
              <div className="price-filter-header">
                <h4>Max Price</h4>
                <span className="price-value">${priceRange}</span>
              </div>
              <input
                type="range"
                min="0"
                max={maxProductPrice}
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(Number(e.target.value));
                  setVisibleCount(8); // Reset pagination
                }}
                className="price-slider"
              />
              <div className="price-slider-labels">
                <span>$0</span>
                <span>${maxProductPrice}</span>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="catalog-grid-area">
            {filteredProducts.length === 0 ? (
              <div className="no-products-found glass-panel">
                <LayoutGrid size={48} className="no-products-icon" />
                <h3>No products found</h3>
                <p>Try adjusting your search query, price range, or categories.</p>
                <button onClick={handleClearFilters} className="btn btn-primary">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {filteredProducts.length > visibleCount && (
                  <div className="load-more-container">
                    <button onClick={loadMore} className="btn btn-secondary btn-lg load-more-btn">
                      Load More Products
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
