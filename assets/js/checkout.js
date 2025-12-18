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

  document.getElementById('subtotal').textContent = subtotal.toLocaleString() + 'đ';
  document.getElementById('shipping').textContent = shipping.toLocaleString() + 'đ';
  document.getElementById('total').textContent = total.toLocaleString() + 'đ';
}

// ================== HTML SẢN PHẨM GỬI EMAIL ==================
const orderItemsHTML = cartItems.map(item => `
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px">
  <tr>
    <td width="70" valign="top">
      <img src="${item.image}" width="60" style="border-radius:6px;display:block">
    </td>

    <td valign="top" style="font-size:14px">
      <strong>${item.name}</strong><br>
      <span style="font-size:13px;color:#777">
        Size ${item.size} × ${item.quantity}
      </span>
    </td>

    <td valign="top" align="right" style="font-size:14px;white-space:nowrap">
      ${(item.price * item.quantity).toLocaleString()}đ
    </td>
  </tr>
</table>
`).join('');


// ================== SUBMIT (EMAILJS) ==================
document.getElementById('checkoutForm').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!name || !phone || !address) {
    alert('Vui lòng điền đầy đủ thông tin');
    return;
  }

  // ✅ LẤY EMAIL USER ĐÃ ĐĂNG NHẬP
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser || !currentUser.email) {
    alert('Bạn cần đăng nhập để thanh toán');
    return;
  }

  const userEmail = currentUser.email;
  const subtotalText = document.getElementById('subtotal').textContent;
const shippingText = document.getElementById('shipping').textContent;
const totalText = document.getElementById('total').textContent;


  emailjs.send(
    'service_kt211aj',
    'template_75p7pum',
    {
      user_email: userEmail,
      customer_name: name,
      customer_phone: phone,
      customer_address: address,
      subtotal: subtotalText,   // ✅ thêm
      shipping: shippingText,
      order_items: orderItemsHTML,
      order_total: totalText
    }
  ).then(() => {
    alert(`Cảm ơn ${name}! Đơn hàng đã được ghi nhận.`);
    localStorage.removeItem('cart');
    window.location.href = '../pages/dat_hang.html';
  }).catch(err => {
    console.error(err);
    alert('Gửi email thất bại, vui lòng thử lại!');
  });
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
