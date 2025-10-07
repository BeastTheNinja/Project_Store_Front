// to do list 
// Add loading spinners and error message handling to all API calls:
// Show loading indicator while fetching products
// Display an error message if API fails or no products are found
// Ensure error state is accessible and styled consistently.

import { 
  getProducts,
  getProductsByCategory,
  searchProducts,
  getProductById
} from './api.js';

// ========================================
// DYNAMIC HTML CREATION FUNCTIONS
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

  // Create loading spinner
  const loadingSpinner = document.createElement('div');
  loadingSpinner.id = 'loading-spinner';
  loadingSpinner.classList.add('loading-spinner', 'hide');
  loadingSpinner.innerHTML = `
    <div class="spinner-content">
      <div class="spinner-icon"></div>
      <p>Loading products...</p>
    </div>
  `;

  // Create error message container
  const errorMessage = document.createElement('div');
  errorMessage.id = 'error-message';
  errorMessage.classList.add('error-message', 'hide');

  // Create products container
  const productsContainer = document.createElement('div');
  productsContainer.id = 'products-container';
  productsContainer.classList.add('products-container');

  // Create categories section
  const categoriesSection = document.createElement('div');
  categoriesSection.id = 'categories-section';
  categoriesSection.classList.add('categories-section');
  categoriesSection.innerHTML = `
    <h3>Shop by Category</h3>
    <div id="categories-container" class="categories-container">
      <!-- Categories will be populated dynamically -->
    </div>
  `;

  // Append all elements to main container
  mainContainer.appendChild(categoriesSection);
  mainContainer.appendChild(loadingSpinner);
  mainContainer.appendChild(errorMessage);
  mainContainer.appendChild(productsContainer);

  // Append spinner to body for overlay effect
  document.body.appendChild(loadingSpinner);

  console.log('✅ Storefront elements created dynamically');
};

// Create navigation bar
const createNavigation = () => {
  // Check if nav already exists
  if (document.querySelector('.storefront-nav')) return;
  
  const nav = document.createElement('nav');
  nav.classList.add('storefront-nav');
  
  nav.innerHTML = `
    <div class="container">
      <div class="nav-container">
        <!-- Brand/Logo -->
        <a href="#" class="nav-brand">🛍️ ShopFront</a>
        
        <!-- Navigation Menu -->
        <div class="nav-menu">
          <div class="nav-dropdown" id="categories-dropdown">
            <button class="dropdown-trigger">
              Categories
              <span class="dropdown-icon">▼</span>
            </button>
            <div class="dropdown-menu" id="categories-dropdown-menu">
              <!-- Categories will be populated here -->
            </div>
          </div>
        </div>
        
        <!-- Search -->
        <div class="nav-search">
          <div class="search-wrapper">
            <input type="text" id="nav-search-input" placeholder="Search products..." class="search-input">
            <button id="nav-search-button" class="search-button">Search</button>
          </div>
        </div>
        
        <!-- Cart -->
        <div class="nav-cart">
          <button class="cart-button" id="cart-button">
            <span class="cart-icon">🛒</span>
            <span class="cart-count hidden" id="cart-count">0</span>
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Insert at the beginning of body
  document.body.insertBefore(nav, document.body.firstChild);
  
  // Setup navigation event listeners
  setupNavigationEvents();
};

// ========================================
// UI STATE MANAGEMENT FUNCTIONS
// ========================================

const showLoadingSpinner = () => {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.classList.add('show');
    spinner.classList.remove('hide');
  }
};

const hideLoadingSpinner = () => {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.classList.add('hide');
    spinner.classList.remove('show');
  }
};

const showError = (message) => {
  const errorContainer = document.getElementById('error-message');
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.classList.add('show');
    errorContainer.classList.remove('hide');
  }
};

const hideError = () => {
  const errorContainer = document.getElementById('error-message');
  if (errorContainer) {
    errorContainer.classList.add('hide');
    errorContainer.classList.remove('show');
  }
};
// ========================================
// PRODUCT RENDERING FUNCTIONS
// ========================================

const renderProducts = (products) => {
  const productsContainer = document.getElementById('products-container');
  if (!productsContainer) {
    console.warn('Products container not found');
    return;
  }
  
  productsContainer.innerHTML = ''; // Clear previous products

  if (!products || products.length === 0) {
    showError('No products found');
    return;
  }

  // Create products grid
  const productsGrid = document.createElement('div');
  productsGrid.classList.add('products-grid');

  products.forEach(product => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });

  productsContainer.appendChild(productsGrid);
};

// Create individual product card
const createProductCard = (product) => {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');
  productCard.setAttribute('data-product-id', product.id);

  // Create image element with better loading handling
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('product-image');
  
  const img = document.createElement('img');
  img.src = product.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
  img.alt = product.title || 'Product image';
  img.loading = 'lazy';
  img.decoding = 'async';
  
  // Add error handling for broken images
  img.onerror = () => {
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
    img.alt = 'Image unavailable';
  };
  
  // Add loading state
  img.onload = () => {
    imageContainer.classList.add('loaded');
  };
  
  imageContainer.appendChild(img);
  
  // Create product info section
  const productInfo = document.createElement('div');
  productInfo.classList.add('product-info');
  productInfo.innerHTML = `
    <h3 class="product-title">${product.title || 'Untitled Product'}</h3>
    <p class="product-description">${(product.description || 'No description available').substring(0, 100)}...</p>
    <div class="product-details">
      <span class="product-price">$${product.price || '0.00'}</span>
      <span class="product-rating">⭐ ${product.rating || 'N/A'}</span>
    </div>
    <div class="product-actions">
      <button class="btn-view-details" data-product-id="${product.id}">View Details</button>
      <button class="btn-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    </div>
  `;

  // Append both sections to card
  productCard.appendChild(imageContainer);
  productCard.appendChild(productInfo);

  return productCard;
};

// Create and populate categories
const renderCategories = async () => {
  try {
    // Get categories from API (you'll need to import this from api.js)
    const categories = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration'];
    
    // Populate main categories section
    const categoriesContainer = document.getElementById('categories-container');
    if (categoriesContainer) {
      categoriesContainer.innerHTML = '';

      // Add "All Products" button
      const allProductsBtn = document.createElement('button');
      allProductsBtn.classList.add('category-btn', 'active');
      allProductsBtn.textContent = 'All Products';
      allProductsBtn.addEventListener('click', () => {
        setActiveCategory(allProductsBtn);
        loadAndDisplayProducts();
      });
      categoriesContainer.appendChild(allProductsBtn);

      // Add category buttons (limit to first 6 for main section)
      categories.slice(0, 6).forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.classList.add('category-btn');
        categoryBtn.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
        categoryBtn.setAttribute('data-category', category);
        
        categoryBtn.addEventListener('click', () => {
          setActiveCategory(categoryBtn);
          loadAndDisplayProductsByCategory(category);
        });
        
        categoriesContainer.appendChild(categoryBtn);
      });
    }

    // Populate navigation dropdown
    const navDropdownMenu = document.getElementById('categories-dropdown-menu');
    if (navDropdownMenu) {
      navDropdownMenu.innerHTML = '';
      
      // Add "All Products" option
      const allProductsItem = document.createElement('button');
      allProductsItem.classList.add('dropdown-item');
      allProductsItem.textContent = 'All Products';
      allProductsItem.addEventListener('click', () => {
        loadAndDisplayProducts();
        closeDropdown();
      });
      navDropdownMenu.appendChild(allProductsItem);

      // Add all categories to dropdown
      categories.forEach(category => {
        const categoryItem = document.createElement('button');
        categoryItem.classList.add('dropdown-item');
        categoryItem.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
        categoryItem.setAttribute('data-category', category);
        
        categoryItem.addEventListener('click', () => {
          loadAndDisplayProductsByCategory(category);
          closeDropdown();
        });
        
        navDropdownMenu.appendChild(categoryItem);
      });
    }

  } catch (error) {
    console.error('Error rendering categories:', error);
  }
};

// Setup navigation event listeners
const setupNavigationEvents = () => {
  // Categories dropdown
  const dropdownTrigger = document.querySelector('.dropdown-trigger');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        closeDropdown();
      }
    });
  }
  
  // Navigation search
  const navSearchButton = document.getElementById('nav-search-button');
  const navSearchInput = document.getElementById('nav-search-input');
  
  if (navSearchButton && navSearchInput) {
    navSearchButton.addEventListener('click', () => {
      const query = navSearchInput.value.trim();
      if (query) {
        searchAndDisplayProducts(query);
      }
    });
    
    navSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        navSearchButton.click();
      }
    });
  }
};

// Dropdown functionality
const toggleDropdown = () => {
  const dropdownTrigger = document.querySelector('.dropdown-trigger');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  if (dropdownTrigger && dropdownMenu) {
    const isOpen = dropdownMenu.classList.contains('show');
    
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }
};

const openDropdown = () => {
  const dropdownTrigger = document.querySelector('.dropdown-trigger');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.classList.add('open');
    dropdownMenu.classList.add('show');
  }
};

const closeDropdown = () => {
  const dropdownTrigger = document.querySelector('.dropdown-trigger');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.classList.remove('open');
    dropdownMenu.classList.remove('show');
  }
};

// Set active category button
const setActiveCategory = (activeBtn) => {
  const categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
};
// Example: Fetch and display all products with loading and error handling
const loadAndDisplayProducts = async () => {
  showLoadingSpinner();
  hideError();

  try {
    // Limit to 9 products for "All Products" view (3x3 grid)
    const data = await getProducts();
    const limitedProducts = data.products.slice(0, 9);
    renderProducts(limitedProducts);
    
    // Update display info
    updateDisplayInfo('All Products', limitedProducts.length, data.total);
  } catch (error) {
    showError('Failed to load products');
  } finally {
    hideLoadingSpinner();
  }
};

// Example: Fetch and display products by category with loading and error handling
const loadAndDisplayProductsByCategory = async (category) => {
  showLoadingSpinner();
  hideError();

  try {
    const data = await getProductsByCategory(category);
    // Limit to exactly 3 products per category
    const limitedProducts = data.products.slice(0, 3);
    renderProducts(limitedProducts);
    
    // Update page title or show category info
    updateDisplayInfo(category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '), limitedProducts.length, data.total);
  } catch (error) {
    showError(`Failed to load ${category} products`);
  } finally {
    hideLoadingSpinner();
  }
};
// loadAndDisplayProductsByCategory('electronics');

// Example: Search and display products with loading and error handling
const searchAndDisplayProducts = async (query) => {
  showLoadingSpinner();
  hideError();

  try {
    const data = await searchProducts(query);
    // Limit search results to 9 products
    const limitedProducts = data.products.slice(0, 9);
    renderProducts(limitedProducts);
    
    // Show search results info
    updateDisplayInfo(`Search: "${query}"`, limitedProducts.length, data.total);
  } catch (error) {
    showError('Search failed. Please try again.');
  } finally {
    hideLoadingSpinner();
  }
};

// Update display info helper function
const updateDisplayInfo = (title, showing, total) => {
  const productsContainer = document.getElementById('products-container');
  if (productsContainer) {
    // Remove existing info
    const existingInfo = productsContainer.querySelector('.display-info');
    if (existingInfo) existingInfo.remove();
    
    // Add display info
    const displayInfo = document.createElement('div');
    displayInfo.classList.add('display-info');
    displayInfo.style.cssText = `
      text-align: center;
      margin-bottom: 2rem;
      padding: 1rem;
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    `;
    displayInfo.innerHTML = `
      <h2 style="margin: 0 0 0.5rem; color: #374151; font-size: 1.5rem;">${title}</h2>
      <p style="margin: 0; color: #6b7280;">Showing ${showing} of ${total} products</p>
    `;
    productsContainer.insertBefore(displayInfo, productsContainer.firstChild);
  }
};

// Example: Fetch and display product by ID with loading and error handling
const loadAndDisplayProductById = async (id) => {
  showLoadingSpinner();
  hideError();

  try {
    const product = await getProductById(id);
    renderProducts([product]);
  } catch (error) {
    showError('Failed to load product');
  } finally {
    hideLoadingSpinner();
  }
};

// ========================================
// INITIALIZATION FUNCTION
// ========================================

// Initialize the entire storefront UI
const initializeStorefront = () => {
  createStorefrontElements();
  renderCategories();
  setupEventListeners();
  console.log('🚀 Storefront initialized with dynamic elements');
};

// Setup event listeners for search and interactions
const setupEventListeners = () => {
  // Search functionality
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        // This will be connected to your main.js search function
        window.dispatchEvent(new CustomEvent('searchProducts', { detail: { query } }));
      }
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchButton.click();
      }
    });
  }

  // Product card interactions
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-view-details')) {
      const productId = e.target.getAttribute('data-product-id');
      window.dispatchEvent(new CustomEvent('viewProductDetails', { detail: { productId } }));
    }

    if (e.target.classList.contains('btn-add-to-cart')) {
      const productId = e.target.getAttribute('data-product-id');
      window.dispatchEvent(new CustomEvent('addToCart', { detail: { productId } }));
    }
  });
};

export { 
  // Initialization
  initializeStorefront,
  createStorefrontElements,
  createNavigation,
  setupEventListeners,
  setupNavigationEvents,
  
  // UI State Management
  showLoadingSpinner, 
  hideLoadingSpinner, 
  showError, 
  hideError, 
  
  // Rendering Functions
  renderProducts,
  renderCategories,
  createProductCard,
  setActiveCategory,
  
  // Navigation Functions
  toggleDropdown,
  openDropdown,
  closeDropdown,
  
  // Data Loading Functions (for main.js to use)
  loadAndDisplayProducts,
  loadAndDisplayProductsByCategory,
  searchAndDisplayProducts,
  loadAndDisplayProductById,
  
  // Helper Functions
  updateDisplayInfo
};