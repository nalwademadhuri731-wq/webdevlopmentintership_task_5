import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Headphones, Layers, Sparkles } from 'lucide-react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      // Sort by rating rate descending to show top rated, and take top 4
      const sorted = [...data]
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 4);
      setFeaturedProducts(sorted);
    } catch (err) {
      setError(err.message || 'Failed to fetch featured products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  const categories = [
    {
      name: "men's clothing",
      title: "Men's Fashion",
      description: "Smart casuals, formal wear, & essentials",
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "women's clothing",
      title: "Women's Fashion",
      description: "Elegant dresses, activewear, & trends",
      gradient: "linear-gradient(135deg, #ec4899, #be185d)",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "jewelery",
      title: "Jewelry & Accessories",
      description: "Fine gold, silver, & statement pieces",
      gradient: "linear-gradient(135deg, #f59e0b, #b45309)",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "electronics",
      title: "Premium Electronics",
      description: "Next-gen gadgets, audio, & smart devices",
      gradient: "linear-gradient(135deg, #10b981, #047857)",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge glass-panel">
              <Sparkles size={16} className="text-gradient-accent" />
              <span>New Summer Collection Live!</span>
            </div>
            <h1 className="hero-title">
              Elevate Your Style, <br />
              Define Your <span className="text-gradient">Sphere</span>
            </h1>
            <p className="hero-description">
              Discover a curated collection of premium fashion, accessories, and next-gen electronics. Experience shopping redefined with seamless navigation and secure checkout.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Catalog
                <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg">
                Our Story
              </Link>
            </div>
          </div>
          
          <div className="hero-image-wrapper">
            <div className="hero-image-card glass-panel">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                alt="Premium Shopping Experience"
                className="hero-image"
              />
              <div className="floating-stat-card stat-card-1 glass-panel">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">Customer Rating</span>
              </div>
              <div className="floating-stat-card stat-card-2 glass-panel">
                <span className="stat-number">20k+</span>
                <span className="stat-label">Happy Shoppers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section section-padding">
        <div className="container benefits-grid">
          <div className="benefit-card glass-panel">
            <div className="benefit-icon-wrapper">
              <Truck className="benefit-icon" />
            </div>
            <h3>Free Shipping</h3>
            <p>On all orders over $100. Fast, tracked, and secure delivery to your doorstep.</p>
          </div>
          
          <div className="benefit-card glass-panel">
            <div className="benefit-icon-wrapper">
              <ShieldCheck className="benefit-icon" />
            </div>
            <h3>Secure Checkout</h3>
            <p>256-bit SSL encryption. We protect your payment details and personal information.</p>
          </div>
          
          <div className="benefit-card glass-panel">
            <div className="benefit-icon-wrapper">
              <Headphones className="benefit-icon" />
            </div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock dedicated customer care ready to assist you at any stage.</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Shop by <span className="text-gradient">Category</span></h2>
            <p>Explore our diverse range of premium products tailored just for you.</p>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="category-card glass-panel"
                style={{ '--card-gradient': cat.gradient }}
              >
                <div className="category-image-wrapper">
                  <img src={cat.image} alt={cat.title} className="category-image" />
                  <div className="category-overlay"></div>
                </div>
                <div className="category-content">
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <span className="category-link">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section section-padding">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <h2>Featured <span className="text-gradient">Products</span></h2>
              <p>Handpicked top-rated items from our extensive collection.</p>
            </div>
            <Link to="/products" className="btn btn-secondary">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <Spinner message="Fetching featured products..." />
          ) : error ? (
            <ErrorState message={error} onRetry={getFeaturedProducts} />
          ) : (
            <div className="featured-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
