// view.js - Main orchestrator for the storefront application
// This file coordinates all components and handles initialization

// Import all components
import { 
  createNavigation, 
  setupNavigationEvents, 
  populateNavigationDropdown 
} from './components/NavigationComponent.js';

import { 
  createUIStateElements, 
  showLoadingSpinner, 
  hideLoadingSpinner, 
  showError, 
  hideError, 
  updateDisplayInfo 
} from './components/UIStateManager.js';

import { 
  renderProducts, 
  createProductsContainer, 
  setupProductEventListeners 
} from './components/ProductComponent.js';

import { 
  createCategoriesSection, 
  renderCategories 
} from './components/CategoryComponent.js';

import { 
  setupDataLoaderEvents, 
  loadAndDisplayProducts 
} from './components/DataLoader.js';

import { 
  createFooter 
} from './components/FooterComponent.js';

// ========================================
// MAIN STOREFRONT CREATION
// ========================================

// Create and inject the main storefront structure
const createStorefrontElements = () => {
  // Create navigation first
  createNavigation();
  
  // Find or create main container
  let mainContainer = document.getElementById('storefront-container');
  if (!mainContainer) {
    mainContainer = document.createElement('div');
    mainContainer.id = 'storefront-container';
    mainContainer.classList.add('storefront-container', 'container');
    document.body.appendChild(mainContainer);
  }

  // Create UI state elements (loading spinner, error messages)
  const { loadingSpinner, errorMessage } = createUIStateElements();

  // Create products container
  const productsContainer = createProductsContainer();

  // Create categories section
  const categoriesSection = createCategoriesSection();

  // Append all elements to main container
  mainContainer.appendChild(categoriesSection);
  mainContainer.appendChild(errorMessage);
  mainContainer.appendChild(productsContainer);

  // Create footer at the end
  createFooter();

  console.log('✅ Storefront elements created dynamically');
};

// ========================================
// EVENT COORDINATION AND SETUP
// ========================================

// Setup all event listeners and coordinate components
const setupEventListeners = () => {
  // Setup component-specific event listeners
  setupProductEventListeners();
  setupDataLoaderEvents();

  // Coordinate UI state events
  window.addEventListener('showLoading', () => showLoadingSpinner());
  window.addEventListener('hideLoading', () => hideLoadingSpinner());
  window.addEventListener('showError', (e) => showError(e.detail.message));
  window.addEventListener('hideError', () => hideError());
  
  // Coordinate product rendering
  window.addEventListener('renderProducts', (e) => {
    renderProducts(e.detail.products);
  });
  
  // Coordinate display info updates
  window.addEventListener('updateDisplayInfo', (e) => {
    const { title, showing, total } = e.detail;
    updateDisplayInfo(title, showing, total);
  });

  // Handle other product interactions (extend as needed)
  window.addEventListener('viewProductDetails', (e) => {
    console.log('View product details for ID:', e.detail.productId);
    // Add your product details logic here
  });

  window.addEventListener('addToCart', (e) => {
    console.log('Add to cart product ID:', e.detail.productId);
    // Add your cart logic here
  });
};

// ========================================
// INITIALIZATION FUNCTION
// ========================================

// Initialize the entire storefront UI
const initializeStorefront = () => {
  createStorefrontElements();
  
  // Render categories and pass the navigation populator function
  renderCategories(populateNavigationDropdown).then(() => {
    console.log('✅ Categories loaded');
  });
  
  setupEventListeners();
  
  // Load initial products
  loadAndDisplayProducts();
  
  console.log('🚀 Storefront initialized with component-based architecture');
};

// Export only the main functions needed by other modules
export { 
  // Main initialization function
  initializeStorefront,
  
  // Core setup functions
  createStorefrontElements,
  setupEventListeners
};