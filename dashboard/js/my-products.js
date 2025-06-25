// Use event delegation for dynamic dashboard
document.addEventListener("click", function (e) {
    // Filter button
    if (e.target.closest(".jsFilter")) {
        const filterMenu = e.target.closest(".app-content-actions").querySelector(".filter-menu");
        if (filterMenu) filterMenu.classList.toggle("active");
    }

    // List view button
    if (e.target.closest(".action-button.list")) {
        const section = e.target.closest(".dashboard-section") || document;
        const listBtn = section.querySelector(".action-button.list");
        const gridBtn = section.querySelector(".action-button.grid");
        const wrapper = section.querySelector(".products-area-wrapper");
        if (listBtn && gridBtn && wrapper) {
            listBtn.classList.add("active");
            gridBtn.classList.remove("active");
            wrapper.classList.remove("gridView");
            wrapper.classList.add("tableView");
        }
    }

    // Grid view button
    if (e.target.closest(".action-button.grid")) {
        const section = e.target.closest(".dashboard-section") || document;
        const listBtn = section.querySelector(".action-button.list");
        const gridBtn = section.querySelector(".action-button.grid");
        const wrapper = section.querySelector(".products-area-wrapper");
        if (listBtn && gridBtn && wrapper) {
            gridBtn.classList.add("active");
            listBtn.classList.remove("active");
            wrapper.classList.add("gridView");
            wrapper.classList.remove("tableView");
        }
    }
});
