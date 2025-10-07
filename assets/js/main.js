// import components here

// import modules here
import {
    // Main initialization function
    initializeStorefront
} from './view.js';

// import utils here


// WRITE YOUR CODE HERE

// Main function to initialize and load the storefront
const initializeApp = () => {
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
        // Dispatch event for DataLoader to handle
        window.dispatchEvent(new CustomEvent('loadProductById', { detail: { productId } }));
    });
    
    // Handle add to cart events
    window.addEventListener('addToCart', (event) => {
        const { productId } = event.detail;
        console.log(`Add product ${productId} to cart`);
        // You can implement cart functionality here later
    });
    
    // Category selection is now handled automatically by CategoryComponent
    // through the 'loadCategoryProducts' and 'loadAllProducts' events
};

// Initialize the app when DOM is loaded
initializeApp();
