import { products } from './data.js';
import { formatCurrency } from './utilities/calculate_cash.js';
import { cart, addToCart } from './cart.js';

// Get the product ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Find the product
const product = products.find(p => p.id === productId);

// Update product details
if (product) {
    const productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = `
        <div class="product-container animate__animated animate__fadeIn"> 
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image-details animate__animated animate__fadeIn">
            </div>
            <div class="product-info animate__animated animate__fadeInRight">
                <h1>${product.name}</h1>
                <p class="view-details-price">MK${formatCurrency(product.dollar)}</p>
                <div class="p-desc">
                    <p class="description">${product.description || 'No description available'}</p>
                </div>
                <div class="product-actions">
                    <button class="btn1 js-add-to-cart" data-product-id="${product.id}">
                        Add to Cart <i class="fas fa-bag-shopping"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Handle Add to Cart with animation
    const addToCartBtn = document.querySelector('.js-add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        addToCartBtn.classList.add('animate__animated', 'animate__pulse');
        addToCart(productId);
        showToast(`${product.name} Has been added to cart!`);
        
        // Remove animation classes after animation completes
        setTimeout(() => {
            addToCartBtn.classList.remove('animate__animated', 'animate__pulse');
        }, 1000);
    });
}

// Enhanced Toast notification function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show', 'animate__animated', 'animate__fadeInUp');
    
    setTimeout(() => {
        toast.classList.remove('show', 'animate__fadeInUp');
        toast.classList.add('animate__fadeOutDown');
        
        setTimeout(() => {
            toast.classList.remove('animate__animated', 'animate__fadeOutDown');
        }, 300);
    }, 3000);
}

// Handle Share button with improved error handling
document.getElementById('shareBtn').addEventListener('click', async () => {
    try {
        if (navigator.share) {
            await navigator.share({
                title: product.name,
                text: `Check out this amazing product: ${product.name}`,
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support sharing
            const tempInput = document.createElement('input');
            tempInput.value = window.location.href;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            showToast('Link copied to clipboard!');
        }
    } catch (err) {
        showToast('Failed to share product');
        console.error('There was an error sharing:', err);
    }
});

// Enhanced bookmark button handler with animation
document.getElementById('bookmarkBtn').addEventListener('click', () => {
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    const icon = bookmarkBtn.querySelector('i');
    
    bookmarkBtn.classList.add('animate__animated', 'animate__rubberBand');
    
    // Toggle bookmark icons with smooth transition
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
    
    // Show appropriate toast message
    showToast(icon.classList.contains('fas') ? 
        `${product.name} has been added to bookmarks` : 
        `${product.name} has been removed from bookmarks`);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        bookmarkBtn.classList.remove('animate__animated', 'animate__rubberBand');
    }, 3000);
});