// ================== LOAD CART ==================
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// ================== RENDER CHECKOUT ==================
function renderCheckout() {
  const checkoutItems = document.getElementById('checkoutItems');
  checkoutItems.innerHTML = '';

  cartItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'checkout-item';

    div.innerHTML = `
      <img src="${item.image}" class="checkout-img">

      <div class="checkout-info">
        <p class="checkout-name">${item.name}</p>
        <p class="checkout-meta">Size ${item.size} × ${item.quantity}</p>
      </div>

      <div class="checkout-price">
        ${(item.price * item.quantity).toLocaleString()}đ
      </div>
    `;

    checkoutItems.appendChild(div);
  });

  updateTotals();
}



// ================== TOTAL ==================
function updateTotals() {
  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const shipping = cartItems.length ? 30000 : 0;
  const total = subtotal + shipping;

  document.getElementById('subtotal').textContent =
    subtotal.toLocaleString() + 'đ';
  document.getElementById('shipping').textContent =
    shipping.toLocaleString() + 'đ';
  document.getElementById('total').textContent =
    total.toLocaleString() + 'đ';
}

// ================== SUBMIT ==================
document.getElementById('checkoutForm').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!name || !phone || !address) {
    alert('Vui lòng điền đầy đủ thông tin');
    return;
  }

  alert(`Cảm ơn ${name}! Đơn hàng đã được ghi nhận.`);
  localStorage.removeItem('cart');
  window.location.href = '../pages/dat_hang.html';
});

// ================== INIT ==================
document.addEventListener('DOMContentLoaded', () => {
  if (!cartItems.length) {
    alert('Giỏ hàng trống!');
    window.location.href = 'cart.html';
    return;
  }

  renderCheckout();
});
