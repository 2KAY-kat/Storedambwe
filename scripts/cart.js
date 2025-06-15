// Import products to get product name
import { products } from './data.js';

// Add showToast function at the top
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
    cart = [
        /*{
        productId: '2024-0106-2022',
        quantity: 2,
        deliveryOptionId:'1'
    },{
        productId: '2024-0106-2023',
        quantity: 1,
        deliveryOptionId: '2'
    }
        ***/];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
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
        showToast(`${product.name} removed from cart`);
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