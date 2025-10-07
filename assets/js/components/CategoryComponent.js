// CategoryComponent.js - Handles category rendering and management

// Create categories section element
const createCategoriesSection = () => {
  const categoriesSection = document.createElement('div');
  categoriesSection.id = 'categories-section';
  categoriesSection.classList.add('categories-section');
  categoriesSection.innerHTML = `
    <h3>Shop by Category</h3>
    <div id="categories-container" class="categories-container">
      <!-- Categories will be populated dynamically -->
    </div>
  `;
  return categoriesSection;
};

// Create and populate categories
const renderCategories = async (navigationPopulator = null) => {
  try {
    // Get categories from API (you can customize this list)
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
        window.dispatchEvent(new CustomEvent('loadAllProducts'));
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
          window.dispatchEvent(new CustomEvent('loadCategoryProducts', { detail: { category } }));
        });
        
        categoriesContainer.appendChild(categoryBtn);
      });
    }

    // Populate navigation dropdown if function is provided
    if (navigationPopulator && typeof navigationPopulator === 'function') {
      navigationPopulator(categories);
    }

    return categories;

  } catch (error) {
    console.error('Error rendering categories:', error);
    return [];
  }
};

// Set active category button
const setActiveCategory = (activeBtn) => {
  const categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
};

// Get list of available categories
const getAvailableCategories = () => {
  return ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration'];
};

// Format category name for display
const formatCategoryName = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
};

export {
  createCategoriesSection,
  renderCategories,
  setActiveCategory,
  getAvailableCategories,
  formatCategoryName
};