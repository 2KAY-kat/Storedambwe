const categories = [{
    categoryID: '1aaa',
    sta_tus: 'active',
    name: 'All'
},{
    categoryID: '1aba',
    name: 'Electronics',
    description: 'From the cheapiest of your crunchy desires to the rmantic memories with chockoletes and biscuits.'
},{
    categoryID: '1abb',
    name: 'Clothing & Accessories',
    description: 'Get your fresh from the farm greens at an affordable price'
},{
    categoryID: '1abb',
    name: 'Food',
    description: 'Get your fresh from the farm greens at an affordable price'
},{
    categoryID: '1abc',
    name: 'Entertainment',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
},{
    categoryID: '1abc',
    name: 'Merch',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
},{
    categoryID: '1abc',
    name: 'Education',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
},{
    categoryID: '1abb',
    name: 'Housing',
    description: 'Get your fresh from the farm greens at an affordable price'
},{
    categoryID: '1abc',
    name: 'Vehicles',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
}];

// Add a mapping for icons (Font Awesome)
const categoryIcons = {
    'All': 'fa-th',
    'Electronics': 'fa-tv',
    'Clothing & Accessories': 'fa-tshirt',
    'Food': 'fa-apple-alt',
    'Entertainment': 'fa-film',
    'Merch': 'fa-gift',
    'Education': 'fa-book',
    'Housing': 'fa-home',
    'Vehicles': 'fa-car'
};

let categoriesHTML = '';

categories.forEach((category, idx) => {
    const iconClass = categoryIcons[category.name] || 'fa-tag';
    categoriesHTML += `
        <div 
            class="category-card${idx === 0 ? ' active' : ''} ${category.sta_tus || ''}" 
            data-category="${category.name}"
            tabindex="0"
        >
            <span class="category-icon"><i class="fa ${iconClass}"></i></span>
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
    // Save selected category to localStorage
    const categoryName = selectedCard.getAttribute('data-category');
    localStorage.setItem('selectedCategory', categoryName);
}

function filterProductsByCategory(categoryName) {
    // Expose this function from index.js
    if (window.renderProductsByCategory) {
        window.renderProductsByCategory(categoryName);
    }
}

// Restore selected category from localStorage (deferred until products grid is ready)
function restoreCategorySelection() {
    const savedCategory = localStorage.getItem('selectedCategory');
    let found = false;
    if (savedCategory) {
        categoryCards.forEach(card => {
            if (card.getAttribute('data-category') === savedCategory) {
                setActiveCategory(card);
                filterProductsByCategory(savedCategory);
                found = true;
            }
        });
    }
    // If not found, default to first category
    if (!found && categoryCards.length > 0) {
        setActiveCategory(categoryCards[0]);
        filterProductsByCategory(categoryCards[0].getAttribute('data-category'));
    }
}

// Expose restore function for index.js to call after renderProductsByCategory is ready
window.restoreCategorySelection = restoreCategorySelection;

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