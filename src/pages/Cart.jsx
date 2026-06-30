import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartTotal,
    shippingThreshold,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, success

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsCheckingOut(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutStep('success');
    }, 1500);
  };

  const handleSuccessClose = () => {
    clearCart();
    navigate('/');
  };

  // Calculate progress to free shipping
  const progressToFreeShipping = Math.min((cartSubtotal / shippingThreshold) * 100, 100);
  const amountNeededForFreeShipping = Math.max(shippingThreshold - cartSubtotal, 0);

  if (checkoutStep === 'success') {
    const mockOrderNumber = Math.floor(100000 + Math.random() * 900000);
    return (
      <div className="checkout-success-container animate-scale-in">
        <div className="success-card glass-panel">
          <div className="success-check-icon">
            <CheckCircle size={48} />
          </div>
          <h1>Order Placed!</h1>
          <p className="success-subtitle">Thank you for your purchase.</p>
          <div className="order-details glass-panel">
            <div className="detail-row">
              <span>Order Number:</span>
              <strong>#SS-{mockOrderNumber}</strong>
            </div>
            <div className="detail-row">
              <span>Estimated Delivery:</span>
              <strong>3-5 Business Days</strong>
            </div>
            <div className="detail-row">
              <span>Total Paid:</span>
              <strong className="success-total">${cartTotal.toFixed(2)}</strong>
            </div>
          </div>
          <p className="success-note">A confirmation email and tracking link have been sent to your email.</p>
          <button onClick={handleSuccessClose} className="btn btn-primary btn-lg btn-success-home">
            Continue Shopping
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty-container container animate-fade-in">
        <div className="empty-cart-card glass-panel">
          <div className="empty-cart-icon-wrapper">
            <ShoppingBag size={48} />
          </div>
          <h1>Your Cart is Empty</h1>
          <p>Looks like you haven't added anything to your cart yet. Explore our catalog to find premium deals!</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page animate-fade-in">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping <span className="text-gradient">Cart</span></h1>
          <p className="cart-subtitle">Manage the items in your cart before checking out</p>
        </div>

        <div className="cart-layout">
          {/* Left: Cart Items List */}
          <div className="cart-items-section">
            <div className="cart-items-list glass-panel">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  {/* Item Image */}
                  <div className="cart-item-image-wrapper">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                  </div>

                  {/* Item Details */}
                  <div className="cart-item-details">
                    <Link to={`/product/${item.id}`} className="cart-item-title">
                      {item.title}
                    </Link>
                    <span className="cart-item-category">{item.category}</span>
                    <span className="cart-item-price-each">${item.price.toFixed(2)} each</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Item Subtotal & Remove */}
                  <div className="cart-item-subtotal-actions">
                    <span className="cart-item-total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn-remove-item"
                      aria-label="Remove item"
                      title="Remove from cart"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Actions */}
            <div className="cart-actions-row">
              <Link to="/products" className="btn btn-secondary btn-back-shopping">
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
              <button onClick={clearCart} className="btn btn-secondary btn-clear-cart">
                <Trash2 size={16} />
                Empty Cart
              </button>
            </div>
          </div>

          {/* Right: Summary Panel */}
          <div className="cart-summary-section">
            {/* Free Shipping Progress */}
            {amountNeededForFreeShipping > 0 ? (
              <div className="shipping-progress-card glass-panel">
                <p className="shipping-progress-text">
                  Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> more for <strong>FREE Shipping!</strong>
                </p>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progressToFreeShipping}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="shipping-progress-card free-shipping-success glass-panel">
                <p className="shipping-progress-text">
                  🎉 Congratulations! Your order qualifies for <strong>FREE Shipping!</strong>
                </p>
              </div>
            )}

            {/* Order Summary */}
            <div className="order-summary-card glass-panel">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Tax (10%)</span>
                  <span>${cartTax.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span className="summary-total-price">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn btn-primary btn-lg btn-checkout"
              >
                {isCheckingOut ? (
                  <>
                    <div className="checkout-spinner"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    Secure Checkout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
