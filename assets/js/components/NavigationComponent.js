// NavigationComponent.js - Handles navigation bar creation and functionality

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
        // Dispatch custom event for search
        window.dispatchEvent(new CustomEvent('navSearchProducts', { detail: { query } }));
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

// Populate navigation dropdown with categories
const populateNavigationDropdown = (categories) => {
  const navDropdownMenu = document.getElementById('categories-dropdown-menu');
  if (navDropdownMenu) {
    navDropdownMenu.innerHTML = '';
    
    // Add "All Products" option
    const allProductsItem = document.createElement('button');
    allProductsItem.classList.add('dropdown-item');
    allProductsItem.textContent = 'All Products';
    allProductsItem.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('loadAllProducts'));
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
        window.dispatchEvent(new CustomEvent('loadCategoryProducts', { detail: { category } }));
        closeDropdown();
      });
      
      navDropdownMenu.appendChild(categoryItem);
    });
  }
};

export {
  createNavigation,
  setupNavigationEvents,
  toggleDropdown,
  openDropdown,
  closeDropdown,
  populateNavigationDropdown
};