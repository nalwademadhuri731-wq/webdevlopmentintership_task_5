# ShopSphere - E-Commerce Product Catalog

ShopSphere is a premium, fully responsive, and highly optimized single-page e-commerce web application built using **React 19**, **Vite**, **React Router DOM**, and **Vanilla CSS**. It integrates with the **Fake Store API** to fetch product catalog data, features a persistent state (Cart & Wishlist) via **Local Storage**, and offers a premium visual experience with glassmorphic UI components, smooth micro-animations, and a dynamic Dark/Light mode theme toggle.

---

## 🚀 Live Demo & Deployment
- **Frontend URL**: Ready to deploy on Vercel or Netlify.
- **Optimized Build**: Code-split, lazy-loaded, and minified for production.

---

## ✨ Features

### 1. Home Page
- **Hero Section**: Premium landing area with floating statistics cards, eye-catching gradients, and clear Call to Action (CTA) buttons.
- **Category Grid**: Custom visual cards for clothing, jewelry, and electronics, routing users directly to filtered catalog views.
- **Featured Products**: Highlights top-rated products dynamically sorted from the API.
- **Value Props**: Grid showcasing customer benefits (Free Shipping, Secure Checkout, 24/7 Support) with sleek icon designs.

### 2. Product Catalog
- **Instant Search**: Live filtering of products by title as the user types.
- **Multi-Category Filter**: Dynamic multi-select checkboxes allowing users to filter by one or more categories simultaneously.
- **Price Range Slider**: Interactive slider to filter products up to the maximum price, calculated dynamically from the dataset.
- **Sorting Options**: Sort catalog items by Top Rated, Price: Low to High, Price: High to Low, and Alphabetical (A-Z).
- **Clear All Filters**: One-click reset for search, categories, price range, and sorting.
- **Load More Pagination**: Performance-friendly pagination that loads 8 products at a time to minimize rendering overhead.
- **Mobile Filter Drawer**: Responsive sidebar that slides in on mobile and tablet screens.

### 3. Product Details
- **Interactive Zoom**: Custom hover-to-zoom effect on high-resolution product images.
- **Complete Specs**: Displays category, title, description, and price.
- **Star Ratings**: Visual star rating rendering (full, half, and empty stars) alongside numerical review counts.
- **Quantity Selector**: Limits quantities between 1 and 10 items.
- **Related Products Shelf**: Suggests up to 4 related items from the same category.

### 4. Shopping Cart
- **Persistent State**: Cart items, quantities, and totals are saved in `localStorage`.
- **Dynamic Calculator**: Real-time recalculations of subtotal, 10% estimated tax, shipping cost, and final total.
- **Free Shipping Progress Bar**: Interactive banner showing how much more the user needs to spend to unlock free shipping ($100 threshold).
- **Simulated Checkout**: A premium payment simulation that opens a glassmorphic success screen showing order details and a random order number upon completion.

### 5. Wishlist
- **Quick Save**: Toggle items into the wishlist using heart icons on product cards or detail pages.
- **Persistent State**: Persisted in `localStorage`.
- **Dedicated Page**: A clean grid layout for saved items with quick options to add to cart or remove.

### 6. UI/UX Design
- **Theme Toggle**: Seamless switching between Light and Dark modes, persisting the user's choice in `localStorage`.
- **Glassmorphism**: Backdrop filters, translucent borders, and multi-layered shadows.
- **Responsive Layout**: Designed mobile-first using CSS Grid and Flexbox.
- **Typography**: Imported `Outfit` and `Inter` Google Fonts for a clean, editorial look.

### 7. Performance & Code Quality
- **Code Splitting**: Used React `lazy` and `Suspense` to split pages into separate chunks, reducing initial load times.
- **Component Reusability**: Shared components like `ProductCard`, `Spinner`, and `ErrorState` are modular.
- **API Optimization**: Memoized filters and sorting to prevent unnecessary recalculations on state changes.

---

## 🛠️ Technology Stack
- **Frontend Library**: React.js (v19.2.7)
- **Build Tool**: Vite (v8.1.1)
- **Routing**: React Router DOM (v7.1.1)
- **Icons**: Lucide React (v0.471.1) and Custom SVGs for brand icons
- **State Management**: React Context API
- **Persistence**: LocalStorage API
- **Styling**: Vanilla CSS3 (with CSS Custom Properties/Variables)
- **API Source**: [Fake Store API](https://fakestoreapi.com/)

---

## 📁 Project Structure

```
task5/
├── dist/                  # Optimized production build outputs
├── public/                # Static assets (favicons, manifest)
├── src/
│   ├── assets/            # Local images, illustrations, and logos
│   ├── components/        # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── ProductCard.jsx
│   │   ├── ProductCard.css
│   │   ├── Spinner.jsx
│   │   ├── Spinner.css
│   │   ├── ErrorState.jsx
│   │   └── ErrorState.css
│   ├── context/           # Global React Contexts
│   │   ├── ThemeContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── layouts/           # Page Shell Layouts
│   │   ├── RootLayout.jsx
│   │   └── RootLayout.css
│   ├── pages/             # Page Components
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Products.jsx
│   │   ├── Products.css
│   │   ├── ProductDetail.jsx
│   │   ├── ProductDetail.css
│   │   ├── Cart.jsx
│   │   ├── Cart.css
│   │   ├── Wishlist.jsx
│   │   ├── Wishlist.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── NotFound.jsx
│   │   └── NotFound.css
│   ├── services/          # API Services
│   │   └── api.js
│   ├── styles/            # Core Global Styles
│   │   ├── variables.css  # HSL Design tokens
│   │   └── global.css     # Resets & utility classes
│   ├── App.jsx            # Routing & Context Wrapper
│   └── main.jsx           # Mount point
├── index.html             # HTML entry point (SEO optimized)
├── package.json           # Scripts and dependencies
└── vite.config.js         # Vite configuration
```

---

## 💻 Installation & Local Setup

Follow these steps to run the project locally:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Steps
1. **Clone or Download the Repository**:
   ```bash
   cd task5
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The application will start locally. Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for Production**:
   To compile and optimize the app for production:
   ```bash
   npm run build
   ```
   The output files will be generated in the `dist/` folder.

5. **Preview the Production Build**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Steps

### Deploying to Vercel
ShopSphere is configured for zero-config deployment on **Vercel**:

1. Install the Vercel CLI or connect your GitHub repository to Vercel.
2. In the Vercel Dashboard, click **New Project** and import your repository.
3. Vercel will automatically detect **Vite** as the framework and configure the build settings:
   - **Build Command**: `npm run build` or `vite build`
   - **Output Directory**: `dist`
4. Click **Deploy**.
5. *Note: Since the app uses React Router with client-side routing, ensure you have a `vercel.json` file in the root directory (optional but recommended) to handle page redirects to `index.html`.*

---

## 🔮 Future Improvements
1. **User Authentication**: Implement JWT-based login (sign up, sign in, profile page).
2. **Product Reviews**: Add a customer review system allowing users to leave text feedback and star ratings.
3. **Advanced Checkout**: Integrate a real payment gateway (Stripe or PayPal sandbox).
4. **Admin Dashboard**: Create a dashboard for managing products, viewing order logs, and tracking sales analytics.
