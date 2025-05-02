import { cart, addToCart } from './cart.js';
import { header, hero, products, /*nav*/ } from './data.js';
import { formatCurrency } from './utilities/calculate_cash.js';


const toast = document.getElementById('toast');
toast.classList.add('show');

setTimeout(() => {
    toast.classList.remove('show');
}, 3000);

let headerHTML = '';
let heroHTML = '';
let productsHTML = '';
//let navHTML = '';


header.forEach((header) => {
    headerHTML += `

        <div class="nav-logo">
            <img class="logo-navlogo-nav" src="${header.image}" alt="" />
            <p class="dambwe">${header.name}</p>
        </div>
        <ul class="nav-menu">
            <p>Marketplace</p>
        </ul>
        <div class="nav-login-cart">
            <a href="${header.link}"><i class="fa fa-shopping-cart"></i></a>
            <div class="nav-cart-count cart-quantity js-cart-quantity">0</div>
            <div class="user-profile">
                <a href="dashboard/index.html"><img src="images/pear.jpg" alt="" /> </a>
            </div>
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
         <!--<button class="btn1">Mark</button> -->
        <button class="btn1 add-to-cart js-add-to-cart"
                        data-product-id="${product.id}"><i
                                    class="fa fa-shopping-cart"></i></button>
        <button class="btn2"><a href="view-details.html?id=${product.id}">Details</a></button>
     </div>

</div>
    `;
})

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
document.querySelector('.js-products-grid').innerHTML = productsHTML;


document.addEventListener('DOMContentLoaded', () => {
    updateCartQuantity();
});


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
            showToast(`${product.name} added to cart`);

            // Remove animation classes after animation completes
            setTimeout(() => {
                addToCartBtn.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        });

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
