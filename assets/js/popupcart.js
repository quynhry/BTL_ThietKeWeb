/* ============================= CART STORAGE ============================= */

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function formatMoney(num) {
    return num.toLocaleString("vi-VN") + "đ";
}

/* ============================= POPUP CONTROL ============================= */

const cartPopup = document.getElementById("cartPopup");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotalPrice");

function openCartPopup(message) {
    document.getElementById("cartPopupMessage").innerText = message;
    renderCart();
    cartPopup.classList.add("show");
}

document.querySelector(".cart-close").onclick = () => {
    cartPopup.classList.remove("show");
};

/* ============================= RENDER CART ============================= */

function renderCart() {
    const cart = getCart();
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ""));
        const subtotal = price * item.quantity;
        total += subtotal;

        cartList.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                
                <div>
                  <div class="cart-name">${item.name}</div>
                  <div class="remove-btn" onclick="removeItem(${index})">Xóa</div>
                </div>

                <div class="cart-price">${item.price}</div>

                <div class="qty-box">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    <input class="qty-input" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </div>

                <div class="cart-subtotal">${formatMoney(subtotal)}</div>
            </div>
        `;
    });

    cartTotal.innerText = formatMoney(total);
}

/* ============================= QUANTITY ============================= */

function changeQty(index, change) {
    const cart = getCart();

    cart[index].quantity += change;
    if (cart[index].quantity < 1) cart[index].quantity = 1;

    saveCart(cart);
    renderCart();
}

/* ============================= REMOVE ITEM ============================= */

function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

/* ============================= ADD TO CART ============================= */

document.querySelectorAll(".bag-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".product-card");

        const name = card.querySelector(".product-name").innerText;
        const price = card.querySelector(".price").innerText;
        const image = card.querySelector(".main-img").src;

        let cart = getCart();

        cart.push({
            name,
            price,
            image,
            quantity: 1
        });

        saveCart(cart);

        openCartPopup(`Bạn đã thêm [${name}] vào giỏ hàng`);
    });
});
