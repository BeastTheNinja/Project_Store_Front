// import components here

// import modules here
import {
    // Main initialization function
    initializeStorefront
} from './view.js';

// Import cart functionality
import { CartManager } from './cart.js';

// import utils here

// ========================================
// GLOBAL INSTANCES
// ========================================

// Initialize cart manager
let cartManager;

// ========================================
// APPLICATION INITIALIZATION
// ========================================

// Main function to initialize and load the storefront
const initializeApp = () => {
    // Initialize cart manager first
    cartManager = new CartManager();
    
    // Create the UI structure and load initial products
    initializeStorefront();
    
    // Setup custom event listeners for UI interactions
    setupAppEventListeners();
    
    console.log('App initialized successfully');
};

// Setup event listeners for custom events from components
const setupAppEventListeners = () => {
    // Handle search events - no longer needed as DataLoader handles this automatically
    // The navigation component already dispatches 'navSearchProducts' and DataLoader listens for it
    
    // Handle view product details events  
    window.addEventListener('viewProductDetails', (event) => {
        const { productId } = event.detail;
        // Product details are now handled by ProductDetailComponent via view.js
        console.log(`Viewing product details for ID: ${productId}`);
    });
    
    // Handle add to cart events - now properly handled by CartManager
    window.addEventListener('addToCart', (event) => {
        const { productId, quantity = 1 } = event.detail;
        console.log(`Add product ${productId} to cart (quantity: ${quantity})`);
        
        if (cartManager) {
            cartManager.addToCart(productId, quantity);
        }
    });
    
    // Handle cart actions
    window.addEventListener('showCart', () => {
        console.log('Show cart requested');
        // Cart view is handled by CartViewComponent via view.js
    });
    
    // Handle checkout initiation
    window.addEventListener('startCheckout', () => {
        console.log('Start checkout requested');
        // Checkout is handled by CheckoutComponent via view.js
    });
    
    // Category selection is now handled automatically by CategoryComponent
    // through the 'loadCategoryProducts' and 'loadAllProducts' events
};

// Initialize the app when DOM is loaded
initializeApp();
