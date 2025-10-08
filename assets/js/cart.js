// cart.js - Complete cart management with API integration and localStorage

// ========================================
// CART STATE MANAGEMENT
// ========================================

class CartManager {
  constructor() {
    this.cart = this.loadCartFromStorage();
    this.cartId = this.cart.id || null;
    this.setupEventListeners();
  }

  // ========================================
  // CART DATA MANAGEMENT
  // ========================================

  // Load cart from localStorage
  loadCartFromStorage() {
    try {
      const savedCart = localStorage.getItem('shopfront_cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        return {
          id: cart.id || null,
          products: cart.products || [],
          total: cart.total || 0,
          discountedTotal: cart.discountedTotal || 0,
          userId: cart.userId || 1,
          totalProducts: cart.totalProducts || 0,
          totalQuantity: cart.totalQuantity || 0
        };
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
    
    return {
      id: null,
      products: [],
      total: 0,
      discountedTotal: 0,
      userId: 1,
      totalProducts: 0,
      totalQuantity: 0
    };
  }

  // Save cart to localStorage
  saveCartToStorage() {
    try {
      localStorage.setItem('shopfront_cart', JSON.stringify(this.cart));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  // ========================================
  // API INTEGRATION WITH DUMMYJSON
  // ========================================

  // Create new cart via API
  async createCart(products) {
    try {
      const response = await fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: this.cart.userId,
          products: products
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        this.cart = { ...data };
        this.cartId = data.id;
        this.saveCartToStorage();
        this.updateCartDisplay();
        return data;
      }
    } catch (error) {
      console.error('Error creating cart:', error);
      // Fallback to local cart management
      this.updateLocalCart(products);
    }
  }

  // Update existing cart via API
  async updateCart(products) {
    if (!this.cartId) {
      return this.createCart(products);
    }

    try {
      const response = await fetch(`https://dummyjson.com/carts/${this.cartId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: products
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        this.cart = { ...data };
        this.saveCartToStorage();
        this.updateCartDisplay();
        return data;
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      // Fallback to local cart management
      this.updateLocalCart(products);
    }
  }

  // ========================================
  // LOCAL CART OPERATIONS (FALLBACK)
  // ========================================

  updateLocalCart(products) {
    this.cart.products = products;
    this.cart.totalProducts = products.length;
    this.cart.totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
    this.cart.total = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    this.cart.discountedTotal = this.cart.total; // Simplified for demo
    
    this.saveCartToStorage();
    this.updateCartDisplay();
  }

  // ========================================
  // PRODUCT MANAGEMENT
  // ========================================

  // Add product to cart
  async addProduct(product, quantity = 1) {
    const existingProductIndex = this.cart.products.findIndex(p => p.id === product.id);
    
    if (existingProductIndex !== -1) {
      // Update existing product quantity
      this.cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Add new product
      this.cart.products.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        total: product.price * quantity,
        discountPercentage: product.discountPercentage || 0,
        discountedPrice: product.price,
        thumbnail: product.thumbnail
      });
    }

    // Update cart via API or locally
    await this.updateCart(this.cart.products);
    
    // Dispatch success event
    window.dispatchEvent(new CustomEvent('productAddedToCart', {
      detail: { product, quantity, cartTotal: this.cart.totalQuantity }
    }));

    console.log(`Added ${quantity} x ${product.title} to cart`);
    return this.cart;
  }

  // Remove product from cart
  async removeProduct(productId) {
    const productIndex = this.cart.products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
      const removedProduct = this.cart.products[productIndex];
      this.cart.products.splice(productIndex, 1);
      
      await this.updateCart(this.cart.products);
      
      window.dispatchEvent(new CustomEvent('productRemovedFromCart', {
        detail: { product: removedProduct, cartTotal: this.cart.totalQuantity }
      }));
      
      console.log(`Removed ${removedProduct.title} from cart`);
    }
    
    return this.cart;
  }

  // Update product quantity
  async updateProductQuantity(productId, quantity) {
    const productIndex = this.cart.products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
      if (quantity <= 0) {
        return this.removeProduct(productId);
      }
      
      this.cart.products[productIndex].quantity = quantity;
      this.cart.products[productIndex].total = this.cart.products[productIndex].price * quantity;
      
      await this.updateCart(this.cart.products);
    }
    
    return this.cart;
  }

  // Clear entire cart
  async clearCart() {
    this.cart.products = [];
    await this.updateCart([]);
    
    window.dispatchEvent(new CustomEvent('cartCleared', {
      detail: { cartTotal: 0 }
    }));
    
    console.log('Cart cleared');
    return this.cart;
  }

  // ========================================
  // CART INFORMATION
  // ========================================

  // Get cart summary
  getCartSummary() {
    return {
      totalItems: this.cart.totalQuantity,
      totalProducts: this.cart.totalProducts,
      subtotal: this.cart.total,
      total: this.cart.discountedTotal,
      products: this.cart.products
    };
  }

  // Get product count
  getProductCount() {
    return this.cart.totalQuantity;
  }

  // Check if cart is empty
  isEmpty() {
    return this.cart.products.length === 0;
  }

  // Get specific product from cart
  getProduct(productId) {
    return this.cart.products.find(p => p.id === productId);
  }

  // ========================================
  // UI UPDATES
  // ========================================

  // Update cart display in UI
  updateCartDisplay() {
    // Update cart count in navigation
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = this.cart.totalQuantity;
      if (this.cart.totalQuantity > 0) {
        cartCount.classList.remove('hidden');
      } else {
        cartCount.classList.add('hidden');
      }
    }

    // Dispatch event for other components to listen
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: this.getCartSummary()
    }));
  }

  // ========================================
  // EVENT HANDLING
  // ========================================

  setupEventListeners() {
    // Listen for add to cart events
    window.addEventListener('addToCart', async (event) => {
      const { productId } = event.detail;
      
      try {
        // Get product details (you might need to fetch this)
        const product = await this.getProductDetails(productId);
        if (product) {
          await this.addProduct(product);
          
          // Show success message
          window.dispatchEvent(new CustomEvent('showCartMessage', {
            detail: { 
              message: `${product.title} added to cart!`, 
              type: 'success' 
            }
          }));
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
        window.dispatchEvent(new CustomEvent('showCartMessage', {
          detail: { 
            message: 'Failed to add product to cart', 
            type: 'error' 
          }
        }));
      }
    });

    // Listen for cart view requests
    window.addEventListener('viewCart', () => {
      window.dispatchEvent(new CustomEvent('showCartView', {
        detail: this.getCartSummary()
      }));
    });

    // Listen for checkout requests
    window.addEventListener('startCheckout', () => {
      if (!this.isEmpty()) {
        window.dispatchEvent(new CustomEvent('showCheckout', {
          detail: this.getCartSummary()
        }));
      } else {
        window.dispatchEvent(new CustomEvent('showCartMessage', {
          detail: { 
            message: 'Your cart is empty', 
            type: 'warning' 
          }
        }));
      }
    });
  }

  // Helper method to get product details
  async getProductDetails(productId) {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
    return null;
  }

  // ========================================
  // CHECKOUT SIMULATION
  // ========================================

  // Simulate order placement
  async placeOrder(orderDetails) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const order = {
        id: Date.now(), // Simple order ID
        products: [...this.cart.products],
        total: this.cart.total,
        discountedTotal: this.cart.discountedTotal,
        customerInfo: orderDetails,
        orderDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      // Save order to localStorage for reference
      const orders = JSON.parse(localStorage.getItem('shopfront_orders') || '[]');
      orders.push(order);
      localStorage.setItem('shopfront_orders', JSON.stringify(orders));
      
      // Clear cart after successful order
      await this.clearCart();
      
      return order;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  }
}

// ========================================
// EXPORT AND INITIALIZATION
// ========================================

// Create global cart instance
let cartManager;

// Initialize cart when DOM is loaded
const initializeCart = () => {
  cartManager = new CartManager();
  console.log('🛒 Cart Manager initialized');
  return cartManager;
};

// Export for use in other modules
export { CartManager, initializeCart };
export default cartManager;
