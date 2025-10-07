// DataLoader.js - Handles all data loading and API interactions

import { 
  getProducts,
  getProductsByCategory,
  searchProducts,
  getProductById
} from '../api.js';

// Example: Fetch and display all products with loading and error handling
const loadAndDisplayProducts = async () => {
  // Dispatch events to show loading and hide errors
  window.dispatchEvent(new CustomEvent('showLoading'));
  window.dispatchEvent(new CustomEvent('hideError'));

  try {
    // Limit to 9 products for "All Products" view (3x3 grid)
    const data = await getProducts();
    const limitedProducts = data.products.slice(0, 9);
    
    // Dispatch event to render products
    window.dispatchEvent(new CustomEvent('renderProducts', { detail: { products: limitedProducts } }));
    
    // Update display info
    window.dispatchEvent(new CustomEvent('updateDisplayInfo', { 
      detail: { 
        title: 'All Products', 
        showing: limitedProducts.length, 
        total: data.total 
      } 
    }));
    
  } catch (error) {
    console.error('Error loading products:', error);
    window.dispatchEvent(new CustomEvent('showError', { detail: { message: 'Failed to load products' } }));
  } finally {
    window.dispatchEvent(new CustomEvent('hideLoading'));
  }
};

// Example: Fetch and display products by category with loading and error handling
const loadAndDisplayProductsByCategory = async (category) => {
  window.dispatchEvent(new CustomEvent('showLoading'));
  window.dispatchEvent(new CustomEvent('hideError'));

  try {
    const data = await getProductsByCategory(category);
    // Limit to exactly 3 products per category
    const limitedProducts = data.products.slice(0, 3);
    
    // Dispatch event to render products
    window.dispatchEvent(new CustomEvent('renderProducts', { detail: { products: limitedProducts } }));
    
    // Update page title or show category info
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
    window.dispatchEvent(new CustomEvent('updateDisplayInfo', { 
      detail: { 
        title: formattedCategory, 
        showing: limitedProducts.length, 
        total: data.total 
      } 
    }));
    
  } catch (error) {
    console.error(`Error loading ${category} products:`, error);
    window.dispatchEvent(new CustomEvent('showError', { 
      detail: { message: `Failed to load ${category} products` } 
    }));
  } finally {
    window.dispatchEvent(new CustomEvent('hideLoading'));
  }
};

// Example: Search and display products with loading and error handling
const searchAndDisplayProducts = async (query) => {
  window.dispatchEvent(new CustomEvent('showLoading'));
  window.dispatchEvent(new CustomEvent('hideError'));

  try {
    const data = await searchProducts(query);
    // Limit search results to 9 products
    const limitedProducts = data.products.slice(0, 9);
    
    // Dispatch event to render products
    window.dispatchEvent(new CustomEvent('renderProducts', { detail: { products: limitedProducts } }));
    
    // Show search results info
    window.dispatchEvent(new CustomEvent('updateDisplayInfo', { 
      detail: { 
        title: `Search: "${query}"`, 
        showing: limitedProducts.length, 
        total: data.total 
      } 
    }));
    
  } catch (error) {
    console.error('Search error:', error);
    window.dispatchEvent(new CustomEvent('showError', { detail: { message: 'Search failed. Please try again.' } }));
  } finally {
    window.dispatchEvent(new CustomEvent('hideLoading'));
  }
};

// Example: Fetch and display product by ID with loading and error handling
const loadAndDisplayProductById = async (id) => {
  window.dispatchEvent(new CustomEvent('showLoading'));
  window.dispatchEvent(new CustomEvent('hideError'));

  try {
    const product = await getProductById(id);
    
    // Dispatch event to render single product
    window.dispatchEvent(new CustomEvent('renderProducts', { detail: { products: [product] } }));
    
    window.dispatchEvent(new CustomEvent('updateDisplayInfo', { 
      detail: { 
        title: product.title || 'Product Details', 
        showing: 1, 
        total: 1 
      } 
    }));
    
  } catch (error) {
    console.error('Error loading product:', error);
    window.dispatchEvent(new CustomEvent('showError', { detail: { message: 'Failed to load product' } }));
  } finally {
    window.dispatchEvent(new CustomEvent('hideLoading'));
  }
};

// Setup event listeners for data loading
const setupDataLoaderEvents = () => {
  // Listen for various data loading events
  window.addEventListener('loadAllProducts', () => {
    loadAndDisplayProducts();
  });

  window.addEventListener('loadCategoryProducts', (e) => {
    const { category } = e.detail;
    loadAndDisplayProductsByCategory(category);
  });

  window.addEventListener('navSearchProducts', (e) => {
    const { query } = e.detail;
    searchAndDisplayProducts(query);
  });

  window.addEventListener('searchProducts', (e) => {
    const { query } = e.detail;
    searchAndDisplayProducts(query);
  });

  window.addEventListener('loadProductById', (e) => {
    const { productId } = e.detail;
    loadAndDisplayProductById(productId);
  });
};

export {
  loadAndDisplayProducts,
  loadAndDisplayProductsByCategory,
  searchAndDisplayProducts,
  loadAndDisplayProductById,
  setupDataLoaderEvents
};