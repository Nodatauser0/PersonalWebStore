// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
  
    const addToCartButtons = document.querySelectorAll('.buy-now-button');
    const cartModal = document.createElement('div');
    cartModal.classList.add('cart-modal');
    document.body.appendChild(cartModal);
  
    const cartIcon = document.querySelector('.fa-shopping-cart');
    const cartCount = document.createElement('span');
    cartCount.classList.add('cart-count');
    cartCount.textContent = '0';
    cartIcon.parentElement.appendChild(cartCount);
  
    // Add click event listeners to all Buy Now buttons
    addToCartButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const itemCard = button.closest('.item-card');
        const itemName = itemCard.querySelector('h3').textContent;
        const itemPrice = parseFloat(
          itemCard.querySelector('.item-price').textContent.replace('$', '')
        );
  
        const existingItem = cart.find(item => item.name === itemName);
  
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }
  
        updateCartCount();
        displayCart();
      });
    });
  
    function updateCartCount() {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
    }
  
    function displayCart() {
      cartModal.innerHTML = '<h3>Shopping Cart</h3>';
  
      if (cart.length === 0) {
        cartModal.innerHTML += '<p>Your cart is empty.</p>';
        updateCartCount();
        return;
      }
  
      const itemList = document.createElement('ul');
      cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
          <button class="remove-item" data-index="${index}">Remove</button>
        `;
        itemList.appendChild(listItem);
      });
      cartModal.appendChild(itemList);
  
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartModal.innerHTML += `<p>Total: $${total.toFixed(2)}</p>`;
  
      const removeButtons = cartModal.querySelectorAll('.remove-item');
      removeButtons.forEach(button => {
        button.addEventListener('click', () => {
          const itemIndex = parseInt(button.dataset.index, 10);
          cart.splice(itemIndex, 1);
          updateCartCount();
          displayCart();
        });
      });
    }
  
    // CSS for the cart modal and count
    const style = document.createElement('style');
    style.textContent = `
      .cart-modal {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 1px solid #ccc;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
      }
  
      .cart-modal ul {
        list-style-type: none;
        padding: 0;
      }
  
      .cart-modal li {
        margin: 10px 0;
      }
  
      .cart-modal button {
        background-color: red;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
      }
  
      .cart-count {
        background: red;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 14px;
        position: absolute;
        top: 0;
        right: -10px;
        transform: translate(50%, -50%);
      }
    `;
    document.head.appendChild(style);
  });
  