// import components here

// import modules here
import {
    // Initialization
    initializeStorefront,
    setupEventListeners,
    
    // UI State Management  
    showLoadingSpinner,
    hideLoadingSpinner,
    showError,
    hideError,
    
    // Rendering Functions
    renderProducts,
    setActiveCategory,
    
    // Data Loading Functions
    loadAndDisplayProducts,
    loadAndDisplayProductsByCategory,
    searchAndDisplayProducts,
    loadAndDisplayProductById
} from './view.js';

// import utils here


// WRITE YOUR CODE HERE

// Main function to initialize and load the storefront
const initializeApp = () => {
    // Create the UI structure
    initializeStorefront();
    
    // Load initial products
    loadAndDisplayProducts();
    
    // Setup custom event listeners for UI interactions
    setupAppEventListeners();
    
    console.log('App initialized successfully');
};

// Setup event listeners for custom events from view.js
const setupAppEventListeners = () => {
    // Handle search events
    window.addEventListener('searchProducts', (event) => {
        const { query } = event.detail;
        searchAndDisplayProducts(query);
    });
    
    // Handle view product details events  
    window.addEventListener('viewProductDetails', (event) => {
        const { productId } = event.detail;
        loadAndDisplayProductById(productId);
    });
    
    // Handle add to cart events
    window.addEventListener('addToCart', (event) => {
        const { productId } = event.detail;
        console.log(`Add product ${productId} to cart`);
        // You can implement cart functionality here later
    });
    
    // Handle category selection
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('category-btn')) {
            const category = event.target.getAttribute('data-category');
            if (category) {
                loadAndDisplayProductsByCategory(category);
            } else {
                // "All Products" button clicked
                loadAndDisplayProducts();
            }
        }
    });
};

// Initialize the app when DOM is loaded
initializeApp();
