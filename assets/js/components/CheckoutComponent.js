// CheckoutComponent.js - Complete checkout flow with form validation

// ========================================
// CHECKOUT COMPONENT
// ========================================

// Create checkout view
const createCheckoutView = () => {
  const checkoutView = document.createElement('div');
  checkoutView.id = 'checkout-view';
  checkoutView.classList.add('checkout-overlay', 'hidden');
  
  checkoutView.innerHTML = `
    <div class="checkout-modal">
      <div class="checkout-header">
        <h2 class="checkout-title">
          <span class="checkout-icon">💳</span>
          Checkout
        </h2>
        <button class="checkout-close-btn" aria-label="Close checkout">
          <span>✕</span>
        </button>
      </div>
      
      <div class="checkout-content">
        <div class="checkout-steps">
          <div class="step active" data-step="1">
            <span class="step-number">1</span>
            <span class="step-title">Shipping</span>
          </div>
          <div class="step" data-step="2">
            <span class="step-number">2</span>
            <span class="step-title">Payment</span>
          </div>
          <div class="step" data-step="3">
            <span class="step-number">3</span>
            <span class="step-title">Review</span>
          </div>
        </div>
        
        <div class="checkout-main">
          <div class="checkout-form-section">
            <!-- Form content will be populated here -->
          </div>
          
          <div class="checkout-summary-section">
            <!-- Order summary will be populated here -->
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(checkoutView);
  setupCheckoutEvents();
  return checkoutView;
};

// ========================================
// CHECKOUT STEPS
// ========================================

// Render shipping information step
const renderShippingStep = () => {
  const formSection = document.querySelector('#checkout-view .checkout-form-section');
  if (!formSection) return;
  
  formSection.innerHTML = `
    <div class="form-step" data-step="shipping">
      <h3>Shipping Information</h3>
      
      <form class="checkout-form" id="shipping-form">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input type="text" id="firstName" name="firstName" required>
            <span class="form-error"></span>
          </div>
          
          <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input type="text" id="lastName" name="lastName" required>
            <span class="form-error"></span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">Email Address *</label>
          <input type="email" id="email" name="email" required>
          <span class="form-error"></span>
        </div>
        
        <div class="form-group">
          <label for="phone">Phone Number *</label>
          <input type="tel" id="phone" name="phone" required>
          <span class="form-error"></span>
        </div>
        
        <div class="form-group">
          <label for="address">Street Address *</label>
          <input type="text" id="address" name="address" required>
          <span class="form-error"></span>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="city">City *</label>
            <input type="text" id="city" name="city" required>
            <span class="form-error"></span>
          </div>
          
          <div class="form-group">
            <label for="postalCode">Postal Code *</label>
            <input type="text" id="postalCode" name="postalCode" required>
            <span class="form-error"></span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="country">Country *</label>
          <select id="country" name="country" required>
            <option value="">Select Country</option>
            <option value="DK">Denmark</option>
            <option value="SE">Sweden</option>
            <option value="NO">Norway</option>
            <option value="DE">Germany</option>
            <option value="NL">Netherlands</option>
          </select>
          <span class="form-error"></span>
        </div>
        
        <div class="shipping-options">
          <h4>Shipping Method</h4>
          <div class="radio-group">
            <label class="radio-option">
              <input type="radio" name="shipping" value="standard" checked>
              <span class="radio-custom"></span>
              <div class="option-content">
                <span class="option-title">Standard Shipping (3-5 days)</span>
                <span class="option-price">Free</span>
              </div>
            </label>
            
            <label class="radio-option">
              <input type="radio" name="shipping" value="express">
              <span class="radio-custom"></span>
              <div class="option-content">
                <span class="option-title">Express Shipping (1-2 days)</span>
                <span class="option-price">$9.99</span>
              </div>
            </label>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn-back">Back to Cart</button>
          <button type="submit" class="btn-next">Continue to Payment</button>
        </div>
      </form>
    </div>
  `;
};

// Render payment information step
const renderPaymentStep = () => {
  const formSection = document.querySelector('#checkout-view .checkout-form-section');
  if (!formSection) return;
  
  formSection.innerHTML = `
    <div class="form-step" data-step="payment">
      <h3>Payment Information</h3>
      
      <form class="checkout-form" id="payment-form">
        <div class="payment-methods">
          <h4>Payment Method</h4>
          <div class="radio-group">
            <label class="radio-option">
              <input type="radio" name="paymentMethod" value="card" checked>
              <span class="radio-custom"></span>
              <div class="option-content">
                <span class="option-title">💳 Credit/Debit Card</span>
              </div>
            </label>
            
            <label class="radio-option">
              <input type="radio" name="paymentMethod" value="paypal">
              <span class="radio-custom"></span>
              <div class="option-content">
                <span class="option-title">💰 PayPal</span>
              </div>
            </label>
            
            <label class="radio-option">
              <input type="radio" name="paymentMethod" value="mobilepay">
              <span class="radio-custom"></span>
              <div class="option-content">
                <span class="option-title">📱 MobilePay</span>
              </div>
            </label>
          </div>
        </div>
        
        <div class="card-details">
          <div class="form-group">
            <label for="cardNumber">Card Number *</label>
            <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required>
            <span class="form-error"></span>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="expiryDate">Expiry Date *</label>
              <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" maxlength="5" required>
              <span class="form-error"></span>
            </div>
            
            <div class="form-group">
              <label for="cvv">CVV *</label>
              <input type="text" id="cvv" name="cvv" placeholder="123" maxlength="4" required>
              <span class="form-error"></span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="cardName">Name on Card *</label>
            <input type="text" id="cardName" name="cardName" required>
            <span class="form-error"></span>
          </div>
        </div>
        
        <div class="billing-address">
          <label class="checkbox-option">
            <input type="checkbox" id="sameAsShipping" checked>
            <span class="checkbox-custom"></span>
            <span>Billing address same as shipping</span>
          </label>
        </div>
        
        <div class="security-notice">
          <div class="security-icons">
            <span>🔒</span>
            <span>🛡️</span>
          </div>
          <p>Your payment information is encrypted and secure. We never store your card details.</p>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn-back">Back to Shipping</button>
          <button type="submit" class="btn-next">Review Order</button>
        </div>
      </form>
    </div>
  `;
  
  setupPaymentValidation();
};

// Render order review step
const renderReviewStep = (orderData) => {
  const formSection = document.querySelector('#checkout-view .checkout-form-section');
  if (!formSection) return;
  
  const shippingCost = orderData.shipping === 'express' ? 9.99 : 0;
  const total = orderData.cartTotal + shippingCost;
  
  formSection.innerHTML = `
    <div class="form-step" data-step="review">
      <h3>Review Your Order</h3>
      
      <div class="review-sections">
        <div class="review-section">
          <h4>Shipping Address</h4>
          <div class="address-display">
            <p><strong>${orderData.firstName} ${orderData.lastName}</strong></p>
            <p>${orderData.address}</p>
            <p>${orderData.city}, ${orderData.postalCode}</p>
            <p>${orderData.country}</p>
            <p>📞 ${orderData.phone}</p>
            <p>✉️ ${orderData.email}</p>
          </div>
          <button class="btn-edit" data-step="1">Edit</button>
        </div>
        
        <div class="review-section">
          <h4>Payment Method</h4>
          <div class="payment-display">
            <p>
              ${orderData.paymentMethod === 'card' ? '💳 Credit/Debit Card' :
                orderData.paymentMethod === 'paypal' ? '💰 PayPal' :
                '📱 MobilePay'}
            </p>
            ${orderData.paymentMethod === 'card' ? 
              `<p>**** **** **** ${orderData.cardNumber.slice(-4)}</p>` : 
              ''
            }
          </div>
          <button class="btn-edit" data-step="2">Edit</button>
        </div>
        
        <div class="review-section">
          <h4>Shipping Method</h4>
          <div class="shipping-display">
            <p>
              ${orderData.shipping === 'express' ? 
                'Express Shipping (1-2 days) - $9.99' : 
                'Standard Shipping (3-5 days) - Free'
              }
            </p>
          </div>
          <button class="btn-edit" data-step="1">Edit</button>
        </div>
      </div>
      
      <div class="terms-section">
        <label class="checkbox-option">
          <input type="checkbox" id="acceptTerms" required>
          <span class="checkbox-custom"></span>
          <span>I accept the <a href="#" class="terms-link">Terms and Conditions</a> and <a href="#" class="privacy-link">Privacy Policy</a></span>
        </label>
      </div>
      
      <div class="form-actions">
        <button type="button" class="btn-back">Back to Payment</button>
        <button type="button" class="btn-place-order" id="place-order-btn">
          <span class="btn-icon">🛒</span>
          Place Order - $${total.toFixed(2)}
        </button>
      </div>
    </div>
  `;
};

// ========================================
// ORDER SUMMARY
// ========================================

// Render checkout order summary
const renderCheckoutSummary = (cartData, orderData = {}) => {
  const summarySection = document.querySelector('#checkout-view .checkout-summary-section');
  if (!summarySection) return;
  
  const shippingCost = orderData.shipping === 'express' ? 9.99 : 0;
  const subtotal = cartData.subtotal || cartData.total;
  const total = subtotal + shippingCost;
  
  summarySection.innerHTML = `
    <div class="order-summary">
      <h3>Order Summary</h3>
      
      <div class="summary-items">
        ${cartData.products.map(product => `
          <div class="summary-item">
            <img src="${product.thumbnail}" alt="${product.title}" class="item-thumb">
            <div class="item-info">
              <p class="item-name">${product.title}</p>
              <p class="item-details">Qty: ${product.quantity} × $${product.price}</p>
            </div>
            <p class="item-total">$${(product.price * product.quantity).toFixed(2)}</p>
          </div>
        `).join('')}
      </div>
      
      <div class="summary-totals">
        <div class="total-line">
          <span>Subtotal:</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        
        <div class="total-line">
          <span>Shipping:</span>
          <span>${shippingCost === 0 ? 'Free' : '$' + shippingCost.toFixed(2)}</span>
        </div>
        
        <div class="total-line final">
          <span>Total:</span>
          <span>$${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div class="summary-benefits">
        <div class="benefit-item">
          <span>✅</span>
          <span>Free returns within 30 days</span>
        </div>
        <div class="benefit-item">
          <span>🔒</span>
          <span>Secure encrypted checkout</span>
        </div>
        <div class="benefit-item">
          <span>📦</span>
          <span>Order tracking included</span>
        </div>
      </div>
    </div>
  `;
};

// ========================================
// FORM VALIDATION
// ========================================

// Setup payment form validation
const setupPaymentValidation = () => {
  const cardNumberInput = document.getElementById('cardNumber');
  const expiryInput = document.getElementById('expiryDate');
  const cvvInput = document.getElementById('cvv');
  
  // Card number formatting
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
      e.target.value = value;
    });
  }
  
  // Expiry date formatting
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      e.target.value = value;
    });
  }
  
  // CVV numeric only
  if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
};

// Validate form step
const validateFormStep = (stepNumber) => {
  const forms = {
    1: 'shipping-form',
    2: 'payment-form'
  };
  
  const formId = forms[stepNumber];
  if (!formId) return true;
  
  const form = document.getElementById(formId);
  if (!form) return true;
  
  const inputs = form.querySelectorAll('input[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    const errorSpan = input.parentNode.querySelector('.form-error');
    
    if (!input.value.trim()) {
      showFieldError(input, errorSpan, 'This field is required');
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      showFieldError(input, errorSpan, 'Please enter a valid email address');
      isValid = false;
    } else if (input.id === 'cardNumber' && !isValidCardNumber(input.value)) {
      showFieldError(input, errorSpan, 'Please enter a valid card number');
      isValid = false;
    } else if (input.id === 'expiryDate' && !isValidExpiryDate(input.value)) {
      showFieldError(input, errorSpan, 'Please enter a valid expiry date');
      isValid = false;
    } else if (input.id === 'cvv' && input.value.length < 3) {
      showFieldError(input, errorSpan, 'Please enter a valid CVV');
      isValid = false;
    } else {
      clearFieldError(input, errorSpan);
    }
  });
  
  return isValid;
};

// Validation helper functions
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidCardNumber = (cardNumber) => {
  const number = cardNumber.replace(/\s/g, '');
  return number.length >= 13 && number.length <= 19;
};

const isValidExpiryDate = (expiry) => {
  const [month, year] = expiry.split('/');
  if (!month || !year) return false;
  
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  const expMonth = parseInt(month);
  const expYear = parseInt(year);
  
  if (expMonth < 1 || expMonth > 12) return false;
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) return false;
  
  return true;
};

const showFieldError = (input, errorSpan, message) => {
  input.classList.add('error');
  if (errorSpan) errorSpan.textContent = message;
};

const clearFieldError = (input, errorSpan) => {
  input.classList.remove('error');
  if (errorSpan) errorSpan.textContent = '';
};

// ========================================
// EVENT HANDLERS
// ========================================

// Setup checkout event listeners
const setupCheckoutEvents = () => {
  const checkoutView = document.getElementById('checkout-view');
  if (!checkoutView) return;
  
  // Close checkout
  checkoutView.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkout-overlay')) {
      hideCheckout();
    }
    
    if (e.target.closest('.checkout-close-btn')) {
      hideCheckout();
    }
  });
  
  // Form submissions and navigation
  checkoutView.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (e.target.id === 'shipping-form') {
      if (validateFormStep(1)) {
        proceedToStep(2);
      }
    } else if (e.target.id === 'payment-form') {
      if (validateFormStep(2)) {
        proceedToStep(3);
      }
    }
  });
  
  // Button clicks
  checkoutView.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-back')) {
      const currentStep = getCurrentStep();
      if (currentStep > 1) {
        proceedToStep(currentStep - 1);
      } else {
        hideCheckout();
        window.dispatchEvent(new CustomEvent('showCartView'));
      }
    }
    
    if (e.target.classList.contains('btn-edit')) {
      const targetStep = parseInt(e.target.getAttribute('data-step'));
      proceedToStep(targetStep);
    }
    
    if (e.target.id === 'place-order-btn') {
      placeOrder();
    }
  });
  
  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !checkoutView.classList.contains('hidden')) {
      hideCheckout();
    }
  });
};

// ========================================
// CHECKOUT FLOW
// ========================================

let checkoutData = {};

// Show checkout
const showCheckout = (cartData) => {
  try {
    // Create checkout view if it doesn't exist
    let checkoutView = document.getElementById('checkout-view');
    if (!checkoutView) {
      checkoutView = createCheckoutView();
    }
    
    // Reset checkout data
    checkoutData = { ...cartData };
    
    // Start with shipping step
    proceedToStep(1);
    
    // Show modal
    checkoutView.classList.remove('hidden');
    document.body.classList.add('modal-open');
    
  } catch (error) {
    console.error('Error showing checkout:', error);
  }
};

// Hide checkout
const hideCheckout = () => {
  const checkoutView = document.getElementById('checkout-view');
  if (checkoutView) {
    checkoutView.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

// Proceed to checkout step
const proceedToStep = (stepNumber) => {
  // Update step indicators
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, index) => {
    step.classList.toggle('active', index < stepNumber);
    step.classList.toggle('completed', index < stepNumber - 1);
  });
  
  // Collect form data from previous steps
  if (stepNumber > 1) {
    collectFormData();
  }
  
  // Render appropriate step
  switch (stepNumber) {
    case 1:
      renderShippingStep();
      break;
    case 2:
      renderPaymentStep();
      break;
    case 3:
      renderReviewStep(checkoutData);
      break;
  }
  
  // Update summary
  renderCheckoutSummary(checkoutData, checkoutData);
};

// Get current step
const getCurrentStep = () => {
  const activeStep = document.querySelector('.step.active:last-child');
  return activeStep ? parseInt(activeStep.getAttribute('data-step')) : 1;
};

// Collect form data
const collectFormData = () => {
  const shippingForm = document.getElementById('shipping-form');
  const paymentForm = document.getElementById('payment-form');
  
  if (shippingForm) {
    const formData = new FormData(shippingForm);
    for (let [key, value] of formData.entries()) {
      checkoutData[key] = value;
    }
  }
  
  if (paymentForm) {
    const formData = new FormData(paymentForm);
    for (let [key, value] of formData.entries()) {
      checkoutData[key] = value;
    }
  }
};

// Place order
const placeOrder = async () => {
  try {
    // Validate terms acceptance
    const termsCheckbox = document.getElementById('acceptTerms');
    if (!termsCheckbox.checked) {
      alert('Please accept the terms and conditions to continue.');
      return;
    }
    
    // Show loading
    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.disabled = true;
    placeOrderBtn.innerHTML = '<span class="loading-spinner"></span> Processing...';
    
    // Collect final form data
    collectFormData();
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Place order through cart manager
    const order = await window.dispatchEvent(new CustomEvent('placeOrder', {
      detail: checkoutData
    }));
    
    // Hide checkout and show thank you page
    hideCheckout();
    window.dispatchEvent(new CustomEvent('showThankYou', {
      detail: { 
        orderId: Date.now(),
        customerName: `${checkoutData.firstName} ${checkoutData.lastName}`,
        email: checkoutData.email,
        total: checkoutData.total
      }
    }));
    
  } catch (error) {
    console.error('Error placing order:', error);
    
    // Reset button
    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.disabled = false;
    placeOrderBtn.innerHTML = '<span class="btn-icon">🛒</span> Place Order';
    
    alert('There was an error processing your order. Please try again.');
  }
};

// ========================================
// EVENT LISTENERS
// ========================================

// Setup global checkout event listeners
const setupCheckoutGlobalEvents = () => {
  // Listen for checkout requests
  window.addEventListener('showCheckout', (event) => {
    showCheckout(event.detail);
  });
  
  window.addEventListener('startCheckout', () => {
    // Request cart data for checkout
    window.dispatchEvent(new CustomEvent('requestCartDataForCheckout'));
  });
};

// ========================================
// EXPORTS
// ========================================

export {
  createCheckoutView,
  showCheckout,
  hideCheckout,
  setupCheckoutGlobalEvents
};