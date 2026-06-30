import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, title, price, image, category, rating } = product;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(id);

  // Helper to render star rating
  const renderStars = (ratingVal = 0) => {
    const stars = [];
    const fullStars = Math.floor(ratingVal);
    const hasHalfStar = ratingVal % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={14} className="star-icon filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} size={14} className="star-icon half-filled" />);
      } else {
        stars.push(<Star key={i} size={14} className="star-icon" />);
      }
    }
    return stars;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card-wrapper animate-fade-in">
      <div className="product-card glass-panel glass-panel-hover">
        {/* Wishlist Toggle Button */}
        <button
          onClick={handleWishlistToggle}
          className={`wishlist-toggle-btn ${isWishlisted ? 'active' : ''}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Product Image */}
        <Link to={`/product/${id}`} className="product-card-image-link">
          <div className="product-image-container">
            <img src={image} alt={title} className="product-image" loading="lazy" />
            <div className="image-overlay">
              <span className="view-details-badge">
                <Eye size={16} />
                Quick View
              </span>
            </div>
          </div>
        </Link>

        {/* Product Content */}
        <div className="product-card-content">
          <span className="product-category">{category}</span>
          <Link to={`/product/${id}`} className="product-title-link">
            <h3 className="product-title" title={title}>
              {title}
            </h3>
          </Link>

          {/* Rating */}
          {rating && (
            <div className="product-rating">
              <div className="stars-container">{renderStars(rating.rate)}</div>
              <span className="rating-text">({rating.count})</span>
            </div>
          )}

          {/* Footer of Card */}
          <div className="product-card-footer">
            <span className="product-price">${price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-sm add-to-cart-btn"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
