import { cart, addToCart } from './cart.js';
import { header, hero, products, nav } from './products.js';
import { formatCurrency } from './utilities/calculate_cash.js';

let headerHTML = '';
let heroHTML = '';
let productsHTML = '';
let navHTML = '';


header.forEach((header) => {
headerHTML += `

        <div class="nav-logo">
            <a href="index.html"><img class="logo-navlogo-nav" src="${header.image}" alt="" /></a>
            <a href="index.html"><p class="dambwe">${header.name}</p></a>
        </div>
        <ul class="nav-menu">
            <p>Marketplace</p>
        </ul>
        <div class="nav-login-cart">
            <a href="${header.link}"><i class="fa fa-shopping-cart"></i></a>
            <div class="nav-cart-count cart-quantity js-cart-quantity">0</div>
        </div>
    `;
})


document.querySelector('.navbar').innerHTML = headerHTML;

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