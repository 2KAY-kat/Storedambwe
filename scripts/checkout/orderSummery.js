import { cart, removeFromCart, updateDeliveryOption, updateQuantity } from '../cart.js';
import { products, getProduct } from '../products.js';
import { formatCurrency } from '../utilities/calculate_cash.js';
import dayjs from '../../package/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../deliveryOptions.js';
import { renderPaymentSummary } from './paymentsummary.js';



export function renderOrderSummary() {

    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);


    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);


    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd, MMMM, D');

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(matchingProduct.dollar)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                        Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                        Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
                </div>
            </div>

                        
    `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {

    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

        const dateString = deliveryDate.format('dddd, MMMM, D');


        const priceString = deliveryOption.dollar === 0
            ? 'FREE'
            : `MK${formatCurrency(deliveryOption.dollar)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;


        html += `
        
    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">

    <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
    <div>
    <div class="delivery-option-date">
        ${dateString}
    </div>
    <div class="delivery-option-price">
        ${priceString} Shipping
    </div>
    </div>
    </div>
        
        `
    });

    return html;
    }



    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


    document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);

      if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }

      updateQuantity(productId, newQuantity);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
    });
  });


    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            renderOrderSummary();
            renderPaymentSummary();
        });
    });


    let cartQuantity = 0;

cart.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
});

document.querySelector('.js-return-to-home-link')
  .innerHTML = `${cartQuantity} items`;

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
        });
    });

    
}

