import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import RootLayout from './layouts/RootLayout';
import Spinner from './components/Spinner';

// Lazy load pages for code splitting and performance optimization
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <HashRouter>
            <Suspense fallback={<Spinner message="Loading ShopSphere..." />}>
              <Routes>
                {/* Main Shell Layout */}
                <Route path="/" element={<RootLayout />}>
                  <Route index element={<Home />} />
                  <Route path="products" element={<Products />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  
                  {/* NotFound Page Route */}
                  <Route path="not-found" element={<NotFound />} />
                  
                  {/* Catch-all Wildcard redirects to /not-found */}
                  <Route path="*" element={<Navigate to="/not-found" replace />} />
                </Route>
              </Routes>
            </Suspense>
          </HashRouter>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
