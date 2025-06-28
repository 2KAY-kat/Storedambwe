import { products } from '../../scripts/data.js';

const productCategories = Array.from(new Set(products.map(p => p.category)));
productCategories.unshift('All');

const productsStatus = Array.from(new Set(products.map(p => p.status)));
productsStatus.unshift('All');

export const sections = {
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
