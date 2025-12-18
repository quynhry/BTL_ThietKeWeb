document.addEventListener('DOMContentLoaded', () => {

  const addCartBtn = document.querySelector('.btn-add-cart');
  const buyNowBtn = document.querySelector('.btn-buy-now');
  const cartPopup = document.getElementById('cartPopup');
  const cartClose = cartPopup.querySelector('.cart-close');
  const cartList = document.getElementById('cartList');
  const cartCountSpan = document.getElementById('cartCount');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const cartIconCount = document.getElementById('cartIconCount');

  const quantityInput = document.getElementById('quantity');

  /* ================== SIZE ================== */
  function getSelectedSize() {
    const selected = document.querySelector('.size-btn.active');
    return selected ? selected.textContent : null;
  }

  /* ================== ADD TO CART ================== */
  function addToCart(showPopup = true) {
    const selectedSize = getSelectedSize();
    if (!selectedSize) {
      alert('Vui lòng chọn kích cỡ!');
      return;
    }

    const quantity = parseInt(quantityInput.value) || 1;

    const cartItem = {
      id: 1,
      name: "Tuyết Vũ Anh Đào",
      price: 2990000,
      image: "https://pos.nvncdn.com/22713a-176435/ps/20250905_kOB5RJ5r2E.jpeg",
      size: selectedSize,
      quantity
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exist = cart.find(i => i.id === cartItem.id && i.size === cartItem.size);

    if (exist) {
      exist.quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();
    if (showPopup) {
      renderCartPopup();
      cartPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  /* ================== ICON COUNT ================== */
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, i) => sum + i.quantity, 0);
    if (cartIconCount) cartIconCount.textContent = total;
  }

  /* ================== RENDER POPUP ================== */
  function renderCartPopup() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cartList.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      cartList.innerHTML += `
        <tr data-id="${item.id}" data-size="${item.size}">
          <td>
            <div style="display:flex;gap:10px;align-items:center">
              <img src="${item.image}" width="60">
              <div>
                <div><strong>${item.name}</strong></div>
                <div>Size: ${item.size}</div>
                <div class="remove-item" style="color:red;cursor:pointer">Xóa</div>
              </div>
            </div>
          </td>

          <td>${item.price.toLocaleString()}₫</td>

          <td>
            <button class="qty-minus">−</button>
            <span style="margin:0 8px">${item.quantity}</span>
            <button class="qty-plus">+</button>
          </td>

          <td>${itemTotal.toLocaleString()}₫</td>
        </tr>
      `;
    });

    cartCountSpan.textContent = cart.length;
    cartTotalPrice.textContent = total.toLocaleString() + '₫';
  }

  /* ================== + / − / XÓA ================== */
  document.addEventListener('click', e => {
    const row = e.target.closest('tr');
    if (!row) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const id = Number(row.dataset.id);
    const size = row.dataset.size;
    const item = cart.find(i => i.id === id && i.size === size);
    if (!item) return;

    if (e.target.classList.contains('qty-plus')) item.quantity++;
    if (e.target.classList.contains('qty-minus') && item.quantity > 1) item.quantity--;
    if (e.target.classList.contains('remove-item')) {
      cart = cart.filter(i => !(i.id === id && i.size === size));
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartPopup();
    updateCartCount();
  });

  /* ================== EVENTS ================== */
  addCartBtn?.addEventListener('click', () => addToCart());
  buyNowBtn?.addEventListener('click', () => {
    addToCart(false);
    window.location.href = 'cart.html';
  });

  cartClose.addEventListener('click', () => {
    cartPopup.classList.remove('active');
    document.body.style.overflow = '';
  });

  updateCartCount();
});
