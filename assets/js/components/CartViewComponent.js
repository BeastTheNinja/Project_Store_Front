// CartViewComponent.js - Cart view with items, checkout functionality

// ========================================
// CART VIEW COMPONENT
// ========================================

// Create cart view modal/page
const createCartView = () => {
  const cartView = document.createElement('div');
  cartView.id = 'cart-view';
  cartView.classList.add('cart-overlay', 'hidden');
  
  cartView.innerHTML = `
    <div class="cart-modal">
      <div class="cart-header">
        <h2 class="cart-title">
          <span class="cart-icon">🛒</span>
          Your Shopping Cart
        </h2>
        <button class="cart-close-btn" aria-label="Close cart">
          <span>✕</span>
        </button>
      </div>
      
      <div class="cart-content">
        <div class="cart-items-container">
          <!-- Cart items will be populated here -->
        </div>
        
        <div class="cart-summary">
          <!-- Cart summary will be populated here -->
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(cartView);
  setupCartViewEvents();
  return cartView;
};

// ========================================
// CART ITEMS RENDERING
// ========================================

// Render cart items
const renderCartItems = (cartData) => {
  const itemsContainer = document.querySelector('#cart-view .cart-items-container');
  if (!itemsContainer) return;
  
  if (!cartData.products || cartData.products.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
        <button class="btn-continue-shopping">Continue Shopping</button>
      </div>
    `;
    return;
  }
  
  itemsContainer.innerHTML = `
    <div class="cart-items-header">
      <h3>Items in your cart (${cartData.totalItems})</h3>
      <button class="btn-clear-cart">Clear Cart</button>
    </div>
    
    <div class="cart-items-list">
      ${cartData.products.map(product => createCartItemHTML(product)).join('')}
    </div>
  `;
};

// Create HTML for individual cart item
const createCartItemHTML = (product) => {
  const itemTotal = (product.price * product.quantity).toFixed(2);
  
  return `
    <div class="cart-item" data-product-id="${product.id}">
      <div class="item-image">
        <img src="${product.thumbnail || '/api/placeholder/80/80'}" 
             alt="${product.title}" 
             loading="lazy">
      </div>
      
      <div class="item-details">
        <h4 class="item-title">${product.title}</h4>
        <p class="item-price">$${product.price}</p>
        ${product.discountPercentage > 0 ? 
          `<span class="item-discount">-${product.discountPercentage}% off</span>` : 
          ''
        }
      </div>
      
      <div class="item-quantity">
        <label class="quantity-label">Qty:</label>
        <div class="quantity-controls">
          <button class="qty-btn qty-decrease" data-product-id="${product.id}">-</button>
          <input type="number" 
                 class="qty-input" 
                 value="${product.quantity}" 
                 min="1" 
                 max="10"
                 data-product-id="${product.id}">
          <button class="qty-btn qty-increase" data-product-id="${product.id}">+</button>
        </div>
      </div>
      
      <div class="item-total">
        <span class="total-label">Total:</span>
        <span class="total-price">$${itemTotal}</span>
      </div>
      
      <div class="item-actions">
        <button class="btn-remove-item" data-product-id="${product.id}" title="Remove item">
          <span>🗑️</span>
        </button>
      </div>
    </div>
  `;
};

// ========================================
// CART SUMMARY RENDERING
// ========================================

// Render cart summary
const renderCartSummary = (cartData) => {
  const summaryContainer = document.querySelector('#cart-view .cart-summary');
  if (!summaryContainer) return;
  
  if (!cartData.products || cartData.products.length === 0) {
    summaryContainer.innerHTML = '';
    return;
  }
  
  const subtotal = cartData.subtotal || cartData.total;
  const discount = subtotal - (cartData.total || subtotal);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const finalTotal = (cartData.total || subtotal) + shipping;
  
  summaryContainer.innerHTML = `
    <div class="summary-section">
      <h3>Order Summary</h3>
      
      <div class="summary-line">
        <span>Subtotal (${cartData.totalItems} items):</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      
      ${discount > 0 ? `
        <div class="summary-line discount">
          <span>Discount:</span>
          <span>-$${discount.toFixed(2)}</span>
        </div>
      ` : ''}
      
      <div class="summary-line">
        <span>Shipping:</span>
        <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
      </div>
      
      ${shipping === 0 ? `
        <div class="free-shipping-note">
          <span class="free-icon">🚚</span>
          Free shipping on orders over $50!
        </div>
      ` : `
        <div class="shipping-note">
          Add $${(50 - subtotal).toFixed(2)} more for free shipping
        </div>
      `}
      
      <div class="summary-line total">
        <span>Total:</span>
        <span>$${finalTotal.toFixed(2)}</span>
      </div>
      
      <div class="cart-actions">
        <button class="btn-continue-shopping">Continue Shopping</button>
        <button class="btn-checkout">Proceed to Checkout</button>
      </div>
      
      <div class="security-badges">
        <div class="security-item">
          <span>🔒</span>
          <span>Secure Checkout</span>
        </div>
        <div class="security-item">
          <span>📦</span>
          <span>Free Returns</span>
        </div>
        <div class="security-item">
          <span>🛡️</span>
          <span>Buyer Protection</span>
        </div>
      </div>
    </div>
  `;
};

// ========================================
// EVENT HANDLERS
// ========================================

// Setup cart view event listeners
const setupCartViewEvents = () => {
  const cartView = document.getElementById('cart-view');
  if (!cartView) return;
  
  // Close cart events
  cartView.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-overlay')) {
      hideCartView();
    }
    
    if (e.target.closest('.cart-close-btn')) {
      hideCartView();
    }
  });
  
  // Cart item interactions
  cartView.addEventListener('click', (e) => {
    const productId = e.target.getAttribute('data-product-id');
    
    // Quantity controls
    if (e.target.classList.contains('qty-decrease')) {
      updateItemQuantity(productId, 'decrease');
    }
    
    if (e.target.classList.contains('qty-increase')) {
      updateItemQuantity(productId, 'increase');
    }
    
    // Remove item
    if (e.target.closest('.btn-remove-item')) {
      removeCartItem(productId);
    }
    
    // Clear cart
    if (e.target.classList.contains('btn-clear-cart')) {
      clearCart();
    }
    
    // Continue shopping
    if (e.target.classList.contains('btn-continue-shopping')) {
      hideCartView();
    }
    
    // Proceed to checkout
    if (e.target.classList.contains('btn-checkout')) {
      proceedToCheckout();
    }
  });
  
  // Quantity input changes
  cartView.addEventListener('change', (e) => {
    if (e.target.classList.contains('qty-input')) {
      const productId = e.target.getAttribute('data-product-id');
      const newQuantity = parseInt(e.target.value);
      
      if (newQuantity > 0) {
        updateItemQuantityDirect(productId, newQuantity);
      }
    }
  });
  
  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !cartView.classList.contains('hidden')) {
      hideCartView();
    }
  });
};

// ========================================
// CART OPERATIONS
// ========================================

// Update item quantity
const updateItemQuantity = async (productId, action) => {
  try {
    const qtyInput = document.querySelector(`input[data-product-id="${productId}"]`);
    if (!qtyInput) return;
    
    let currentQty = parseInt(qtyInput.value);
    let newQty = currentQty;
    
    if (action === 'increase') {
      newQty = Math.min(currentQty + 1, 10);
    } else if (action === 'decrease') {
      newQty = Math.max(currentQty - 1, 1);
    }
    
    if (newQty !== currentQty) {
      qtyInput.value = newQty;
      
      // Dispatch update event
      window.dispatchEvent(new CustomEvent('updateCartQuantity', {
        detail: { productId: parseInt(productId), quantity: newQty }
      }));
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};

// Update item quantity directly
const updateItemQuantityDirect = async (productId, quantity) => {
  try {
    window.dispatchEvent(new CustomEvent('updateCartQuantity', {
      detail: { productId: parseInt(productId), quantity }
    }));
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};

// Remove item from cart
const removeCartItem = async (productId) => {
  try {
    if (confirm('Remove this item from your cart?')) {
      window.dispatchEvent(new CustomEvent('removeFromCart', {
        detail: { productId: parseInt(productId) }
      }));
    }
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

// Clear entire cart
const clearCart = async () => {
  try {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      window.dispatchEvent(new CustomEvent('clearCart'));
    }
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};

// Proceed to checkout
const proceedToCheckout = () => {
  hideCartView();
  window.dispatchEvent(new CustomEvent('startCheckout'));
};

// ========================================
// MAIN FUNCTIONS
// ========================================

// Show cart view
const showCartView = (cartData) => {
  try {
    // Create cart view if it doesn't exist
    let cartView = document.getElementById('cart-view');
    if (!cartView) {
      cartView = createCartView();
    }
    
    // Render cart content
    renderCartItems(cartData);
    renderCartSummary(cartData);
    
    // Show modal
    cartView.classList.remove('hidden');
    document.body.classList.add('modal-open');
    
  } catch (error) {
    console.error('Error showing cart view:', error);
  }
};

// Hide cart view
const hideCartView = () => {
  const cartView = document.getElementById('cart-view');
  if (cartView) {
    cartView.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

// Update cart view content
const updateCartView = (cartData) => {
  const cartView = document.getElementById('cart-view');
  if (cartView && !cartView.classList.contains('hidden')) {
    renderCartItems(cartData);
    renderCartSummary(cartData);
  }
};

// ========================================
// CART MESSAGES
// ========================================

// Show cart message (success, error, etc.)
const showCartMessage = (message, type = 'info') => {
  // Remove existing message
  const existingMessage = document.querySelector('.cart-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('cart-message', `cart-message-${type}`);
  messageDiv.innerHTML = `
    <div class="message-content">
      <span class="message-icon">
        ${type === 'success' ? '✅' : 
          type === 'error' ? '❌' : 
          type === 'warning' ? '⚠️' : 'ℹ️'}
      </span>
      <span class="message-text">${message}</span>
      <button class="message-close">✕</button>
    </div>
  `;
  
  // Position and show message
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    background: ${type === 'success' ? '#10b981' : 
                 type === 'error' ? '#ef4444' : 
                 type === 'warning' ? '#f59e0b' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(messageDiv);
  
  // Animate in
  setTimeout(() => {
    messageDiv.style.transform = 'translateX(0)';
  }, 100);
  
  // Setup close button
  const closeBtn = messageDiv.querySelector('.message-close');
  closeBtn.addEventListener('click', () => {
    messageDiv.style.transform = 'translateX(100%)';
    setTimeout(() => messageDiv.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.style.transform = 'translateX(100%)';
      setTimeout(() => messageDiv.remove(), 300);
    }
  }, 5000);
};

// ========================================
// EVENT LISTENERS
// ========================================

// Setup global cart view event listeners
const setupCartViewGlobalEvents = () => {
  // Listen for cart view requests
  window.addEventListener('showCartView', (event) => {
    showCartView(event.detail);
  });
  
  // Listen for cart updates
  window.addEventListener('cartUpdated', (event) => {
    updateCartView(event.detail);
  });
  
  // Listen for cart messages
  window.addEventListener('showCartMessage', (event) => {
    const { message, type } = event.detail;
    showCartMessage(message, type);
  });
  
  // Listen for cart icon clicks
  window.addEventListener('viewCart', () => {
    // Request cart data
    window.dispatchEvent(new CustomEvent('requestCartData'));
  });
};

// ========================================
// EXPORTS
// ========================================

export {
  createCartView,
  showCartView,
  hideCartView,
  updateCartView,
  showCartMessage,
  setupCartViewGlobalEvents
};