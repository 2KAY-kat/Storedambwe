const products = [
    { id: 1, name: 'Product 1', 
      description: 'Description for Product 1', 
      price: 100, image: '../images/biscuitssnacks-1.jpg' 
    },
    { id: 2, 
      name: 'Product 2', 
      description: 'Description for Product 2', 
      price: 200, 
      image: '../images/IMG-20240711-WA0004.jpg' 
    },
  ];
  
  function displayProducts() {
    const productList = document.getElementById('productList');
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <a href="product-details.html?id=${product.id}">View Details</a>
      `;
      productList.appendChild(productCard);
    });
  }
  
  displayProducts();
  