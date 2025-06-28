import { renderSidebar, renderSections } from './dashboard-render.js';
import { setupSidebarNavigation } from './dashboard-navigation.js';
import { renderProductsTable } from './dashboard-table.js';

function initDashboard() {
    renderSidebar();
    renderSections();
    setupSidebarNavigation();
    // Render products table if products section is default
    const productsSection = document.getElementById('section-products');
    if (productsSection && productsSection.style.display !== 'none') {
        renderProductsTable();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

// No filter logic remains
