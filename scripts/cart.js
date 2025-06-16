import { products } from './data.js';
import { showToast } from './utilities/toast.js';
import { TOAST_MESSAGES } from './utilities/messages.js';

export let cart = (() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Validate saved cart items against current products
    return savedCart.filter(item => {
        const productExists = products.some(p => p.id === item.productId);
        return productExists;
    });
})();

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    // Validate inputs
    if (!productId) return false;

    const product = products.find(p => p.id === productId);
    if (!product) return false;

    // Check if item exists in cart using strict comparison
    const exists = cart.some(item => item.productId === productId);
    
    if (exists) {
        showToast(TOAST_MESSAGES.ALREADY_IN_LIST(product.name));
        return false;
    }

    // Add new item with fresh state
    const newItem = {
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
    };

    cart.push(newItem);
    saveToStorage();
    showToast(TOAST_MESSAGES.ADDED_TO_LIST(product.name));
    return true;
}

export function removeFromCart(productId) {
    // Find the product before removing it to get its name
    const productToRemove = cart.find(item => item.productId === productId);
    const product = products.find(p => p.id === productId);

    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();

    // Show toast notification after removing item
    if (product) {
        showToast(TOAST_MESSAGES.REMOVED_FROM_LIST(product.name));
    }
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
        
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();

}


export function updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    saveToStorage();
}

export function clearCart() {
    cart = [];
    saveToStorage();
    showToast(TOAST_MESSAGES.REMOVED_ALL_ITEMS);
}

export function toggleDeleteButton() {
    const deleteButton = document.getElementById('clear-cart-btn');
    if (deleteButton) {
        deleteButton.style.display = cart.length > 0 ? 'inline-block' : 'none';
    }
}