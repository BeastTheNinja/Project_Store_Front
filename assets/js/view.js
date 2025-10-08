// ========================================
// VIEW.JS - USER INTERFACE COORDINATOR
// This file brings together all the different parts of our website
// Think of it as the "conductor" of an orchestra - coordinating all components
// ========================================

// Import navigation functions (header, search, menus)
import { 
  createNavigation,           // Creates the top navigation bar
  setupNavigationEvents,      // Handles clicks on navigation items
  populateNavigationDropdown  // Fills category dropdown with data
} from './components/NavigationComponent.js';

// Import UI state management (loading spinners, error messages)
import { 
  createUIStateElements,  // Creates loading and error message elements
  showLoadingSpinner,     // Shows spinner when loading data
  hideLoadingSpinner,     // Hides spinner when done loading
  showError,             // Shows error messages to user
  hideError,             // Hides error messages
  updateDisplayInfo      // Updates "showing X of Y products" text
} from './components/UIStateManager.js';

// Import product display functions (product grid, cards)
import { 
  renderProducts,             // Displays products in a grid
  createProductsContainer,    // Creates the container for product grid
  setupProductEventListeners  // Handles clicks on product cards
} from './components/ProductComponent.js';

// Import category functions (category buttons, filtering)
import { 
  createCategoriesSection,  // Creates category filter buttons
  renderCategories         // Loads and displays all categories
} from './components/CategoryComponent.js';

// Import data loading functions (API calls, product fetching)
import { 
  setupDataLoaderEvents,   // Sets up listeners for data loading events
  loadAndDisplayProducts   // Fetches products from API and displays them
} from './components/DataLoader.js';

// Import footer creation function
import { 
  createFooter  // Creates the website footer
} from './components/FooterComponent.js';

// Import advanced shopping features (detailed views, cart, checkout)
// These are more complex components for the full shopping experience
import { 
  createProductDetailView,        // Creates modal for detailed product view
  showProductDetail,             // Shows product detail modal
  hideProductDetail,             // Hides product detail modal
  setupProductDetailGlobalEvents // Sets up event listeners for product details
} from './components/ProductDetailComponent.js';

import { 
  createCartView,             // Creates shopping cart modal
  showCartView,              // Shows cart modal with items
  hideCartView,              // Hides cart modal
  updateCartView,            // Updates cart display when items change
  setupCartViewGlobalEvents  // Sets up event listeners for cart
} from './components/CartViewComponent.js';
import { 
  createCheckoutView,        // Creates checkout process modal
  showCheckout,             // Shows checkout modal for payment
  hideCheckout,             // Hides checkout modal
  setupCheckoutGlobalEvents // Sets up event listeners for checkout
} from './components/CheckoutComponent.js';

import { 
  createThankYouView,        // Creates order confirmation page
  showThankYou,             // Shows thank you page after purchase
  hideThankYou,             // Hides thank you page
  setupThankYouGlobalEvents // Sets up event listeners for thank you page
} from './components/ThankYouComponent.js';

// ========================================
// COMPONENT STORAGE
// These variables hold references to our UI components
// ========================================

// Store references to our modal/overlay components
// This lets us show/hide them later
let productDetailElement; // Holds the product detail modal
let cartViewElement;      // Holds the shopping cart modal
let checkoutElement;      // Holds the checkout process modal
let thankYouElement;      // Holds the order confirmation page

// ========================================
// BUILDING THE WEBSITE STRUCTURE
// This function creates all the main parts of our website layout
// ========================================

// Main function that builds the entire website structure
const createStorefrontElements = () => {
  // Step 1: Create the top navigation bar (header with logo, search, cart)
  createNavigation();
  
  // Step 2: Find or create the main content container
  // This is where products, categories, etc. will be displayed
  let mainContainer = document.getElementById('storefront-container');
  if (!mainContainer) {
    // If container doesn't exist, create it
    mainContainer = document.createElement('div');
    mainContainer.id = 'storefront-container';
    mainContainer.classList.add('storefront-container', 'container');
    document.body.appendChild(mainContainer); // Add it to the page
  }

  // Step 3: Create elements for loading states and error messages
  // These show when we're fetching data or when something goes wrong
  const { loadingSpinner, errorMessage } = createUIStateElements();

  // Step 4: Create the container where products will be displayed
  // This is the grid that shows all the product cards
  const productsContainer = createProductsContainer();

  // Step 5: Create the category filter section
  // This shows buttons like "All", "Electronics", "Clothing", etc.
  const categoriesSection = createCategoriesSection();

  // Step 6: Add all the sections to our main container in the right order
  // Order matters - categories first, then error messages, then products
  mainContainer.appendChild(categoriesSection);  // Category filter buttons
  mainContainer.appendChild(errorMessage);       // Error message area
  mainContainer.appendChild(productsContainer);  // Product grid

  // Step 7: Create the footer at the bottom of the page
  createFooter();

  // Step 8: Initialize advanced shopping features (cart, checkout, etc.)
  // These are more complex components that handle the shopping experience
  initializePurchaseFlowComponents();

  // Let developers know this step completed successfully
  console.log('✅ Website structure created successfully');
};

// ========================================
// ADVANCED SHOPPING FEATURES SETUP
// This sets up the complex shopping components (cart, checkout, etc.)
// ========================================

// Function that sets up all the advanced shopping features
const initializePurchaseFlowComponents = () => {
  // Create the product detail modal (shows when clicking on a product)
  // This modal displays full product info, images, description, "Buy Now" button
  productDetailElement = createProductDetailView();
  document.body.appendChild(productDetailElement);   // Add it to the page (hidden by default)
  setupProductDetailGlobalEvents();                  // Set up click handlers
  
  // Create the shopping cart modal (shows when clicking cart icon)
  // This modal displays all items in cart, quantities, total price, checkout button
  cartViewElement = createCartView();
  document.body.appendChild(cartViewElement);        // Add it to the page (hidden by default)
  setupCartViewGlobalEvents();                       // Set up click handlers
  
  // Create the checkout modal (shows when clicking "Checkout" in cart)
  // This modal handles payment info, shipping address, order confirmation
  checkoutElement = createCheckoutView();
  document.body.appendChild(checkoutElement);        // Add it to the page (hidden by default)
  setupCheckoutGlobalEvents();                       // Set up click handlers
  
  // Create the thank you page (shows after successful purchase)
  // This page displays order confirmation, order number, "Continue Shopping" button
  thankYouElement = createThankYouView();
  document.body.appendChild(thankYouElement);        // Add it to the page (hidden by default)
  setupThankYouGlobalEvents();                       // Set up click handlers
  
  // Let developers know all shopping features are ready
  console.log('✅ Advanced shopping features initialized successfully');
};

// ========================================
// EVENT HANDLING SETUP
// This sets up all the "listeners" that respond to user actions
// Think of events like messages sent between different parts of the app
// ========================================

// Main function that sets up all event listeners for the entire application
const setupEventListeners = () => {
  // Set up basic component event listeners
  setupProductEventListeners();  // Handles clicks on product cards
  setupDataLoaderEvents();       // Handles loading data from API
  setupNavigationEvents();       // Handles navigation menu clicks

  // Set up UI state event listeners (loading/error states)
  // These respond to events sent when we need to show/hide loading or errors
  window.addEventListener('showLoading', () => showLoadingSpinner());     // Show spinner
  window.addEventListener('hideLoading', () => hideLoadingSpinner());     // Hide spinner
  window.addEventListener('showError', (e) => showError(e.detail.message)); // Show error
  window.addEventListener('hideError', () => hideError());                // Hide error
  
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
// MAIN STARTUP FUNCTION
// This is the "main" function that starts everything
// ========================================

// Main function that initializes the entire website
// This is called from main.js to start the application
const initializeStorefront = () => {
  // Step 1: Build the website structure (header, navigation, product grid, footer)
  createStorefrontElements();
  
  // Step 2: Load categories from API and populate the filter buttons
  // .then() runs after the categories are loaded successfully
  renderCategories(populateNavigationDropdown).then(() => {
    console.log('✅ Product categories loaded from API');
  });
  
  // Step 3: Set up all event listeners for user interactions
  setupEventListeners();
  
  // Step 4: Load and display the initial set of products
  loadAndDisplayProducts();
  
  // Let developers know the entire application is ready
  console.log('🚀 Website fully loaded and ready for users');
};

// ========================================
// EXPORTS - Making functions available to other files
// These functions can be imported and used by other JavaScript files
// ========================================

export { 
  // Main function that starts the entire application
  // This is imported by main.js to start everything
  initializeStorefront,
  
  // Helper functions (mainly for testing or advanced use)
  createStorefrontElements,  // Builds the website structure
  setupEventListeners       // Sets up user interaction handlers
};