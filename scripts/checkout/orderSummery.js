import { cart, removeFromCart, updateDeliveryOption, updateQuantity, clearCart, toggleDeleteButton } from '../cart.js';
import { getProduct } from '../data.js';
import { formatCurrency } from '../utilities/calculate_cash.js';
import dayjs from '../../package/esm/index.js';
//import { deliveryOptions} from '../deliveryOptions.js';
import { renderPaymentSummary } from './paymentsummary.js';

function updateCartQuantityDisplay() {
    const cartQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const cartLink = document.querySelector('.js-return-to-home-link');
    if (cartLink) {
        cartLink.innerHTML = `${cartQuantity} item${cartQuantity !== 1 ? 's' : ''}`;
    }
}

export function renderOrderSummary() {
    console.log('Cart:', cart);
    /*console.log('Delivery Options:', deliveryOptions); */

    let cartSummaryHTML = '';

    // Handle empty cart state
    if (!cart || cart.length === 0) {
        cartSummaryHTML = `
            <div class="no-products-message">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#007bff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M7 10h14l-1.5 9h-11z" />
                  <path d="M3 3l18 18" />
                </svg>
                <div class="message">
                   You dont have saved items in your cart. Start adding some products
                </div>
            </div>
        `;
    } else {
        cart.forEach((cartItem) => {
            const productId = cartItem.productId;
            const matchingProduct = getProduct(productId);

            const postedDate = dayjs(matchingProduct.postedDate);
            const dateString = postedDate.format('dddd, MMMM D, YYYY');

            cartSummaryHTML += `
                <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                        <div class="delivery-date">
                        Posted on: ${dateString}
                        </div>

                        <div class="cart-item-details-grid">
                         <a href="view-details.html?id=${matchingProduct.id}">
                        <img class="product-image"
                            src="${matchingProduct.image}">

                        <div class="cart-item-details">
                            <div class="product-name">
                           ${matchingProduct.name}</a>
                            </div>
                            <div class="product-price">
                MK ${formatCurrency(matchingProduct.dollar)}
                            </div>
                            <div class="product-quantity">


                            <!--
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
                            -->


                            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                                <i class="fa fa-trash"></i> Delete
                            </span>
                            </div>
                        </div>

                        <div class="delivery-options">
                            <div class="delivery-options-title">
                            <h4 class="saved-list-descriptionH3">Description <i class="fa fa-info-circle" style="color: #6d2b2b"></i> </h4>
                            </div>

                            <div class="saved-list-description">
                            <p class="saved-list-descriptionP">
                            ${matchingProduct.description}

                            </p>
                            </div>
                        </div>
                        
                        </div>
                    </div>

                            
            `;
        });
    }


    /**
    function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryHours, 'hour');

        // Format the date and time
        const dateString = deliveryDate.format('dddd, MMMM D [at] h:mm A');

        // Calculate estimated time in hours
        const hoursText = deliveryOption.deliveryHours === 1 
            ? '1 hour' 
            : `${deliveryOption.deliveryHours} hours`;

        const priceString = deliveryOption.dollar === 0
            ? 'FREE'
            : `MK${formatCurrency(deliveryOption.dollar)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
        <div class="delivery-option js-delivery-option" 
            data-product-id="${matchingProduct.id}" 
            data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" ${isChecked ? 'checked ' : ''} 
                class="delivery-option-input" 
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div> 
                <div class="delivery-option-time">
                    Estimated delivery: ${hoursText}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
            </div>
        </div>
        `;
    });

    return html;
}


**/


    const element = document.querySelector('.js-order-summary');
    console.log('Order summary element:', element); // Debug element existence
    if (element) {
        element.innerHTML = cartSummaryHTML;

        // Update button visibility
        toggleDeleteButton();
        updateCartQuantityDisplay(); // Update cart quantity display

        // Only attach event listeners if cart has items
        if (cart.length > 0) {
            document.querySelectorAll('.js-update-link')
                .forEach((link) => {
                    link.addEventListener('click', () => {
                        const productId = link.dataset.productId;
                        const container = document.querySelector(
                            `.js-cart-item-container-${productId}`
                        );
                        container.classList.remove('is-editing-quantity');

                        updateQuantity();
                    });
                });


            document.querySelectorAll('.js-delete-link')
                .forEach((link) => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const productId = link.dataset.productId;
                        // Show modal and store productId to delete
                        showDeleteModal(productId);
                    });
                });


            let cartQuantity = 0;

            cart.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });

            document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;

            document.querySelectorAll('.js-delivery-option').forEach((element) => {
                element.addEventListener('click', () => {
                    const { productId, deliveryOptionId } = element.dataset;
                    updateDeliveryOption(productId, deliveryOptionId);
                    renderOrderSummary();
                    renderPaymentSummary();
                });
            });
        }
    } else {
        console.error('Order summary element not found!');
    }
    /*
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
    */
    /*
     document.querySelectorAll('.js-update-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          const container = document.querySelector(
            `.js-cart-item-container-${productId}`
          );
          container.classList.remove('is-editing-quantity');
    
          updateQuantity();
        });
      });
    
    
        document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = link.dataset.productId;
                // Show modal and store productId to delete
                showDeleteModal(productId);
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
        */


}

// Modal logic for delete confirmation
function showDeleteModal(productId = null) {
    const modal = document.getElementById('delete-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');

    if (productId) {
        modalTitle.textContent = 'Remove Item?';
        modalMessage.textContent = 'Are you sure you want to remove this item from your saved list?';
    } else {
        modalTitle.textContent = 'Delete All Items?';
        modalMessage.textContent = 'Are you sure you want to remove all items from your saved list?';
    }

    modal.style.display = 'flex';
    modal.dataset.productId = productId || '';
    modal.dataset.isDeleteAll = !productId;
}

function hideDeleteModal() {
    const modal = document.getElementById('delete-modal');
    modal.style.display = 'none';
    modal.dataset.productId = '';
}

// Modal event listeners
const modal = document.getElementById('delete-modal');
if (modal) {
    // Confirm delete
    document.getElementById('modal-confirm-btn').onclick = function () {
        const productId = modal.dataset.productId;
        const isDeleteAll = modal.dataset.isDeleteAll === 'true';

        if (isDeleteAll) {
            clearCart();
        } else if (productId) {
            removeFromCart(productId);
        }

        renderOrderSummary();
        renderPaymentSummary();
        updateCartQuantityDisplay(); // Update cart quantity after deletion
        hideDeleteModal();
    };

    // Add Delete All button listener
    document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
        if (cart.length > 0) {
            showDeleteModal();
        }
    });

    // Cancel delete
    document.getElementById('modal-cancel-btn').onclick = hideDeleteModal;
    // Close (X) button
    document.getElementById('modal-close-btn').onclick = hideDeleteModal;
    // Optional: close modal when clicking outside content
    modal.onclick = function (e) {
        if (e.target === modal) hideDeleteModal();
    };
}