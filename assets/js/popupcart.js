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

  /* ================== ICON COUNT ================== */
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, i) => sum + i.quantity, 0);
    if (cartIconCount) cartIconCount.textContent = total;
  }

  /* ================== ADD TO CART ================== */
  function addToCart(showPopup = true) {
    const selectedSize = getSelectedSize();
    if (!selectedSize) {
      alert('Vui lòng chọn kích cỡ!');
      return false;
    }

    const quantity = parseInt(quantityInput.value) || 1;

    const cartItem = {
      id: addCartBtn.dataset.id,
      name: addCartBtn.dataset.name,
      price: Number(addCartBtn.dataset.price),
      image: addCartBtn.dataset.image,
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

    return true;
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
            <div style="display:flex;gap:10px">
              <img src="${item.image}" width="60">
              <div>
                <strong>${item.name}</strong><br>
                Size: ${item.size}<br>
                <span class="remove-item" style="color:red;cursor:pointer">Xóa</span>
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

  /* ================== + / − / XÓA (EVENT DELEGATION) ================== */
  cartList.addEventListener('click', e => {
    const row = e.target.closest('tr');
    if (!row) return;

    const id = row.dataset.id;
    const size = row.dataset.size;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(i => i.id === id && i.size === size);
    if (!item) return;

    if (e.target.classList.contains('qty-plus')) {
      item.quantity++;
    }

    if (e.target.classList.contains('qty-minus')) {
      if (item.quantity > 1) item.quantity--;
    }

    if (e.target.classList.contains('remove-item')) {
      cart = cart.filter(i => !(i.id === id && i.size === size));
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartPopup();
    updateCartCount();
  });

  /* ================== EVENTS ================== */
  addCartBtn?.addEventListener('click', e => {
    e.preventDefault();
    addToCart(true);
  });

  buyNowBtn?.addEventListener('click', e => {
    e.preventDefault();
    const ok = addToCart(false);
    if (!ok) return;
    window.location.href = 'cart.html';
  });

  cartClose.addEventListener('click', () => {
    cartPopup.classList.remove('active');
    document.body.style.overflow = '';
  });

  updateCartCount();
});
