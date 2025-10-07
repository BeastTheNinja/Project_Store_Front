// FooterComponent.js - Handles footer creation with contact info and links

// Create footer element
const createFooter = () => {
  // Check if footer already exists
  if (document.querySelector('.storefront-footer')) return;
  
  const footer = document.createElement('footer');
  footer.classList.add('storefront-footer');
  
  footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        
        <!-- Company Info Section -->
        <div class="footer-section">
          <h3 class="footer-title">🛍️ ShopFront</h3>
          <p class="footer-description">
            Your one-stop destination for quality products at great prices.
            Discover amazing deals and exceptional customer service.
          </p>
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="Facebook">📘</a>
            <a href="#" class="social-link" aria-label="Twitter">🐦</a>
            <a href="#" class="social-link" aria-label="Instagram">📷</a>
            <a href="#" class="social-link" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        <!-- Quick Links Section -->
        <div class="footer-section">
          <h4 class="footer-subtitle">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Home</a></li>
            <li><a href="#" class="footer-link">About Us</a></li>
            <li><a href="#" class="footer-link">Products</a></li>
            <li><a href="#" class="footer-link">Special Offers</a></li>
            <li><a href="#" class="footer-link">Blog</a></li>
          </ul>
        </div>

        <!-- Customer Service Section -->
        <div class="footer-section">
          <h4 class="footer-subtitle">Customer Service</h4>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Help Center</a></li>
            <li><a href="#" class="footer-link">Shipping Info</a></li>
            <li><a href="#" class="footer-link">Returns & Exchanges</a></li>
            <li><a href="#" class="footer-link">Size Guide</a></li>
            <li><a href="#" class="footer-link">FAQ</a></li>
          </ul>
        </div>

        <!-- Contact Info Section -->
        <div class="footer-section">
          <h4 class="footer-subtitle">Contact Information</h4>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <div class="contact-details">
                <p>123 Shopping Street</p>
                <p>Copenhagen, Denmark 2100</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <div class="contact-details">
                <p>+45 12 34 56 78</p>
                <p>Mon-Fri: 9:00-18:00</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">✉️</span>
              <div class="contact-details">
                <p>info@shopfront.dk</p>
                <p>support@shopfront.dk</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            &copy; ${new Date().getFullYear()} ShopFront. All rights reserved.
          </p>
          <div class="footer-legal">
            <a href="#" class="legal-link">Privacy Policy</a>
            <span class="separator">|</span>
            <a href="#" class="legal-link">Terms of Service</a>
            <span class="separator">|</span>
            <a href="#" class="legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Append footer to the end of body
  document.body.appendChild(footer);
  
  // Setup footer event listeners
  setupFooterEvents();
  
  console.log('✅ Footer created successfully');
};

// Setup footer event listeners
const setupFooterEvents = () => {
  const footer = document.querySelector('.storefront-footer');
  if (!footer) return;

  // Handle footer link clicks
  footer.addEventListener('click', (e) => {
    if (e.target.classList.contains('footer-link')) {
      e.preventDefault();
      const linkText = e.target.textContent.trim();
      
      // Dispatch custom events based on link clicked
      switch(linkText) {
        case 'Home':
          window.dispatchEvent(new CustomEvent('loadAllProducts'));
          break;
        case 'Products':
          window.dispatchEvent(new CustomEvent('loadAllProducts'));
          break;
        case 'About Us':
          console.log('Navigate to About Us page');
          // You can implement page navigation here
          break;
        case 'Help Center':
          console.log('Open Help Center');
          // You can implement help functionality here
          break;
        default:
          console.log(`Footer link clicked: ${linkText}`);
      }
    }

    // Handle social media links
    if (e.target.classList.contains('social-link')) {
      e.preventDefault();
      const platform = e.target.getAttribute('aria-label');
      console.log(`Social media link clicked: ${platform}`);
      // You can implement social media sharing here
    }

    // Handle legal links
    if (e.target.classList.contains('legal-link')) {
      e.preventDefault();
      const linkText = e.target.textContent.trim();
      console.log(`Legal link clicked: ${linkText}`);
      // You can implement legal page navigation here
    }
  });

  // Handle contact info interactions
  footer.addEventListener('click', (e) => {
    if (e.target.closest('.contact-item')) {
      const contactItem = e.target.closest('.contact-item');
      const icon = contactItem.querySelector('.contact-icon').textContent;
      
      switch(icon) {
        case '📞':
          console.log('Phone number clicked - could initiate call');
          break;
        case '✉️':
          console.log('Email clicked - could open email client');
          break;
        case '📍':
          console.log('Address clicked - could open maps');
          break;
      }
    }
  });
};

// Add newsletter signup functionality
const addNewsletterSignup = () => {
  const footer = document.querySelector('.storefront-footer');
  if (!footer) return;

  const newsletterSection = document.createElement('div');
  newsletterSection.classList.add('footer-section', 'newsletter-section');
  newsletterSection.innerHTML = `
    <h4 class="footer-subtitle">Newsletter</h4>
    <p class="newsletter-text">Subscribe to get special offers and updates!</p>
    <div class="newsletter-form">
      <input type="email" id="newsletter-email" placeholder="Enter your email" class="newsletter-input">
      <button id="newsletter-submit" class="newsletter-button">Subscribe</button>
    </div>
  `;

  // Insert before the last footer section
  const footerContent = footer.querySelector('.footer-content');
  const lastSection = footerContent.querySelector('.footer-section:last-child');
  footerContent.insertBefore(newsletterSection, lastSection);

  // Add newsletter form event listener
  const newsletterForm = footer.querySelector('.newsletter-form');
  const emailInput = footer.querySelector('#newsletter-email');
  const submitButton = footer.querySelector('#newsletter-submit');

  if (submitButton && emailInput) {
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      
      if (email && isValidEmail(email)) {
        console.log(`Newsletter subscription for: ${email}`);
        emailInput.value = '';
        
        // Show success message
        showNewsletterMessage('Thank you for subscribing!', 'success');
      } else {
        showNewsletterMessage('Please enter a valid email address.', 'error');
      }
    });

    emailInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        submitButton.click();
      }
    });
  }
};

// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to show newsletter messages
const showNewsletterMessage = (message, type) => {
  const existingMessage = document.querySelector('.newsletter-message');
  if (existingMessage) existingMessage.remove();

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('newsletter-message', `newsletter-${type}`);
  messageDiv.textContent = message;
  
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }
};

export {
  createFooter,
  setupFooterEvents,
  addNewsletterSignup
};