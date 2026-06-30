const BASE_URL = 'https://fakestoreapi.com';

/**
 * Helper to handle fetch responses and errors
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

/**
 * Fetch all products
 */
export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return handleResponse(response);
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return handleResponse(response);
};

/**
 * Fetch all categories
 */
export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  return handleResponse(response);
};

/**
 * Fetch products by category
 */
export const fetchProductsByCategory = async (category) => {
  const encodedCategory = encodeURIComponent(category);
  const response = await fetch(`${BASE_URL}/products/category/${encodedCategory}`);
  return handleResponse(response);
};

/**
 * Fetch related products (products in the same category, excluding the current product)
 * Capped at 4 items for UI layout.
 */
export const fetchRelatedProducts = async (category, currentProductId) => {
  const products = await fetchProductsByCategory(category);
  return products
    .filter((product) => product.id !== parseInt(currentProductId, 10))
    .slice(0, 4);
};
