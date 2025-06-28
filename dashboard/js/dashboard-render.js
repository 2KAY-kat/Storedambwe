import { sidebarItems } from './dashboard-data.js';
import { sections } from './dashboard-sections.js';

export function renderSidebar() {
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

export function renderSections() {
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
}
