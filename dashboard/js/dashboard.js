import { products, header, hero } from '../../scripts/data.js';
import { formatCurrency } from '../../scripts/utilities/calculate_cash.js';

// Sidebar and section definitions
const sidebarItems = [
    { 
        name: 'Home', 
        icon: ' fa-house', 
        section: 'home' 
    },
    { 
        name: 'Products', 
        icon: ' fa-bag-shopping', 
        section: 'products' 
    },
    { 
        name: 'Statistics', 
        icon: ' fa-chart-pie', 
        section: 'statistics' 
    },
    { 
        name: 'Inbox', 
        icon: ' fa-inbox', 
        section: 'inbox' 
    },
    { 
        name: 'Notifications', 
        icon: ' fa-bell', 
        section: 'notifications' 
    }
];

// Extract unique categories from products
const productCategories = Array.from(new Set(products.map(p => p.category)));
productCategories.unshift('All'); // Add 'All' at the start

const sections = {
    home: {
        header: 'Dashboard Home',
        content: `
            <h2>Welcome to your dashboard!</h2>
            <p>Select a section from the sidebar to get started.</p>
        `
    },
    products: {
        header: 'Products',
        content: `
            <div class="app-content-actions">
                <input class="search-bar" placeholder="Search..." type="text">
                <div class="app-content-actions-wrapper">
                    <div class="filter-button-wrapper">
                        <button class="action-button filter jsFilter"><span>Filter</span>
                            <i class="fa-solid fa-filter"></i>
                        </button>
                        <div class="filter-menu">
                            <label>Category</label>
                            <select class="js-dashboard-category-filter">
                                ${productCategories.map(cat => `<option>${cat}</option>`).join('')}
                            </select>
                            <label>Status</label>
                            <select>
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Disabled</option>
                            </select>
                            <div class="filter-menu-buttons">
                                <button class="filter-button reset">Reset</button>
                                <button class="filter-button apply">Apply</button>
                            </div>
                        </div>
                    </div>
                    <button class="action-button list active" title="List View">
                        <i class="fa-solid fa-list"></i>
                    </button>
                    <button class="action-button grid" title="Grid View">
                        <i class="fa-solid fa-th-large"></i>
                    </button>
                </div>
            </div>
            <div class="products-area-wrapper tableView" id="dashboard-products-table"></div>
        `
    },
    statistics: {
        header: 'Statistics',
        content: `<p>Statistics content goes here.</p>`
    },
    inbox: {
        header: 'Inbox',
        content: `<p>Inbox content goes here.</p>`
    },
    notifications: {
        header: 'Notifications',
        content: `<p>Notifications content goes here.</p>`
    }
};

// Render sidebar
function renderSidebar() {
    const sidebarList = document.querySelector('.sidebar-list');
    if (!sidebarList) return;
    sidebarList.innerHTML = sidebarItems.map((item, idx) => `
        <li class="sidebar-list-item${idx === 0 ? ' active' : ''}">
            <a href="#" data-section="${item.section}">
                <i class="fa-solid ${item.icon}"></i>
                <span>${item.name}</span>
            </a>
        </li>
    `).join('');
}

// Render sections
function renderSections() {
    const appContent = document.querySelector('.app-content');
    if (!appContent) return;
    appContent.innerHTML = Object.entries(sections).map(([key, section], idx) => `
        <div class="dashboard-section" id="section-${key}" style="${idx === 0 ? '' : 'display:none;'}">
            <div class="app-content-header">
                <h1 class="app-content-headerText">${section.header}</h1>
                ${key === 'products' ? '<button class="app-content-headerButton">Add Product</button>' : ''}
            </div>
            <div style="padding: 32px; color: var(--app-content-main-color);">
                ${section.content}
            </div>
        </div>
    `).join('');
}

// Render products table with filtering
function renderProductsTable(selectedCategory = 'All') {
    const table = document.getElementById('dashboard-products-table');
    if (!table) return;
    // Always enable vertical scrolling for the products table
    table.style.maxHeight = "400px";
    table.style.overflowY = "auto";
    table.style.display = "block";
    let html = `
        <div class="products-header">
            <div class="product-cell image">Items</div>
            <div class="product-cell category">Category</div>
            <div class="product-cell status-cell">Status</div>
            <div class="product-cell sales">Sales</div>
            <div class="product-cell stock">Stock</div>
            <div class="product-cell price">Price</div>
        </div>
    `;
    let filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    html += filteredProducts.map(product => {
        let imgSrc = product.image;
        if (imgSrc.startsWith('./')) {
            imgSrc = '../' + imgSrc.substring(2);
        } else if (!/^https?:\/\//.test(imgSrc) && !imgSrc.startsWith('/')) {
            imgSrc = '../' + imgSrc;
        }
        return `
        <div class="products-row">
            <div class="product-cell image">
                <img src="${imgSrc}" alt="product">
                <span>${product.name}</span>
            </div>
            <div class="product-cell category">${product.category}</div>
            <div class="product-cell status-cell">
                <span class="status active">Active</span>
            </div>
            <div class="product-cell sales">0</div>
            <div class="product-cell stock">0</div>
            <div class="product-cell price">MK${formatCurrency(product.dollar)}</div>
        </div>
        `;
    }).join('');
    table.innerHTML = html;
}

// Navigation logic
function setupSidebarNavigation() {
    document.querySelectorAll('.sidebar-list-item a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.sidebar-list-item').forEach(li => li.classList.remove('active'));
            this.parentElement.classList.add('active');
            document.querySelectorAll('.dashboard-section').forEach(sec => sec.style.display = 'none');
            const section = this.getAttribute('data-section');
            if (section) {
                const el = document.getElementById('section-' + section);
                if (el) el.style.display = '';
                if (section === 'products') {
                    renderProductsTable();
                    setupCategoryFilter();
                }
            }
        });
    });
}

// Setup category filter event
function setupCategoryFilter() {
    const select = document.querySelector('.js-dashboard-category-filter');
    if (select) {
        select.onchange = function () {
            renderProductsTable(this.value);
        };
    }
}

// Initialize dashboard
function initDashboard() {
    renderSidebar();
    renderSections();
    setupSidebarNavigation();
    // Render products table and setup filter if products section is default
    const productsSection = document.getElementById('section-products');
    if (productsSection && productsSection.style.display !== 'none') {
        renderProductsTable();
        setupCategoryFilter();
    }
}

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}
