// ProductDetailComponent.js - Detailed product view with purchase functionality

import { getProductById } from '../api.js';

// ========================================
// PRODUCT DETAIL VIEW
// ========================================

// Create product detail modal/view
const createProductDetailView = () => {
  const detailView = document.createElement('div');
  detailView.id = 'product-detail-view';
  detailView.classList.add('product-detail-overlay', 'hidden');
  
  detailView.innerHTML = `
    <div class="product-detail-modal">
      <div class="product-detail-header">
        <button class="detail-close-btn" aria-label="Close product details">
          <span>✕</span>
        </button>
        <button class="detail-back-btn">
          <span>←</span> Back to Products
        </button>
      </div>
      
      <div class="product-detail-content">
        <!-- Product content will be populated here -->
      </div>
    </div>
  `;
  
  document.body.appendChild(detailView);
  setupProductDetailEvents();
  return detailView;
};

// ========================================
// PRODUCT DETAIL CONTENT
// ========================================

// Render product details
const renderProductDetail = (product) => {
  const contentContainer = document.querySelector('#product-detail-view .product-detail-content');
  if (!contentContainer) return;
  
  // Calculate discount
  const hasDiscount = product.discountPercentage > 0;
  const discountedPrice = hasDiscount ? 
    (product.price * (1 - product.discountPercentage / 100)).toFixed(2) : 
    product.price;
  
  contentContainer.innerHTML = `
    <div class="product-detail-grid">
      
      <!-- Product Images Section -->
      <div class="product-images">
        <div class="main-image-container">
          <img src="${product.thumbnail || product.images?.[0] || '/api/placeholder/500/500'}" 
               alt="${product.title}" 
               class="main-product-image"
               id="main-product-image">
        </div>
        
        ${product.images && product.images.length > 1 ? `
          <div class="image-thumbnails">
            ${product.images.map((image, index) => `
              <img src="${image}" 
                   alt="${product.title} ${index + 1}" 
                   class="thumbnail-image ${index === 0 ? 'active' : ''}"
                   data-image="${image}">
            `).join('')}
          </div>
        ` : ''}
      </div>
      
      <!-- Product Information Section -->
      <div class="product-info">
        
        <!-- Breadcrumb -->
        <div class="product-breadcrumb">
          <a href="#" class="breadcrumb-link" data-action="home">Home</a>
          <span class="breadcrumb-separator">></span>
          <a href="#" class="breadcrumb-link" data-action="category" data-category="${product.category}">
            ${product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : 'Products'}
          </a>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-current">${product.title}</span>
        </div>
        
        <!-- Product Title & Rating -->
        <div class="product-header">
          <h1 class="product-title">${product.title}</h1>
          <div class="product-rating">
            <div class="stars">
              ${generateStarRating(product.rating || 0)}
            </div>
            <span class="rating-text">${product.rating || 'N/A'} (${product.reviews?.length || Math.floor(Math.random() * 100)} reviews)</span>
          </div>
        </div>
        
        <!-- Brand & Category -->
        <div class="product-meta">
          ${product.brand ? `<span class="product-brand">Brand: <strong>${product.brand}</strong></span>` : ''}
          <span class="product-category">Category: <strong>${product.category || 'General'}</strong></span>
          <span class="product-sku">SKU: <strong>${product.id.toString().padStart(6, '0')}</strong></span>
        </div>
        
        <!-- Price Section -->
        <div class="product-pricing">
          <div class="price-container">
            ${hasDiscount ? `
              <span class="original-price">$${product.price}</span>
              <span class="discounted-price">$${discountedPrice}</span>
              <span class="discount-badge">-${product.discountPercentage}%</span>
            ` : `
              <span class="current-price">$${product.price}</span>
            `}
          </div>
          <div class="stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
            ${product.stock > 0 ? 
              `<span class="stock-icon">✓</span> ${product.stock} in stock` : 
              `<span class="stock-icon">✗</span> Out of stock`
            }
          </div>
        </div>
        
        <!-- Product Description -->
        <div class="product-description">
          <h3>Description</h3>
          <p>${product.description || 'No description available.'}</p>
        </div>
        
        <!-- Quantity & Purchase Section -->
        <div class="product-purchase">
          <div class="quantity-selector">
            <label for="quantity-input">Quantity:</label>
            <div class="quantity-controls">
              <button class="quantity-btn" data-action="decrease">-</button>
              <input type="number" id="quantity-input" value="1" min="1" max="${product.stock || 10}">
              <button class="quantity-btn" data-action="increase">+</button>
            </div>
          </div>
          
          <div class="purchase-actions">
            <button class="btn-buy-now" data-product-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
              <span class="btn-icon">🛒</span>
              Køb nu
            </button>
            <button class="btn-add-to-cart-detail" data-product-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
              Add to Cart
            </button>
          </div>
        </div>
        
        <!-- Additional Product Details -->
        <div class="product-details">
          <div class="detail-tabs">
            <button class="tab-btn active" data-tab="specifications">Specifications</button>
            <button class="tab-btn" data-tab="shipping">Shipping</button>
            <button class="tab-btn" data-tab="returns">Returns</button>
          </div>
          
          <div class="tab-content">
            <div class="tab-panel active" data-panel="specifications">
              <ul class="specs-list">
                ${product.brand ? `<li><strong>Brand:</strong> ${product.brand}</li>` : ''}
                <li><strong>Weight:</strong> ${product.weight || 'N/A'} kg</li>
                <li><strong>Dimensions:</strong> ${product.dimensions ? 
                  `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm` : 
                  'N/A'}</li>
                <li><strong>Warranty:</strong> ${product.warrantyInformation || '1 year manufacturer warranty'}</li>
                <li><strong>Return Policy:</strong> ${product.returnPolicy || '30-day return policy'}</li>
              </ul>
            </div>
            
            <div class="tab-panel" data-panel="shipping">
              <p><strong>Shipping Information:</strong></p>
              <ul>
                <li>Free shipping on orders over $50</li>
                <li>Standard delivery: 3-5 business days</li>
                <li>Express delivery: 1-2 business days (+$9.99)</li>
                <li>Ships from our Danish warehouse</li>
              </ul>
            </div>
            
            <div class="tab-panel" data-panel="returns">
              <p><strong>Return Policy:</strong></p>
              <ul>
                <li>30-day return window</li>
                <li>Items must be in original condition</li>
                <li>Free returns for defective items</li>
                <li>Return shipping: $4.99 (deducted from refund)</li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  `;
  
  // Setup image switching
  setupImageSwitching();
  
  // Setup quantity controls
  setupQuantityControls();
  
  // Setup tabs
  setupDetailTabs();
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Generate star rating HTML
const generateStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let stars = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<span class="star full">★</span>';
  }
  
  // Half star
  if (hasHalfStar) {
    stars += '<span class="star half">★</span>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '<span class="star empty">☆</span>';
  }
  
  return stars;
};

// ========================================
// EVENT HANDLERS
// ========================================

// Setup product detail event listeners
const setupProductDetailEvents = () => {
  const detailView = document.getElementById('product-detail-view');
  if (!detailView) return;
  
  // Close modal events
  detailView.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-detail-overlay')) {
      hideProductDetail();
    }
    
    if (e.target.closest('.detail-close-btn')) {
      hideProductDetail();
    }
    
    if (e.target.closest('.detail-back-btn')) {
      hideProductDetail();
    }
  });
  
  // Breadcrumb navigation
  detailView.addEventListener('click', (e) => {
    if (e.target.classList.contains('breadcrumb-link')) {
      e.preventDefault();
      const action = e.target.getAttribute('data-action');
      const category = e.target.getAttribute('data-category');
      
      hideProductDetail();
      
      if (action === 'home') {
        window.dispatchEvent(new CustomEvent('loadAllProducts'));
      } else if (action === 'category' && category) {
        window.dispatchEvent(new CustomEvent('loadCategoryProducts', { detail: { category } }));
      }
    }
  });
  
  // Purchase actions
  detailView.addEventListener('click', (e) => {
    if (e.target.closest('.btn-buy-now')) {
      const productId = e.target.closest('.btn-buy-now').getAttribute('data-product-id');
      const quantity = parseInt(document.getElementById('quantity-input').value);
      handleBuyNow(productId, quantity);
    }
    
    if (e.target.closest('.btn-add-to-cart-detail')) {
      const productId = e.target.closest('.btn-add-to-cart-detail').getAttribute('data-product-id');
      const quantity = parseInt(document.getElementById('quantity-input').value);
      handleAddToCart(productId, quantity);
    }
  });
  
  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !detailView.classList.contains('hidden')) {
      hideProductDetail();
    }
  });
};

// Setup image switching
const setupImageSwitching = () => {
  const thumbnails = document.querySelectorAll('.thumbnail-image');
  const mainImage = document.getElementById('main-product-image');
  
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      // Update active thumbnail
      thumbnails.forEach(t => t.classList.remove('active'));
      thumbnail.classList.add('active');
      
      // Update main image
      if (mainImage) {
        mainImage.src = thumbnail.getAttribute('data-image');
      }
    });
  });
};

// Setup quantity controls
const setupQuantityControls = () => {
  const quantityInput = document.getElementById('quantity-input');
  const decreaseBtn = document.querySelector('[data-action="decrease"]');
  const increaseBtn = document.querySelector('[data-action="increase"]');
  
  if (!quantityInput) return;
  
  decreaseBtn?.addEventListener('click', () => {
    const current = parseInt(quantityInput.value);
    const min = parseInt(quantityInput.min) || 1;
    if (current > min) {
      quantityInput.value = current - 1;
    }
  });
  
  increaseBtn?.addEventListener('click', () => {
    const current = parseInt(quantityInput.value);
    const max = parseInt(quantityInput.max) || 10;
    if (current < max) {
      quantityInput.value = current + 1;
    }
  });
  
  quantityInput.addEventListener('change', () => {
    const value = parseInt(quantityInput.value);
    const min = parseInt(quantityInput.min) || 1;
    const max = parseInt(quantityInput.max) || 10;
    
    if (value < min) quantityInput.value = min;
    if (value > max) quantityInput.value = max;
  });
};

// Setup detail tabs
const setupDetailTabs = () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Update active tab
      tabBtns.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      
      // Update active panel
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.getAttribute('data-panel') === targetTab) {
          panel.classList.add('active');
        }
      });
    });
  });
};

// ========================================
// MAIN FUNCTIONS
// ========================================

// Show product detail
const showProductDetail = async (productId) => {
  try {
    // Show loading
    window.dispatchEvent(new CustomEvent('showLoading'));
    
    // Get product details
    const product = await getProductById(productId);
    
    // Create detail view if it doesn't exist
    let detailView = document.getElementById('product-detail-view');
    if (!detailView) {
      detailView = createProductDetailView();
    }
    
    // Render product details
    renderProductDetail(product);
    
    // Show modal
    detailView.classList.remove('hidden');
    document.body.classList.add('modal-open');
    
  } catch (error) {
    console.error('Error showing product detail:', error);
    window.dispatchEvent(new CustomEvent('showError', { 
      detail: { message: 'Failed to load product details' } 
    }));
  } finally {
    window.dispatchEvent(new CustomEvent('hideLoading'));
  }
};

// Hide product detail
const hideProductDetail = () => {
  const detailView = document.getElementById('product-detail-view');
  if (detailView) {
    detailView.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

// Handle "Buy Now" action
const handleBuyNow = async (productId, quantity) => {
  try {
    // Add to cart first
    await handleAddToCart(productId, quantity);
    
    // Close product detail
    hideProductDetail();
    
    // Go directly to checkout
    window.dispatchEvent(new CustomEvent('startCheckout'));
    
  } catch (error) {
    console.error('Error with buy now:', error);
    window.dispatchEvent(new CustomEvent('showError', { 
      detail: { message: 'Failed to process purchase' } 
    }));
  }
};

// Handle "Add to Cart" action
const handleAddToCart = async (productId, quantity) => {
  try {
    // Dispatch add to cart event with quantity
    window.dispatchEvent(new CustomEvent('addToCartWithQuantity', { 
      detail: { productId, quantity } 
    }));
    
    // Show success message
    window.dispatchEvent(new CustomEvent('showCartMessage', {
      detail: { 
        message: `Added ${quantity} item(s) to cart!`, 
        type: 'success' 
      }
    }));
    
  } catch (error) {
    console.error('Error adding to cart:', error);
    window.dispatchEvent(new CustomEvent('showError', { 
      detail: { message: 'Failed to add to cart' } 
    }));
  }
};

// ========================================
// EVENT LISTENERS
// ========================================

// Setup global event listeners
const setupProductDetailGlobalEvents = () => {
  // Listen for product detail requests
  window.addEventListener('viewProductDetails', (event) => {
    const { productId } = event.detail;
    showProductDetail(productId);
  });
  
  // Listen for product detail from product cards
  window.addEventListener('showProductDetail', (event) => {
    const { productId } = event.detail;
    showProductDetail(productId);
  });
};

// ========================================
// EXPORTS
// ========================================

export {
  createProductDetailView,
  showProductDetail,
  hideProductDetail,
  setupProductDetailGlobalEvents
};