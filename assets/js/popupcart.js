// =========================
// GIỎ HÀNG LOCALSTORAGE
// =========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Các phần tử
const cartPopup = document.getElementById("cartPopup");
const cartList = document.getElementById("cartList");
const cartClose = document.querySelector(".cart-close");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const cartCount = document.getElementById("cartCount");

// =========================
// MỞ POPUP KHI NHẤN ICON BAG
// =========================
document.querySelectorAll(".bag-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const card = this.closest(".product-card");

        const name = card.querySelector(".product-name").innerText;
        const priceText = card.querySelector(".price").innerText;
        const price = parseInt(priceText.replace(/[^0-9]/g, ""));
        const image = card.querySelector(".main-img").src;

        // Thêm vào giỏ
        addToCart({
            name,
            price,
            image,
            qty: 1
        });

        openPopup();
    });
});

// =========================
// THÊM VÀO GIỎ
// =========================
function addToCart(product) {

    const found = cart.find(p => p.name === product.name);

    if (found) {
        found.qty += 1;
    } else {
        cart.push(product);
    }

    saveCart();
    renderCart();
    updateCartIcon();
}

// =========================
// LƯU CART
// =========================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// =========================
// RENDER GIỎ HÀNG
// =========================
function renderCart() {
    cartList.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        cartList.innerHTML += `
            <tr>
                <td>
                    <div class="cart-item-box">
                        <img src="${item.image}">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-remove" onclick="removeItem(${index})">Xóa</div>
                        </div>
                    </div>
                </td>

                <td class="cart-price">${item.price.toLocaleString("vi-VN")}₫</td>

                <td>
                    <div class="quantity-box">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <input type="text" value="${item.qty}" readonly>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>
                </td>

                <td class="cart-total-price">${itemTotal.toLocaleString("vi-VN")}₫</td>
            </tr>
        `;
    });

    cartTotalPrice.innerHTML = total.toLocaleString("vi-VN") + "₫";
    cartCount.innerText = cart.length;

    updateCartIcon();
}

// =========================
// THAY ĐỔI SỐ LƯỢNG
// =========================
function changeQty(index, amount) {
    cart[index].qty += amount;

    if (cart[index].qty < 1) cart[index].qty = 1;

    saveCart();
    renderCart();
    updateCartIcon();
}

// =========================
// XÓA SẢN PHẨM
// =========================
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartIcon();
}

// =========================
// MỞ POPUP
// =========================
function openPopup() {
    cartPopup.classList.add("show");
}

// =========================
// ĐÓNG POPUP (nhấn X)
// =========================
cartClose.addEventListener("click", () => {
    cartPopup.classList.remove("show");
});

// =========================
// CẬP NHẬT ICON GIỎ HÀNG GÓC TRÊN
// =========================
function updateCartIcon() {
    let count = cart.reduce((t, i) => t + i.qty, 0);
    let icon = document.getElementById("cartIconCount");

    if (icon) {
        icon.textContent = count;
    }
}

// KHỞI ĐỘNG
renderCart();
updateCartIcon();
