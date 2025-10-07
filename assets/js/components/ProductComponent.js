// ProductComponent.js - Handles product rendering and product card creation

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

// Render products to the products container
const renderProducts = (products) => {
  const productsContainer = document.getElementById('products-container');
  if (!productsContainer) {
    console.warn('Products container not found');
    return;
  }
  
  productsContainer.innerHTML = ''; // Clear previous products

  if (!products || products.length === 0) {
    // Dispatch event to show error instead of handling it here
    window.dispatchEvent(new CustomEvent('showError', { detail: { message: 'No products found' } }));
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

// Create products container element
const createProductsContainer = () => {
  const productsContainer = document.createElement('div');
  productsContainer.id = 'products-container';
  productsContainer.classList.add('products-container');
  return productsContainer;
};

// Setup product-related event listeners
const setupProductEventListeners = () => {
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
  createProductCard,
  renderProducts,
  createProductsContainer,
  setupProductEventListeners
};