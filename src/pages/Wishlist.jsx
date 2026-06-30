import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty-container container animate-fade-in">
        <div className="empty-wishlist-card glass-panel">
          <div className="empty-wishlist-icon-wrapper">
            <Heart size={48} />
          </div>
          <h1>Your Wishlist is Empty</h1>
          <p>You haven't saved any products to your wishlist yet. Explore our catalog to find items you love!</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Browse Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page animate-fade-in">
      <div className="container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">My <span className="text-gradient">Wishlist</span></h1>
          <p className="wishlist-subtitle">Keep track of the products you love and want to purchase later</p>
        </div>

        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
