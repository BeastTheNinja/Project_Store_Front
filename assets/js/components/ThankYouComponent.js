// ThankYouComponent.js - Thank you page with order confirmation

// ========================================
// THANK YOU COMPONENT
// ========================================

// Create thank you view
const createThankYouView = () => {
  const thankYouView = document.createElement('div');
  thankYouView.id = 'thank-you-view';
  thankYouView.classList.add('thank-you-overlay', 'hidden');
  
  thankYouView.innerHTML = `
    <div class="thank-you-modal">
      <div class="thank-you-content">
        <!-- Content will be populated dynamically -->
      </div>
    </div>
  `;
  
  document.body.appendChild(thankYouView);
  setupThankYouEvents();
  return thankYouView;
};

// ========================================
// THANK YOU CONTENT
// ========================================

// Render thank you page content
const renderThankYouContent = (orderData) => {
  const contentContainer = document.querySelector('#thank-you-view .thank-you-content');
  if (!contentContainer) return;
  
  const orderId = orderData.orderId || Date.now();
  const formattedOrderId = `#${orderId.toString().slice(-6).padStart(6, '0')}`;
  
  contentContainer.innerHTML = `
    <div class="success-animation">
      <div class="checkmark-container">
        <div class="checkmark">
          <div class="checkmark-circle"></div>
          <div class="checkmark-stem"></div>
          <div class="checkmark-kick"></div>
        </div>
      </div>
    </div>
    
    <div class="thank-you-header">
      <h1 class="success-title">Tak for dit køb!</h1>
      <p class="success-subtitle">Your order has been successfully placed</p>
    </div>
    
    <div class="order-confirmation">
      <div class="confirmation-card">
        <div class="confirmation-header">
          <h2>Order Confirmation</h2>
          <span class="order-number">${formattedOrderId}</span>
        </div>
        
        <div class="confirmation-details">
          <div class="detail-row">
            <span class="detail-label">Order Number:</span>
            <span class="detail-value">${formattedOrderId}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Customer:</span>
            <span class="detail-value">${orderData.customerName || 'N/A'}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value">${orderData.email || 'N/A'}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Order Date:</span>
            <span class="detail-value">${new Date().toLocaleDateString('da-DK')}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Total Amount:</span>
            <span class="detail-value total-amount">$${(orderData.total || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="order-status">
      <div class="status-timeline">
        <div class="status-step completed">
          <div class="step-icon">✅</div>
          <div class="step-content">
            <h4>Order Placed</h4>
            <p>Your order has been confirmed</p>
            <span class="step-time">Just now</span>
          </div>
        </div>
        
        <div class="status-step">
          <div class="step-icon">📦</div>
          <div class="step-content">
            <h4>Preparing</h4>
            <p>We're getting your items ready</p>
            <span class="step-time">Within 2 hours</span>
          </div>
        </div>
        
        <div class="status-step">
          <div class="step-icon">🚚</div>
          <div class="step-content">
            <h4>Shipped</h4>
            <p>Your order is on its way</p>
            <span class="step-time">1-3 days</span>
          </div>
        </div>
        
        <div class="status-step">
          <div class="step-icon">🏠</div>
          <div class="step-content">
            <h4>Delivered</h4>
            <p>Enjoy your purchase!</p>
            <span class="step-time">3-5 days</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="confirmation-messages">
      <div class="message-card email-confirmation">
        <div class="message-icon">📧</div>
        <div class="message-content">
          <h4>Email Confirmation Sent</h4>
          <p>A confirmation email with your order details has been sent to <strong>${orderData.email || 'your email address'}</strong></p>
        </div>
      </div>
      
      <div class="message-card tracking-info">
        <div class="message-icon">📱</div>
        <div class="message-content">
          <h4>Track Your Order</h4>
          <p>You'll receive tracking information via email once your order ships</p>
        </div>
      </div>
    </div>
    
    <div class="next-steps">
      <h3>What happens next?</h3>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-number">1</div>
          <h4>Order Processing</h4>
          <p>We'll prepare your items for shipment within 24 hours</p>
        </div>
        
        <div class="step-card">
          <div class="step-number">2</div>
          <h4>Shipping Notification</h4>
          <p>You'll receive an email with tracking details when shipped</p>
        </div>
        
        <div class="step-card">
          <div class="step-number">3</div>
          <h4>Delivery</h4>
          <p>Your package will arrive at your specified address</p>
        </div>
      </div>
    </div>
    
    <div class="customer-support">
      <div class="support-card">
        <h4>Need Help?</h4>
        <p>Our customer support team is here to help with any questions about your order.</p>
        <div class="support-options">
          <a href="#" class="support-link">
            <span>📞</span>
            <span>Call Support</span>
          </a>
          <a href="#" class="support-link">
            <span>💬</span>
            <span>Live Chat</span>
          </a>
          <a href="#" class="support-link">
            <span>✉️</span>
            <span>Email Us</span>
          </a>
        </div>
      </div>
    </div>
    
    <div class="thank-you-actions">
      <button class="btn-continue-shopping primary">
        <span class="btn-icon">🛍️</span>
        Handl videre
      </button>
      
      <button class="btn-view-order secondary">
        <span class="btn-icon">📋</span>
        View Order Details
      </button>
      
      <button class="btn-print-receipt">
        <span class="btn-icon">🖨️</span>
        Print Receipt
      </button>
    </div>
    
    <div class="recommendations">
      <h3>You might also like</h3>
      <p>Discover more amazing products from our collection</p>
      <div class="recommendation-actions">
        <button class="btn-browse-categories">Browse Categories</button>
        <button class="btn-special-offers">View Special Offers</button>
      </div>
    </div>
    
    <div class="social-sharing">
      <h4>Share your purchase</h4>
      <div class="social-buttons">
        <button class="social-btn facebook">
          <span>📘</span>
          <span>Share on Facebook</span>
        </button>
        <button class="social-btn twitter">
          <span>🐦</span>
          <span>Tweet about it</span>
        </button>
        <button class="social-btn instagram">
          <span>📷</span>
          <span>Share on Instagram</span>
        </button>
      </div>
    </div>
  `;
  
  // Start animations
  setTimeout(() => {
    startSuccessAnimation();
  }, 300);
};

// ========================================
// ANIMATIONS
// ========================================

// Start success animation
const startSuccessAnimation = () => {
  const checkmarkContainer = document.querySelector('.checkmark-container');
  const successTitle = document.querySelector('.success-title');
  const confirmationCard = document.querySelector('.confirmation-card');
  
  if (checkmarkContainer) {
    checkmarkContainer.classList.add('animate');
  }
  
  // Stagger other animations
  setTimeout(() => {
    if (successTitle) {
      successTitle.classList.add('animate-in');
    }
  }, 800);
  
  setTimeout(() => {
    if (confirmationCard) {
      confirmationCard.classList.add('animate-in');
    }
  }, 1200);
  
  // Animate status timeline
  setTimeout(() => {
    animateStatusTimeline();
  }, 1600);
};

// Animate status timeline
const animateStatusTimeline = () => {
  const statusSteps = document.querySelectorAll('.status-step');
  statusSteps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add('animate-in');
    }, index * 200);
  });
};

// ========================================
// EVENT HANDLERS
// ========================================

// Setup thank you event listeners
const setupThankYouEvents = () => {
  const thankYouView = document.getElementById('thank-you-view');
  if (!thankYouView) return;
  
  // Button clicks
  thankYouView.addEventListener('click', (e) => {
    // Continue shopping
    if (e.target.closest('.btn-continue-shopping')) {
      continueShoppingAction();
    }
    
    // View order details
    if (e.target.closest('.btn-view-order')) {
      viewOrderDetailsAction();
    }
    
    // Print receipt
    if (e.target.closest('.btn-print-receipt')) {
      printReceiptAction();
    }
    
    // Browse categories
    if (e.target.closest('.btn-browse-categories')) {
      browseCategoriesAction();
    }
    
    // View special offers
    if (e.target.closest('.btn-special-offers')) {
      viewSpecialOffersAction();
    }
    
    // Social sharing
    if (e.target.closest('.social-btn')) {
      const platform = e.target.closest('.social-btn').classList.contains('facebook') ? 'facebook' :
                      e.target.closest('.social-btn').classList.contains('twitter') ? 'twitter' :
                      'instagram';
      shareOnSocialMedia(platform);
    }
    
    // Support links
    if (e.target.closest('.support-link')) {
      e.preventDefault();
      const supportType = e.target.closest('.support-link').textContent.trim();
      handleSupportAction(supportType);
    }
  });
};

// ========================================
// ACTION HANDLERS
// ========================================

// Continue shopping action
const continueShoppingAction = () => {
  hideThankYou();
  
  // Clear any existing product details or cart views
  window.dispatchEvent(new CustomEvent('hideAllModals'));
  
  // Navigate back to main product listing
  window.dispatchEvent(new CustomEvent('loadAllProducts'));
  
  // Show success message
  window.dispatchEvent(new CustomEvent('showCartMessage', {
    detail: { 
      message: 'Welcome back! Continue exploring our products.', 
      type: 'info' 
    }
  }));
};

// View order details action
const viewOrderDetailsAction = () => {
  // For now, just show an alert with order info
  alert('Order details functionality would open a detailed order view here.');
  
  // In a real app, this would:
  // 1. Navigate to an order details page
  // 2. Show order history
  // 3. Allow order tracking
};

// Print receipt action
const printReceiptAction = () => {
  // Create a printable version of the receipt
  const printWindow = window.open('', '_blank');
  const orderData = getCurrentOrderData();
  
  const printContent = generatePrintableReceipt(orderData);
  
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
};

// Browse categories action
const browseCategoriesAction = () => {
  hideThankYou();
  
  // Show categories prominently
  window.dispatchEvent(new CustomEvent('showCategories'));
  window.dispatchEvent(new CustomEvent('loadAllProducts'));
};

// View special offers action
const viewSpecialOffersAction = () => {
  hideThankYou();
  
  // In a real app, this would filter for discounted products
  window.dispatchEvent(new CustomEvent('loadSpecialOffers'));
};

// Share on social media
const shareOnSocialMedia = (platform) => {
  const shareText = 'Just made a great purchase at ShopFront! 🛍️';
  const shareUrl = window.location.href;
  
  let socialUrl = '';
  
  switch (platform) {
    case 'facebook':
      socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      break;
    case 'twitter':
      socialUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      break;
    case 'instagram':
      // Instagram doesn't have direct sharing URLs, so just copy to clipboard
      navigator.clipboard.writeText(shareText + ' ' + shareUrl);
      window.dispatchEvent(new CustomEvent('showCartMessage', {
        detail: { 
          message: 'Share text copied to clipboard!', 
          type: 'success' 
        }
      }));
      return;
  }
  
  if (socialUrl) {
    window.open(socialUrl, '_blank', 'width=600,height=400');
  }
};

// Handle support actions
const handleSupportAction = (supportType) => {
  if (supportType.includes('Call')) {
    alert('Support phone: +45 12 34 56 78\nHours: Mon-Fri 9:00-18:00');
  } else if (supportType.includes('Chat')) {
    alert('Live chat feature would open here in a real application.');
  } else if (supportType.includes('Email')) {
    window.location.href = 'mailto:support@shopfront.dk?subject=Order Support Request';
  }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Get current order data (stored when thank you page is shown)
let currentOrderData = {};

const getCurrentOrderData = () => currentOrderData;

// Generate printable receipt
const generatePrintableReceipt = (orderData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Order Receipt - ${orderData.orderId}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .order-info { margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .total { font-weight: bold; font-size: 1.2em; border-top: 1px solid #333; padding-top: 10px; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🛍️ ShopFront</h1>
        <h2>Order Receipt</h2>
      </div>
      
      <div class="order-info">
        <div class="detail-row">
          <span>Order Number:</span>
          <span>#${orderData.orderId}</span>
        </div>
        <div class="detail-row">
          <span>Customer:</span>
          <span>${orderData.customerName}</span>
        </div>
        <div class="detail-row">
          <span>Email:</span>
          <span>${orderData.email}</span>
        </div>
        <div class="detail-row">
          <span>Date:</span>
          <span>${new Date().toLocaleDateString()}</span>
        </div>
        <div class="detail-row total">
          <span>Total Amount:</span>
          <span>$${orderData.total}</span>
        </div>
      </div>
      
      <p style="text-align: center; margin-top: 40px;">
        Thank you for your purchase!<br>
        Questions? Contact us at support@shopfront.dk
      </p>
    </body>
    </html>
  `;
};

// ========================================
// MAIN FUNCTIONS
// ========================================

// Show thank you page
const showThankYou = (orderData) => {
  try {
    // Store order data
    currentOrderData = orderData;
    
    // Create thank you view if it doesn't exist
    let thankYouView = document.getElementById('thank-you-view');
    if (!thankYouView) {
      thankYouView = createThankYouView();
    }
    
    // Render content
    renderThankYouContent(orderData);
    
    // Show modal
    thankYouView.classList.remove('hidden');
    document.body.classList.add('modal-open');
    
    // Clear any existing cart data since order is complete
    localStorage.removeItem('shopfront_cart');
    
  } catch (error) {
    console.error('Error showing thank you page:', error);
  }
};

// Hide thank you page
const hideThankYou = () => {
  const thankYouView = document.getElementById('thank-you-view');
  if (thankYouView) {
    thankYouView.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

// ========================================
// EVENT LISTENERS
// ========================================

// Setup global thank you event listeners
const setupThankYouGlobalEvents = () => {
  // Listen for thank you page requests
  window.addEventListener('showThankYou', (event) => {
    showThankYou(event.detail);
  });
  
  // Listen for hide all modals
  window.addEventListener('hideAllModals', () => {
    hideThankYou();
  });
};

// ========================================
// EXPORTS
// ========================================

export {
  createThankYouView,
  showThankYou,
  hideThankYou,
  setupThankYouGlobalEvents
};