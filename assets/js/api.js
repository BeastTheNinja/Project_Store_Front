// base url for the API
const API_BASE_URL = 'https://dummyjson.com/products';

// API by category
const API_BY_CATEGORY = `${API_BASE_URL}/category/`;

// API by search
const API_BY_SEARCH = `${API_BASE_URL}/search?q=`;

// API by id
const API_BY_ID = `${API_BASE_URL}/`; // append id to the end

// function to get all products
export const getProducts = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return data; // Return full object with products, total, skip, limit

  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// function to get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BY_CATEGORY}${category}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data; // Return full object with products, total, skip, limit

  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// function to search products
export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_BY_SEARCH}${query}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data; // Return full object with products, total, skip, limit

  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// function to get product by id
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BY_ID}${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data;

  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw error;
  }
};