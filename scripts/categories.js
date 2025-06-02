const categories = [{
    categoryID: '1aaa',
    sta_tus: 'active',
    image: 'images/biscuitssnacks-1.jpg',
    name: 'All',
    description: 'From the cheapiest of your crunchy desires to the rmantic memories with chockoletes and biscuits.'
},{
    categoryID: '1aba',
    image: 'images/biscuitssnacks-1.jpg',
    name: 'Electronics',
    description: 'From the cheapiest of your crunchy desires to the rmantic memories with chockoletes and biscuits.'
},{
    categoryID: '1abb',
    image: 'images/bacola-banner-01.jpg',
    name: 'Clothing & Accessories',
    description: 'Get your fresh from the farm greens at an affordable price'
},{
    categoryID: '1abb',
    image: 'images/bacola-banner-01.jpg',
    name: 'Food',
    description: 'Get your fresh from the farm greens at an affordable price'
},{
    categoryID: '1abc',
    image: 'images/stacked-t-shirts.jpg',
    name: 'Entertainment',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
},{
    categoryID: '1abc',
    image: 'images/stacked-t-shirts.jpg',
    name: 'Merch',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
},{
    categoryID: '1abc',
    image: 'images/stacked-t-shirts.jpg',
    name: 'Education',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
},{
    categoryID: '1abb',
    image: 'images/bacola-banner-01.jpg',
    name: 'Housing',
    description: 'Get your fresh from the farm greens at an affordable price'
},{
    categoryID: '1abc',
    image: 'images/stacked-t-shirts.jpg',
    name: 'Vehicles',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
}];

let categoriesHTML = '';

categories.forEach((categories) => {
    categoriesHTML += `
  
    <div href="index.html?id=${categories.categoryID}" class="category-card ${categories.sta_tus}">
          <!--
            <div>
                <img class="category-image" src="${categories.image}" alt=""> 
                -->

                <h3>${categories.name}</h3>

               <!-- 
               <p class="category-description">${categories.description}</p> 
                <div class="view-category">
                    <button class="btn2">View Category</button>
                </div>
            </div> -->
    </div>
    `;
})

document.querySelector('.js-categories-grid').innerHTML = categoriesHTML;

//mine great but simple
/*
window.addEventListener("scroll", function () {
    const tabs = document.getElementById("category-tabs");
    const wrapper = document.getElementById("categoy-tabs-wrapper");
    const wrapperTop = wrapper.offsetTop;

    if (window.scrollY >= wrapperTop) {
        tabs.classList.add("sticky");
    } else {
        tabs.classList.remove("sticky");
    }
});

*/

const category = document.getElementById('categories');
const stickyTigger = document.getElementById('sticky-trigger');

const observer = new IntersectionObserver(
    ([entry]) => {
        if (!entry.isIntersecting) {
            category.classList.add('sticky');

            category.classList.remove('unstick');
        } else {
            category.classList.remove('sticky');
            category.classList.add('unstick');
        }
    },
    { threshold: 0 }
);

observer.observe(stickyTigger);