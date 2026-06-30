import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ArrowLeft, Plus, Minus, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { fetchProductById, fetchRelatedProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center' });

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        setQuantity(1); // Reset quantity on product change
        
        const productData = await fetchProductById(id);
        if (!productData) {
          throw new Error('Product not found.');
        }
        setProduct(productData);

        // Fetch related products
        const relatedData = await fetchRelatedProducts(productData.category, id);
        setRelatedProducts(relatedData);
      } catch (err) {
        setError(err.message || 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [id]);

  const handleQuantityChange = (val) => {
    const newQty = quantity + val;
    if (newQty >= 1 && newQty <= 10) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Image zoom on hover effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.5)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)',
    });
  };

  // Helper to render stars
  const renderStars = (ratingVal = 0) => {
    const stars = [];
    const fullStars = Math.floor(ratingVal);
    const hasHalfStar = ratingVal % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={18} className="star-icon filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} size={18} className="star-icon half-filled" />);
      } else {
        stars.push(<Star key={i} size={18} className="star-icon" />);
      }
    }
    return stars;
  };

  if (loading) return <Spinner message="Loading product details..." />;
  if (error) return <ErrorState title="Product Not Found" message={error} onRetry={() => navigate('/products')} />;
  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="product-detail-page animate-fade-in">
      <div className="container">
        {/* Back button & Breadcrumb */}
        <div className="detail-navigation">
          <button onClick={() => navigate(-1)} className="btn-back">
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <Link to="/products">Catalog</Link>
            <span className="separator">/</span>
            <span className="current">{product.category}</span>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="product-detail-layout">
          {/* Left: Image Panel */}
          <div className="product-image-panel glass-panel">
            <div className="detail-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="detail-image"
                style={zoomStyle}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            </div>
            <p className="zoom-help-text">Hover over image to zoom</p>
          </div>

          {/* Right: Info Panel */}
          <div className="product-info-panel">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.title}</h1>

            {/* Ratings */}
            <div className="detail-rating">
              <div className="stars-container">
                {renderStars(product.rating?.rate)}
              </div>
              <span className="rating-value">{product.rating?.rate}</span>
              <span className="rating-divider">|</span>
              <span className="rating-count">{product.rating?.count} customer reviews</span>
            </div>

            {/* Price */}
            <div className="detail-price-box">
              <span className="detail-price">${product.price.toFixed(2)}</span>
              {product.price > 100 && (
                <span className="free-shipping-badge">Free Shipping</span>
              )}
            </div>

            {/* Description */}
            <div className="detail-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Actions: Qty + Cart + Wishlist */}
            <div className="detail-actions-wrapper">
              <div className="qty-selector-group">
                <span className="qty-label">Quantity:</span>
                <div className="qty-selector">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="qty-btn"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="qty-btn"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="action-buttons-group">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary btn-lg btn-add-to-cart"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`btn btn-secondary btn-lg btn-wishlist-toggle ${isWishlisted ? 'active' : ''}`}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Guarantee Cards */}
            <div className="guarantees-grid">
              <div className="guarantee-card">
                <Truck size={18} className="guarantee-icon" />
                <span>Fast Shipping</span>
              </div>
              <div className="guarantee-card">
                <RefreshCw size={18} className="guarantee-icon" />
                <span>30-Day Returns</span>
              </div>
              <div className="guarantee-card">
                <ShieldCheck size={18} className="guarantee-icon" />
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <h2 className="related-title">
              Related <span className="text-gradient">Products</span>
            </h2>
            <div className="related-grid">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
