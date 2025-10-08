// ========================================
// MAIN.JS - APPLICATION ENTRY POINT
// This is where our web application starts running
// ========================================

// Import the main initialization function from view.js
// This function sets up the entire user interface
import {
    initializeStorefront
} from './view.js';

// Import cart functionality for managing shopping cart
// CartManager handles adding/removing items and storing cart data
import { CartManager } from './cart.js';

// ========================================
// GLOBAL VARIABLES
// These variables can be accessed throughout the application
// ========================================

// Create a variable to hold our cart manager instance
let cartManager;

// ========================================
// APPLICATION STARTUP
// ========================================

// Main function that starts our entire application
// This runs when the page loads
const initializeApp = () => {
    // Step 1: Create the cart manager to handle shopping cart functionality
    cartManager = new CartManager();
    
    // Step 2: Create the user interface and load products from API
    initializeStorefront();
    
    // Step 3: Set up event listeners to handle user interactions
    setupAppEventListeners();
    
    // Let developers know the app started successfully
    console.log('App initialized successfully');
};

// Set up listeners for custom events that happen throughout the app
// Events are a way for different parts of the app to communicate
const setupAppEventListeners = () => {
    
    // Listen for when user wants to view product details
    // This happens when they click on a product card
    window.addEventListener('viewProductDetails', (event) => {
        const { productId } = event.detail; // Get the product ID from the event
        console.log(`Viewing product details for ID: ${productId}`);
        // The actual display is handled by ProductDetailComponent
    });
    
    // Listen for when user wants to add something to cart
    // This happens when they click "Add to Cart" buttons
    window.addEventListener('addToCart', (event) => {
        const { productId, quantity = 1 } = event.detail; // Get product info from event
        console.log(`Add product ${productId} to cart (quantity: ${quantity})`);
        
        // Use our cart manager to actually add the item
        if (cartManager) {
            cartManager.addToCart(productId, quantity);
        }
    });
    
    // Listen for when user wants to view their cart
    // This happens when they click the cart icon
    window.addEventListener('showCart', () => {
        console.log('Show cart requested');
        // The cart display is handled by CartViewComponent
    });
    
    // Listen for when user wants to start checkout process
    // This happens when they click "Checkout" in the cart
    window.addEventListener('startCheckout', () => {
        console.log('Start checkout requested');
        // The checkout process is handled by CheckoutComponent
    });
    
    // Note: Category filtering and search are handled automatically
    // by other components - no manual setup needed here
};

// Start the application immediately when this file loads
// This is the entry point that kicks everything off
initializeApp();
