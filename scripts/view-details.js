import { products } from './products.js';
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
        <div class="product-container">
            <img src="${product.image}" alt="${product.name}" class="product-image-details">
            <div class="product-info">
                <h1>${product.name}</h1>
                <p class="view-details-price">MK${formatCurrency(product.dollar)}</p>
                <div class="p-desc">
                    <p class="description">${product.description || 'No description available'}</p>
                </div>
                <button class="btn1 js-add-to-cart" data-product-id="${product.id}">
                    Add to Cart <i class="fa fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    `;

    // Handle Add to Cart
    const addToCartBtn = document.querySelector('.js-add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        addToCart(productId);
        showToast('Added to cart!');
    });
}

// Toast notification function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Handle Share button
document.getElementById('shareBtn').addEventListener('click', async () => {
    try {
        if (navigator.share) {
            await navigator.share({
                title: product.name,
                text: `Check out this product: ${product.name}`,
                url: window.location.href
            });
        } else {
            showToast('Share functionality not supported');
        }
    } catch (err) {
        showToast('Error sharing product');
    }
});

// Update the bookmark button handler
document.getElementById('bookmarkBtn').addEventListener('click', () => {
    const icon = document.querySelector('#bookmarkBtn i');
    
    // Toggle bookmark icons
    icon.classList.toggle('fa-bookmark');
    icon.classList.toggle('fa-bookmark-o');
    
    // Show appropriate toast message
    showToast(icon.classList.contains('fa-bookmark-o') ? 
        'Product saved to bookmarks' : 
        'Product removed from bookmarks');
});