import { products } from '../../scripts/data.js';
import { formatCurrency } from '../../scripts/utilities/calculate_cash.js';
import { selectedCategory, selectedStatus } from './dashboard-filters.js';

export function renderProductsTable() {
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
        const categoryMatch = selectedCategory.value === 'All' || product.category === selectedCategory.value;
        const statusMatch = selectedStatus.value === 'All' || product.status.toLowerCase() === selectedStatus.value.toLowerCase();
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

// Optionally, export a renderProductsGrid() if you want grid view support.