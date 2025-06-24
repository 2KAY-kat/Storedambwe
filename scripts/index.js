import { cart, addToCart } from './cart.js';
import { header, hero, products, /*nav*/ } from './data.js';
import { formatCurrency } from './utilities/calculate_cash.js';

// initialise the variables for the queries in the loop function
let headerHTML = '';
let heroHTML = '';
//let navHTML = '';

// looping for the header, hero, products

header.forEach((header) => {
    headerHTML += `

    <a href="index.html">
        <div class="nav-logo">

            <img class="logo-navlogo-nav" src="${header.image}" alt="" />
            <p class="dambwe">${header.name}</p>
        </div>
        </a>
           
        <div class="nav-login-cart">
            <div class="searchIn fa-solid fa-search"> </div>
            <a href="${header.link}"><i class="fa fa-shopping-cart"></i></a>
            <div class="nav-cart-count cart-quantity js-cart-quantity">0</div>
            <a href="#" class="js-dashboard-link">
               <div class="fa-solid fa-gauge"> </div>
            </a>
        </div>
    `;
})


document.querySelector('.navbar').innerHTML = headerHTML;

// --- Loading Screen HTML Injection (CSS moved to separate file) ---
const loadingScreenHTML = `
  <div id="dashboard-loading-screen" class="dashboard-loading-screen">
    <div class="dashboard-loading-content">
      <div class="loader">
        <svg width="48" height="48" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#007bff" stroke-width="5" stroke-linecap="round" stroke-dasharray="31.4 31.4" transform="rotate(-90 25 25)">
            <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
      <div class="dashboard-loading-message">
        <strong>Login Required</strong><br>
        You must log in before accessing the dashboard.<br>
        Redirecting you to the login page...
      </div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', loadingScreenHTML);


hero.forEach((hero) => {
    heroHTML += `
    
    <div class="hero-text">
            <h1>${hero.hero_text_h1}</h1>
            <p>${hero.hero_text_p}</p>
            <a href="${hero.hero_link}"><button class="btn2">${hero.hero_btn_value}<i class="fa  ${hero.hero_cart_icon}"></i> &rarr;</a></button></a>
        </div>
    `;

})

document.querySelector('.hero').innerHTML = heroHTML;


//NOTED UPDATE: Removed the initial products.forEach rendering engine
// Instead, defined a function to render products by category we going places and yeah its rough...

function renderProductsByCategory(categoryName) {
    let productsHTML = '';
    let filteredProducts;

    if (categoryName === 'All') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === categoryName);
    }

    if (filteredProducts.length === 0) {
        productsHTML = `
            <div class="no-products-message">
                <div class="no-products-svg">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                        <circle cx="60" cy="60" r="56" stroke="#007bff" stroke-width="8" fill="#333"/>
                        <ellipse cx="60" cy="85" rx="28" ry="10" fill="#0056b3" opacity="0.5"/>
                        <path d="M40 60 Q60 80 80 60" stroke="#007bff" stroke-width="4" fill="none" />
                        <circle cx="50" cy="55" r="4" fill="#007bff"/>
                        <circle cx="70" cy="55" r="4" fill="#007bff"/>
                        <path d="M55 75 Q60 78 65 75" stroke="#333" stroke-width="2" fill="#007bff"/>
                    </svg>
                </div>
                <div class="no-products-text">
                    <h3>No products found</h3>
                    <p>Sorry, there are no products in this category yet.</p>
                </div>
            </div>
        `;
    } else {
        filteredProducts.forEach((product) => {
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
        });
    }

    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    // Re-attach add-to-cart event listeners if there are products
    if (filteredProducts.length > 0) {
        document.querySelectorAll('.js-add-to-cart')
            .forEach((button) => {
                button.addEventListener('click', () => {
                    button.classList.add('animate__animated', 'animate__pulse');
                    const productId = button.dataset.productId;
                    const result = addToCart(productId);
                    
                    if (result) {
                        updateCartQuantity();
                    }

                    setTimeout(() => {
                        button.classList.remove('animate__animated', 'animate__pulse');
                    }, 1000);
                });
            });
    }
}

// Expose to window for categories.js to call
window.renderProductsByCategory = renderProductsByCategory;

// Restore category selection and products after renderProductsByCategory is ready
if (window.restoreCategorySelection) {
    window.restoreCategorySelection();
}

// Remove this line (let restoreCategorySelection handle initial render):
// renderProductsByCategory('All');

/*
nav.forEach((nav) => {
    navHTML += `
    <a href="${nav.link}" class="nav-link">
            <i class="fa fa-${nav.icon} nav-icon"></i>
            <span class="nav-text">${nav.name}</span>
        </a>
    `;
    
})

document.querySelector('nav').innerHTML = navHTML;
*/
//document.querySelector('.js-products-grid').innerHTML = productsHTML;

// end of the forEach loop of the components of teh store

// Loading the DOM for the cart quantity functions and all its scripts 
document.addEventListener('DOMContentLoaded', () => {
    updateCartQuantity();
});

// by default the cart count be 0 (zero) 
function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const cartCountElement = document.querySelector('.js-cart-quantity');
    if (cartCountElement) {
        cartCountElement.innerHTML = cartQuantity;
    }
}

// Initialisiation of the toastification of the adding to cart that displays the product name on the toast as its being added to the cart while updating the cart count  
const addToCartBtn = document.querySelector('.js-add-to-cart');
document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            addToCartBtn.classList.add('animate__animated', 'animate__pulse');
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCartQuantity();

            // Find the product name
            const product = products.find(p => p.id === productId);
            //showToast(`${product.name} added to cart`);

            // Remove of animation classes after animation completes
            setTimeout(() => {
                addToCartBtn.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
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
   

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Dashboard Redirect Handler ---
document.addEventListener('DOMContentLoaded', () => {
  // Attach dashboard loading handler
  document.querySelectorAll('.js-dashboard-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const loadingScreen = document.getElementById('dashboard-loading-screen');
      if (loadingScreen) {
        loadingScreen.style.display = 'flex';
      }
      setTimeout(() => {
        window.location.href = 'dashboard/index.html';
      }, 3200); 
    });
  });
});