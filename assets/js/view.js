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

// Import new purchase flow components
import { 
  createProductDetailView,
  showProductDetail,
  hideProductDetail,
  setupProductDetailGlobalEvents
} from './components/ProductDetailComponent.js';
import { 
  createCartView,
  showCartView,
  hideCartView,
  updateCartView,
  setupCartViewGlobalEvents
} from './components/CartViewComponent.js';
import { 
  createCheckoutView,
  showCheckout,
  hideCheckout,
  setupCheckoutGlobalEvents
} from './components/CheckoutComponent.js';
import { 
  createThankYouView,
  showThankYou,
  hideThankYou,
  setupThankYouGlobalEvents
} from './components/ThankYouComponent.js';

// ========================================
// COMPONENT INSTANCES
// ========================================

// Initialize component instances
let productDetailElement;
let cartViewElement;
let checkoutElement;
let thankYouElement;

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

  // Initialize new purchase flow components
  initializePurchaseFlowComponents();

  console.log('✅ Storefront elements created dynamically');
};

// ========================================
// PURCHASE FLOW COMPONENTS INITIALIZATION
// ========================================

// Initialize all purchase flow components
const initializePurchaseFlowComponents = () => {
  // Initialize product detail component (function-based)
  productDetailElement = createProductDetailView();
  document.body.appendChild(productDetailElement);
  setupProductDetailGlobalEvents();
  
  // Initialize cart view component (function-based)
  cartViewElement = createCartView();
  document.body.appendChild(cartViewElement);
  setupCartViewGlobalEvents();
  
  // Initialize checkout component (function-based)
  checkoutElement = createCheckoutView();
  document.body.appendChild(checkoutElement);
  setupCheckoutGlobalEvents();
  
  // Initialize thank you component (function-based)
  thankYouElement = createThankYouView();
  document.body.appendChild(thankYouElement);
  setupThankYouGlobalEvents();
  
  console.log('✅ Purchase flow components initialized');
};

// ========================================
// EVENT COORDINATION AND SETUP
// ========================================

// Setup all event listeners and coordinate components
const setupEventListeners = () => {
  // Setup component-specific event listeners
  setupProductEventListeners();
  setupDataLoaderEvents();
  setupNavigationEvents();

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

  // ========================================
  // PURCHASE FLOW EVENT COORDINATION
  // ========================================

  // Product detail events
  window.addEventListener('viewProductDetails', (e) => {
    console.log('View product details for ID:', e.detail.productId);
    showProductDetail(e.detail.productId);
  });

  // Cart events
  window.addEventListener('addToCart', (e) => {
    console.log('Add to cart product ID:', e.detail.productId);
    // Cart addition is handled by CartManager in cart.js
  });

  window.addEventListener('showCart', () => {
    console.log('Show cart view');
    showCartView();
  });

  // Checkout events
  window.addEventListener('startCheckout', () => {
    console.log('Start checkout process');
    showCheckout();
  });

  // Order completion events
  window.addEventListener('orderPlaced', (e) => {
    console.log('Order placed:', e.detail.orderData);
    showThankYou(e.detail.orderData);
  });

  // Navigation flow events
  window.addEventListener('continueshopping', () => {
    console.log('Continue shopping - returning to product catalog');
    // Close all modals and return to main view
    hideProductDetail();
    hideCartView();
    hideCheckout();
    hideThankYou();
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