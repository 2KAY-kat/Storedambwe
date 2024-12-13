import { cart, addToCart } from './cart.js';
import { header, products, nav } from './products.js';
import { formatCurrency } from './utilities/calculate_cash.js';

let headerHTML = '';
let productsHTML = '';
let navHTML = '';

header.forEach((header) => {
    headerHTML += `
  
        <div class="header-logo">
            <a class="logoTitle" href="index.html">${header.name}</a>
        </div>
      
    <div class="header-mid">
        Online Mall
      </div>

        <div class="header-right">
            <a class="header-fa" href="checkout.html"> <i class="fa fa-shopping-cart cart-plus"></i>
            <div class="cart-quantity js-cart-quantity cart-plus">0</div> </a>
        </div>
        </div>
    `;
})


document.querySelector('header').innerHTML = headerHTML;

products.forEach((product) => {
    productsHTML += `

    
<div class="product-card">
                
        <img class="product-image" src="${product.image}" alt="">
            <h3 class="product-name">${product.name}</h3>
                <p class="product-price">MK${formatCurrency(product.dollar)}</p>
    <div class="view-details">
        <button class="btn1 add-to-cart js-add-to-cart"
                        data-product-id="${product.id}"><i
                                    class="fa fa-shopping-cart"></i></button>
        <button class="btn2"><a href="view-details.html?id=${product.id}">Details</a></button>
     </div>

</div>
    `;
})


nav.forEach((nav) => {
    navHTML += `
    <a href="${nav.link}" class="nav-link">
            <i class="fa fa-${nav.icon} nav-icon"></i>
            <span class="nav-text">${nav.name}</span>
        </a>
    `;
    
})

document.querySelector('nav').innerHTML = navHTML;

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCartQuantity();
        });
    });

const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none'
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
/*
let startY = 0;
let isPulling = false;

// Capture the initial touch position when the user touches the screen
document.addEventListener('touchstart', function(e) {
  startY = e.touches[0].clientY;  // Store the starting Y position of the touch
}, {passive: true});

// Detect when the user is pulling down on the screen
document.addEventListener('touchmove', function(e) {
  const currentY = e.touches[0].clientY;

  // If the user is pulling down and the page is scrolled to the top, start the pull-to-refresh action
  if (currentY > startY && window.scrollY === 0) {
    isPulling = true;
    document.getElementById('refresh-indicator').style.display = 'block';  // Show refresh indicator
  }
}, {passive: true});

// Handle when the user lifts their finger off the screen
document.addEventListener('touchend', function() {
  if (isPulling) {
    // Simulate an AJAX request to fetch new data and refresh the content
    fetch('/path/to/data')  // Replace this URL with the actual path to your data
      .then(response => response.text())  // Get the response as plain text (HTML, for example)
      .then(data => {
        // Update the content on the page with the fetched data
        document.getElementById('content').innerHTML = data;

        // Hide the refresh indicator once the content is updated
        document.getElementById('refresh-indicator').style.display = 'none';
      })
      .catch(error => {
        console.error('Error fetching new data:', error);
        // Hide the refresh indicator even if there's an error
        document.getElementById('refresh-indicator').style.display = 'none';
      });

    // Reset the pulling flag
    isPulling = false;
  }
});
*/