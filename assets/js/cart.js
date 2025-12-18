document.addEventListener("DOMContentLoaded", () => {
  const cartLeft = document.getElementById("cartLeft");
  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");
  const cartIconCount = document.getElementById("cartIconCount");

  function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    const cart = getCart();
    cartLeft.innerHTML = "";

    if (cart.length === 0) {
  cartLeft.innerHTML = `
    <div class="empty-cart">
      <i class="fa-solid fa-cart-shopping"></i>
      <p>Giỏ hàng của bạn đang trống</p>
      <a href="san-pham.html" class="back-shop-btn">
        Tiếp tục mua sắm
      </a>
    </div>
  `;
  updateTotal([]);
  return;
}


    cart.forEach(item => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.image}" class="cart-img">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>${item.price.toLocaleString()}đ | Size ${item.size}</p>
          <div class="quantity-controls">
            <button class="minus">−</button>
            <span>${item.quantity}</span>
            <button class="plus">+</button>
          </div>
        </div>
        <button class="delete">×</button>
      `;

      div.querySelector(".minus").onclick = () => {
        if (item.quantity > 1) item.quantity--;
        saveCart(cart);
        renderCart();
      };

      div.querySelector(".plus").onclick = () => {
        item.quantity++;
        saveCart(cart);
        renderCart();
      };

      div.querySelector(".delete").onclick = () => {
        saveCart(cart.filter(
          i => !(i.id === item.id && i.size === item.size)
        ));
        renderCart();
      };

      cartLeft.appendChild(div);
    });

    updateTotal(cart);
  }

  function updateTotal(cart) {
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = cart.length ? 30000 : 0;
    subtotalEl.textContent = subtotal.toLocaleString() + "đ";
    shippingEl.textContent = shipping.toLocaleString() + "đ";
    totalEl.textContent = (subtotal + shipping).toLocaleString() + "đ";
    cartIconCount.textContent = cart.reduce((s, i) => s + i.quantity, 0);
  }

  renderCart();
});
