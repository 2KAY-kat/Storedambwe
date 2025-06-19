export function getProduct(productId) {
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
    }
    });

    return matchingProduct;
}

export const header = [{
    image: 'images/Storedambwe-logo-v1.0-03.png',
    name: 'STOREDAMBWE',
    link: 'checkout.html'
}];

export const hero = [{
    hero_text_h1: 'Welcome To Your Online Marketplace',
    hero_text_p: 'Buy and Sell Groceries Online',
    hero_btn_value: 'Shop Now!',
    hero_cart_icon: 'fa-shopping-cart',
    hero_link: '../index.html'
}];

export const products = [{
    id: '2024-0106-2022',
    image: 'images/19-346x310.webp',
    name: 'Corn Flakes | 1.2kg',
    dollar: 8500.00,
    description: 'some description apout the product here. These are insights about the product you would like to know about your given product no big deal about it',
    category: 'Food'
}, {
    id: '2024-0106-2023',
    image: 'images/10131363EA-checkers515Wx515H-346x310.png',
    name: 'Oros Orange Flavoured Juice | 1L',
    dollar: 2951.49,
    description: 'some description apout the product here. These are insights about the product you would like to know about your given product no big deal about it',
    category: 'Food'
}, {
    id: '2024-0106-2024',
    image: 'images/AdobeStock_34617669-346x310.webp',
    name: 'Fresh Tomato | 1 Pack',
    dollar: 3500,
    description: 'some description apout the product here. These are insights about the product you would like to know about your given product no big deal about it',
    category: 'Food'
}, {
    id: '2024-0106-2025',
    image: 'images/BB450g-346x310.webp',
    name: 'Blue Band | 500g',
    dollar: 3200,
    description: 'some description apout the product here. These are insights about the product you would like to know about your given product no big deal about it',
    category: 'Food'
}, {
    id: '2024-0106-2026',
    image: 'images/pear.jpg',
    name: 'Pears | 1kg',
    dollar: 1000,
    description: 'some description apout the product here. These are insights about the product you would like to know about your given product no big deal about it',
    category: 'Food'
}, {
    id: '2024-0106-2027',
    image: 'images/Carrots-346x310.webp',
    name: 'Fresh Carrots | 1kg',
    dollar: 1500,
    description: 'some description apout the product here. These are insights about the product you would like to know about your given product no big deal about it',
    category: 'Food'
}, {
    id: '2024-0106-2028',
    image: 'images/Green-Bell-Pepper-346x310.webp',
    name: 'Green Bell Pepper | 1kg',
    dollar: 850,
    description: 'some description apout the product here. These are insights about the product you would like to know about your given product no big deal about it',
    category: 'Food'
}, {
    id: '2024-0106-2029',
    image: 'images/Illovo1KG.webp',
    name: 'Illovo Sugar | 1kg',
    dollar: 4500,
    description: 'some description apout the product here. These are insights about the product you would like to know about your given product no big deal about it',
    category: 'Food'
}, {
    id: '2024-0106-2030',
    image: 'images/images-14-346x310.jpeg',
    name: 'Farmers Pride Rice | 5kg',
    dollar: 11000,
    description: 'some description apout the product here. These are insights about the product you would like to know about your given product no big deal about it',
    category: 'Food'
}, {
    id: '2024-0106-2031',
    image: 'images/images-50-346x310.webp',
        name: 'Liberty Fruit & Nut | 1kg',
    dollar: 8500,
    description: 'some description apout the product here. These are insights about the product you would like to know about your given product no big deal about it',
    category: 'Food'
},{
    id: '2024-0106-2031',
    image: 'images/egg-tray-768x768.webp',
    name: 'Egg | 1 only',
    dollar: 550,
    description: 'some description apout the product here. These are insights about the product you would like to know about your given product no big deal about it',
    category: 'Food'
}]; 