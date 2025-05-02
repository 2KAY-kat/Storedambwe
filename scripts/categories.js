const categories = [{
    categoryID: '1aba',
    image: 'images/biscuitssnacks-1.jpg',
    name: 'Snacks',
    description: 'From the cheapiest of your crunchy desires to the rmantic memories with chockoletes and biscuits.'
},{
    categoryID: '1abb',
    image: 'images/bacola-banner-01.jpg',
    name: 'Electronics',
    description: 'Get your fresh from the farm greens at an affordable price'
},{
    categoryID: '1abb',
    image: 'images/bacola-banner-01.jpg',
    name: 'Foods',
    description: 'Get your fresh from the farm greens at an affordable price'
},{
    categoryID: '1abc',
    image: 'images/stacked-t-shirts.jpg',
    name: 'Clothes',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
},{
    categoryID: '1abc',
    image: 'images/stacked-t-shirts.jpg',
    name: 'Merch',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
},{
    categoryID: '1abc',
    image: 'images/stacked-t-shirts.jpg',
    name: 'Merch',
    description: 'Get your top qulity local and international brands and Merch at an in town price in our Store'
}];

let categoriesHTML = '';

categories.forEach((categories) => {
    categoriesHTML += `
  
    <a href="index.html?id=${categories.categoryID}" class="category-card">
          <!--
            <div>
                <img class="category-image" src="${categories.image}" alt=""> -->
                <h3 class="category-name">${categories.name}</h3>
               <!-- <p class="category-description">${categories.description}</p> 
                <div class="view-category">
                    <!-- <button class="btn2">View Category</button>
                </div>
            </div> -->
    </a>
    `;
})

document.querySelector('.js-categories-grid').innerHTML = categoriesHTML;