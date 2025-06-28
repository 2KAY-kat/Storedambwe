import { renderProductsTable } from './dashboard-table.js';

export function setupSidebarNavigation() {
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
                }
            }
        });
    });
}
