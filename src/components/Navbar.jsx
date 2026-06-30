import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Heart, Sun, Moon, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Track scroll position to add styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon-wrapper">
            <ShoppingBag className="logo-icon" />
          </div>
          <span className="logo-text">
            Shop<span className="text-gradient">Sphere</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Catalog
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>
        </nav>

        {/* Actions (Cart, Wishlist, Theme, Mobile Toggle) */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="action-btn btn-icon"
            aria-label="Toggle theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun size={20} className="sun-icon" /> : <Moon size={20} className="moon-icon" />}
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="action-btn btn-icon badge-container"
            aria-label="Wishlist"
            title="View Wishlist"
          >
            <Heart size={20} className="heart-icon" />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>

          {/* Cart Link */}
          <Link
            to="/cart"
            className="action-btn btn-icon badge-container"
            aria-label="Shopping Cart"
            title="View Cart"
          >
            <ShoppingCart size={20} className="cart-icon" />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle action-btn btn-icon"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-backdrop" onClick={() => setIsOpen(false)}></div>
        <nav className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
              <div className="logo-icon-wrapper">
                <ShoppingBag className="logo-icon" />
              </div>
              <span className="logo-text">
                Shop<span>Sphere</span>
              </span>
            </Link>
            <button onClick={() => setIsOpen(false)} className="action-btn btn-icon" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          
          <div className="mobile-links">
            <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              Catalog
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
            <NavLink to="/wishlist" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              Wishlist ({wishlistCount})
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
