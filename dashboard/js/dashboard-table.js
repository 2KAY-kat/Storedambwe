import { products } from '../../scripts/data.js';
import { formatCurrency } from '../../scripts/utilities/calculate_cash.js';

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

    const productsHTML = products.map(product => {
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
    table.innerHTML = html + productsHTML;
}

// Grid view rendering
export function renderProductsGrid() {
    const table = document.getElementById('dashboard-products-table');
    if (!table) return;
    table.style.maxHeight = "";
    table.style.overflowY = "";
    table.style.display = "grid";
    table.style.gridTemplateColumns = "repeat(auto-fill, minmax(220px, 1fr))";
    table.style.gap = "16px";
    table.innerHTML = products.map(product => {
        let imgSrc = product.image;
        if (imgSrc.startsWith('./')) {
            imgSrc = '../' + imgSrc.substring(2);
        } else if (!/^https?:\/\//.test(imgSrc) && !imgSrc.startsWith('/')) {
            imgSrc = '../' + imgSrc;
        }
        return `
        <div class="product-grid-card" style="border:1px solid #eee; border-radius:8px; padding:16px; background:#fff;">
            <div style="display:flex; align-items:center; margin-bottom:8px;">
                <img src="${imgSrc}" alt="product" style="width:48px; height:48px; object-fit:cover; border-radius:4px; margin-right:8px;">
                <span style="font-weight:bold;">${product.name}</span>
            </div>
            <div>Category: <b>${product.category}</b></div>
            <div>Status: <span class="status ${product.status}">${product.status}</span></div>
            <div>Sales: 0</div>
            <div>Stock: 0</div>
            <div>Price: <b>MK${formatCurrency(product.dollar)}</b></div>
        </div>
        `;
    }).join('');
}