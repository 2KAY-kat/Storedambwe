import { sidebarItems } from './dashboard-data.js';
import { products } from '../../scripts/data.js';
import { formatCurrency } from '../../scripts/utilities/calculate_cash.js';

// Extract unique categories from products
const productCategories = Array.from(new Set(products.map(p => p.category)));
productCategories.unshift('All'); // Add 'All' at the start

const productsStatus = Array.from(new Set(products.map(p => p.status)));
productsStatus.unshift('All');

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
                            <select id="categoryFilter" class="js-dashboard-category-filter">
                                ${productCategories.map(cat => `<option>${cat}</option>`).join('')}
                            </select>
                            <label>Status</label>
                            <select id="statusFilter">
                                ${productsStatus.map(stat => `<option>${stat}</option>`).join('')}
                            </select>
                            <div class="filter-menu-buttons">
                                <button class="filter-button reset" id="resetFilters">Reset</button>
                                <button class="filter-button apply" id="applyFilters">Apply</button>
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
        <li class="sidebar-list-item${idx === 0 ? ' active' : ''}" style="margin: 0 4px;">
            <a href="#" data-section="${item.section}" style="padding: 10px 18px; margin: 0 2px;">
                <i class="fa-solid ${item.icon}" style="margin-right: 0;"></i>
                <span style="margin-left: 2px;">${item.name}</span>
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
            <div class="app-content-header" style="padding: 12px 12px 8px 12px; margin-bottom: 8px;">
                <h1 class="app-content-headerText" style="margin: 0 0 0 4px;">${section.header}</h1>
                ${key === 'products' ? '<button class="app-content-headerButton" style="margin-left: 12px;">Add Product</button>' : ''}
            </div>
            <div style="padding: 24px 12px; color: var(--app-content-main-color);">
                ${section.content}
            </div>
        </div>
    `).join('');
    setupFilterButton(); 
}

// setting variables for filters

let selectedCategory = 'All';
let selectedStatus = 'All';

// Render products table with filtering
function renderProductsTable() {
    const table = document.getElementById('dashboard-products-table');
    if (!table) return;
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
    
    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
        const statusMatch = selectedStatus === 'All' || product.status.toLowerCase() === selectedStatus.toLowerCase();

        return categoryMatch && statusMatch;
    });

    const filterHTML = filteredProducts.map(product => {
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
                <span class="status ${product.status}">${product.status}</span>
            </div>
            <div class="product-cell sales">0</div>
            <div class="product-cell stock">0</div>
            <div class="product-cell price">MK${formatCurrency(product.dollar)}</div>
        </div>
        `;
    }).join('');
    table.innerHTML = filterHTML;
}

// Hide the filter dropdown menu (toggle class for better compatibility)
function hideFilterMenu() {
    const filterMenu = document.querySelector('.filter-menu');
    if (filterMenu) {
        filterMenu.classList.remove('show');
        filterMenu.style.display = ''; // reset inline style if any
    }
    const filterBtn = document.querySelector('.jsFilter');
    if (filterBtn) {
        filterBtn.classList.remove('active');
    }
}

// Show the filter dropdown menu (needed for toggling)
function showFilterMenu() {
    const filterMenu = document.querySelector('.filter-menu');
    if (filterMenu) {
        filterMenu.classList.add('show');
        filterMenu.style.display = 'block';
    }
    const filterBtn = document.querySelector('.jsFilter');
    if (filterBtn) {
        filterBtn.classList.add('active');
    }
}

// Setup filter button to toggle menu
function setupFilterButton() {
    const oldBtn = document.querySelector('.jsFilter');
    if (oldBtn) {
        const newBtn = oldBtn.cloneNode(true);
        oldBtn.parentNode.replaceChild(newBtn, oldBtn);
    }
    const filterBtn = document.querySelector('.jsFilter');
    if (filterBtn) {
        filterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const filterMenu = document.querySelector('.filter-menu');
            if (filterMenu) {
                if (filterMenu.classList.contains('show')) {
                    hideFilterMenu();
                } else {
                    showFilterMenu();
                }
            }
        });
    }
    // Hide menu when clicking outside
    document.addEventListener('click', (e) => {
        const filterMenu = document.querySelector('.filter-menu');
        if (filterMenu && filterMenu.classList.contains('show')) {
            if (!filterMenu.contains(e.target) && !e.target.classList.contains('jsFilter')) {
                hideFilterMenu();
            }
        }
    });
}

// Helper functions for filter state
function getDashboardFilters() {
    const filters = localStorage.getItem('dashboardFilters');
    return filters ? JSON.parse(filters) : { category: 'All', status: 'All' };
}

function setDashboardFilters(filters) {
    localStorage.setItem('dashboardFilters', JSON.stringify(filters));
}

function clearDashboardFilters() {
    localStorage.removeItem('dashboardFilters');
}

// Restore filters from localStorage and update UI
function restoreFiltersFromStorage() {
    const filters = getDashboardFilters();
    selectedCategory = filters.category;
    selectedStatus = filters.status;
    const catSelect = document.querySelector('.js-dashboard-category-filter');
    const statSelect = document.getElementById('statusFilter');
    if (catSelect) catSelect.value = selectedCategory;
    if (statSelect) statSelect.value = selectedStatus;
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
                    restoreFiltersFromStorage();
                    updateFilterButtonState(); // <-- Ensure button state is updated
                    renderProductsTable();
                    setupProductFilters();
                    setupFilterButton();
                }
            }
        });
    });
}

// Add this function to setup filter event listeners after rendering products section
function setupProductFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function () {
            selectedCategory = this.value;
            renderProductsTable();
        });
    }
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function () {
            selectedStatus = this.value;
            renderProductsTable();
        });
    }
}

/* Removed unused setupCategoryFilter and setupStatusFilter functions as their logic is handled in setupProductFilters */

// Initialize dashboard
function initDashboard() {
    renderSidebar();
    renderSections();
    setupSidebarNavigation();
    setupFilterButton();
    // Render products table and setup filter if products section is default
    const productsSection = document.getElementById('section-products');
    if (productsSection && productsSection.style.display !== 'none') {
        setupApplyButton();
        setupResetButton();
        restoreFiltersFromStorage();
        updateFilterButtonState(); // <-- Ensure button state is updated on load
        renderProductsTable();
        setupProductFilters();
    }
}

function setupApplyButton() {
    const oldBtn = document.getElementById('applyFilters');
    if (!oldBtn) return;
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);

    newBtn.addEventListener('click', () => {
        const catSelect = document.querySelector('.js-dashboard-category-filter');
        const statSelect = document.getElementById('statusFilter');
        if (catSelect) selectedCategory = catSelect.value;
        if (statSelect) selectedStatus = statSelect.value;

        setDashboardFilters({ category: selectedCategory, status: selectedStatus });

        restoreFiltersFromStorage(); // Sync UI and state
        renderProductsTable();       // Show filtered products
        updateFilterButtonState();
        hideFilterMenu();            // Hide dropdown after applying
    });
}

function setupResetButton() {
    const oldBtn = document.getElementById('resetFilters');
    if (!oldBtn) return;
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);

    newBtn.addEventListener('click', () => {
        selectedCategory = 'All';
        selectedStatus = 'All';

        clearDashboardFilters();

        restoreFiltersFromStorage(); // Sync UI and state
        renderProductsTable();       // Show all products
        updateFilterButtonState();
        hideFilterMenu();            // Hide dropdown after resetting
    });
}

// Optionally, visually indicate if filters are active
function updateFilterButtonState() {
    const filters = getDashboardFilters();
    const isActive = filters.category !== 'All' || filters.status !== 'All';
    const filterBtn = document.querySelector('.jsFilter');
    if (filterBtn) {
        if (isActive) {
            filterBtn.classList.add('filters-active');
        } else {
            filterBtn.classList.remove('filters-active');
        }
    }
}

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}
