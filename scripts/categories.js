const categories = [{
    categoryID: '1aaa',
    sta_tus: 'active',
    image: 'images/biscuitssnacks-1.jpg',
    name: 'All',
    description: 'From the cheapiest of your crunchy desires to the rmantic memories with chockoletes and biscuits.'
},{
    categoryID: '1aba',
    image: 'images/biscuitssnacks-1.jpg',
    name: 'Electronics',
    description: 'From the cheapiest of your crunchy desires to the rmantic memories with chockoletes and biscuits.'
},{
    categoryID: '1abb',
    image: 'images/bacola-banner-01.jpg',
    name: 'Clothing & Accessories',
    description: 'Get your fresh from the farm greens at an affordable price'
},{
    categoryID: '1abb',
    image: 'images/bacola-banner-01.jpg',
    name: 'Food',
    description: 'Get your fresh from the farm greens at an affordable price'
},{
    categoryID: '1abc',
    image: 'images/stacked-t-shirts.jpg',
    name: 'Entertainment',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
},{
    categoryID: '1abc',
    image: 'images/stacked-t-shirts.jpg',
    name: 'Merch',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
},{
    categoryID: '1abc',
    image: 'images/stacked-t-shirts.jpg',
    name: 'Education',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
},{
    categoryID: '1abb',
    image: 'images/bacola-banner-01.jpg',
    name: 'Housing',
    description: 'Get your fresh from the farm greens at an affordable price'
},{
    categoryID: '1abc',
    image: 'images/stacked-t-shirts.jpg',
    name: 'Vehicles',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
}];

let categoriesHTML = '';

categories.forEach((category, idx) => {
    categoriesHTML += `
        <div 
            class="category-card${idx === 0 ? ' active' : ''} ${category.sta_tus || ''}" 
            data-category="${category.name}"
            tabindex="0"
        >
            <h3>${category.name}</h3>
        </div>
    `;
});

document.querySelector('.js-categories-grid').innerHTML = categoriesHTML;

// Category filtering logic
const categoryCards = document.querySelectorAll('.category-card');

function setActiveCategory(selectedCard) {
    categoryCards.forEach(card => card.classList.remove('active'));
    selectedCard.classList.add('active');
}

function filterProductsByCategory(categoryName) {
    // Expose this function from index.js
    if (window.renderProductsByCategory) {
        window.renderProductsByCategory(categoryName);
    }
}

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        setActiveCategory(card);
        const categoryName = card.getAttribute('data-category');
        filterProductsByCategory(categoryName);
    });
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

const category = document.getElementById('categories');
const stickyTigger = document.getElementById('sticky-trigger');

const observer = new IntersectionObserver(
    ([entry]) => {
        if (!entry.isIntersecting) {
            category.classList.add('sticky');

            category.classList.remove('unstick');
        } else {
            category.classList.remove('sticky');
            category.classList.add('unstick');
        }
    },
    { threshold: 0 }
);

observer.observe(stickyTigger);