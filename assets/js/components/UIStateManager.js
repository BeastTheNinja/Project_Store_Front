// UIStateManager.js - Handles loading states, error messages, and UI state management

// Create loading spinner and error message elements
const createUIStateElements = () => {
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

  // Append spinner to body for overlay effect
  document.body.appendChild(loadingSpinner);

  return { loadingSpinner, errorMessage };
};

// Loading spinner functions
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

// Error message functions
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

export {
  createUIStateElements,
  showLoadingSpinner,
  hideLoadingSpinner,
  showError,
  hideError,
  updateDisplayInfo
};