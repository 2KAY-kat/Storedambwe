export let selectedCategory = { value: 'All' };
export let selectedStatus = { value: 'All' };

// Helper functions for filter state
export function getDashboardFilters() {
    const filters = localStorage.getItem('dashboardFilters');
    return filters ? JSON.parse(filters) : { category: 'All', status: 'All' };
}

export function setDashboardFilters(filters) {
    localStorage.setItem('dashboardFilters', JSON.stringify(filters));
}

export function clearDashboardFilters() {
    localStorage.removeItem('dashboardFilters');
}

export function restoreFiltersFromStorage() {
    const filters = getDashboardFilters();
    selectedCategory.value = filters.category;
    selectedStatus.value = filters.status;
    const catSelect = document.querySelector('.js-dashboard-category-filter');
    const statSelect = document.getElementById('statusFilter');
    if (catSelect) catSelect.value = selectedCategory.value;
    if (statSelect) statSelect.value = selectedStatus.value;
}

export function hideFilterMenu() {
    const filterMenu = document.querySelector('.filter-menu');
    if (filterMenu) {
        filterMenu.classList.remove('show');
        filterMenu.style.display = '';
    }
    const filterBtn = document.querySelector('.jsFilter');
    if (filterBtn) {
        filterBtn.classList.remove('active');
    }
}

export function showFilterMenu() {
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

export function setupFilterButton() {
    // ...existing code for filter button setup...
}

export function updateFilterButtonState() {
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

export function setupProductFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function () {
            selectedCategory.value = this.value;
            // Optionally trigger table re-render here if needed
        });
    }
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function () {
            selectedStatus.value = this.value;
            // Optionally trigger table re-render here if needed
        });
    }
}

export function setupApplyButton() {
    const oldBtn = document.getElementById('applyFilters');
    if (!oldBtn) return;
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);

    newBtn.addEventListener('click', () => {
        const catSelect = document.querySelector('.js-dashboard-category-filter');
        const statSelect = document.getElementById('statusFilter');
        if (catSelect) selectedCategory.value = catSelect.value;
        if (statSelect) selectedStatus.value = statSelect.value;

        setDashboardFilters({ category: selectedCategory.value, status: selectedStatus.value });

        restoreFiltersFromStorage();
        // You may want to call renderProductsTable and updateFilterButtonState here if not handled elsewhere
        hideFilterMenu();
    });
}

export function setupResetButton() {
    const oldBtn = document.getElementById('resetFilters');
    if (!oldBtn) return;
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);

    newBtn.addEventListener('click', () => {
        selectedCategory.value = 'All';
        selectedStatus.value = 'All';

        clearDashboardFilters();

        restoreFiltersFromStorage();
        // You may want to call renderProductsTable and updateFilterButtonState here if not handled elsewhere
        hideFilterMenu();
    });
}
