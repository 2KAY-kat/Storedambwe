import { cart } from '../cart.js';
import { getProduct } from '../data.js';
//import { getDeliveryOption } from '../deliveryOptions.js';
import { formatCurrency } from '../utilities/calculate_cash.js';


export function renderPaymentSummary() {
    let productDollar = 0;
    //let ShippingDollar = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productDollar += product.dollar * cartItem.quantity;
/*
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        ShippingDollar += deliveryOption.dollar;
*/
    });
/*
    const totalBeforeTaxDollar = productDollar + ShippingDollar;
    const taxDollar = totalBeforeTaxDollar * 0.1;
    const totalDollar = totalBeforeTaxDollar + taxDollar;
*/
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    

    const paymentsummaryHTML = `
            <div class="payment-summary-title">
                Saved Items Total
            </div>

            <div class="payment-summary-row total-row">
                <div>Items (${cartQuantity}):</div>
                <div class="payment-summary-money">MK${formatCurrency(productDollar)}</div>
            </div>            
    `;

    document.querySelector('.js-payment-summary')
    .innerHTML = paymentsummaryHTML;
}

/****
 * 
 * 
 * 
 * 
 * <!--
            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">MK${formatCurrency(ShippingDollar)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">MK${formatCurrency(totalBeforeTaxDollar)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">MK${formatCurrency(taxDollar)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">MK${formatCurrency(totalDollar)}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>
            -->
 */