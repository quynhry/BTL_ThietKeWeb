// ========== CHUYỂN GIỮA FORM ĐĂNG NHẬP / ĐĂNG KÝ ==========
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// ========== KHỞI TẠO / ĐỌC DỮ LIỆU TỪ LOCALSTORAGE ==========
let users = JSON.parse(localStorage.getItem("users")) || [
  { name: "Admin", email: "admin@example.com", password: "Password@123" }
];

// ========== LƯU TRANG MUỐN REDIRECT NẾU CHƯA LOGIN ==========
if (!localStorage.getItem("currentUser")) {
  localStorage.setItem("redirectAfterLogin", window.location.pathname);
}

// ========== HÀM HỖ TRỢ ==========
function showError(input, message) {
  removeError(input);
  const error = document.createElement("span");
  error.className = "error-message";
  error.style.cssText =
    "color:#e74c3c;font-size:12px;margin-top:2px;display:block;text-align:left;padding-left:5px;";
  error.textContent = message;
  input.style.borderColor = "#e74c3c";
  input.insertAdjacentElement("afterend", error);
}

function removeError(input) {
  const next = input.nextElementSibling;
  if (next && next.classList.contains("error-message")) {
    next.remove();
  }
  input.style.borderColor = "";
}

function showSuccess(input) {
  removeError(input);
  input.style.borderColor = "#2ecc71";
}

function validateName(name) {
  const regex = /^[a-zA-ZÀ-ỹ\s]{2,50}$/;
  if (!name.trim()) return { valid: false, message: "Vui lòng nhập họ và tên" };
  if (!regex.test(name.trim()))
    return { valid: false, message: "Họ tên chỉ chứa chữ cái và khoảng trắng" };
  return { valid: true };
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return { valid: false, message: "Vui lòng nhập email" };
  if (!regex.test(email.trim()))
    return { valid: false, message: "Email không đúng định dạng" };
  return { valid: true };
}

function validatePassword(password) {
  if (!password) return { valid: false, message: "Vui lòng nhập mật khẩu" };
  if (password.length < 8)
    return { valid: false, message: "Mật khẩu phải có ít nhất 8 ký tự" };
  if (!/[A-Z]/.test(password))
    return { valid: false, message: "Phải có ít nhất 1 chữ hoa" };
  if (!/[a-z]/.test(password))
    return { valid: false, message: "Phải có ít nhất 1 chữ thường" };
  if (!/[0-9]/.test(password))
    return { valid: false, message: "Phải có ít nhất 1 chữ số" };
  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
    return { valid: false, message: "Phải có 1 ký tự đặc biệt" };
  return { valid: true };
}

function checkEmailExist(email) {
  return users.some(u => u.email.toLowerCase() === email.toLowerCase());
}

// ========== TOGGLE HIỆN / ẨN MẬT KHẨU ==========
const togglePasswords = document.querySelectorAll('.toggle-password');
togglePasswords.forEach(icon => {
  icon.addEventListener('click', () => {
    const input = icon.previousElementSibling;
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
  });
});

// ========== ĐĂNG KÝ ==========
const registerForm = document.querySelector(".register-container form");
const registerBtn = registerForm.querySelector("button");
const registerInputs = registerForm.querySelectorAll("input");

registerBtn.addEventListener("click", e => {
  e.preventDefault();
  let isValid = true;
  const [name, email, password] = registerInputs;

  const nameCheck = validateName(name.value);
  const emailCheck = validateEmail(email.value);
  const passwordCheck = validatePassword(password.value);

  if (!nameCheck.valid) { showError(name, nameCheck.message); isValid = false; } else showSuccess(name);
  if (!emailCheck.valid) { showError(email, emailCheck.message); isValid = false; }
  else if (checkEmailExist(email.value)) { showError(email, "Email này đã được đăng ký!"); isValid = false; }
  else showSuccess(email);
  if (!passwordCheck.valid) { showError(password, passwordCheck.message); isValid = false; } else showSuccess(password);

  if (isValid) {
    const newUser = { name: name.value.trim(), email: email.value.trim(), password: password.value };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const success = document.createElement("div");
    success.className = "success-modal";
    success.style.cssText =
      "position:absolute;top:0;left:0;right:0;bottom:0;background: #bc7d73;color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:25px;font-size:18px;z-index:999;";
    success.innerHTML = `<h2> Đăng ký thành công!</h2><p>Chào mừng, ${name.value}!</p>`;
    registerForm.appendChild(success);

    setTimeout(() => {
      success.remove();
      registerForm.reset();
      container.classList.remove("right-panel-active");
      registerInputs.forEach(i => (i.style.borderColor = ""));
    }, 2500);
  }
});

// ========== ĐĂNG NHẬP ==========
const loginForm = document.querySelector(".login-container form");
const loginBtn = loginForm.querySelector("button");
const loginEmailInput = loginForm.querySelector('input[type="email"]');
const loginPassInput = document.getElementById("login-password");
const rememberMe = document.getElementById("checkbox");

// Khi load trang -> nếu đã lưu thì tự động điền lại
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = JSON.parse(localStorage.getItem("rememberedUser"));
  if (savedUser) {
    loginEmailInput.value = savedUser.email;
    loginPassInput.value = savedUser.password;
    rememberMe.checked = true;
  }
});

// Hiển thị tên người dùng ở header
const header = document.getElementById("headerUser");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (header) {
  if (currentUser) {
    header.innerHTML = `Xin chào, ${currentUser.name}! <button id="logoutBtn">Đăng xuất</button>`;
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.reload();
    });
  } else {
    header.innerHTML = `<a href="login.html">Đăng nhập</a>`;
  }
}

loginBtn.addEventListener("click", e => {
  e.preventDefault();

  // 🔧 Xóa lỗi cũ mỗi lần nhấn nút
  removeError(loginEmailInput);
  removeError(loginPassInput);

  const email = loginEmailInput.value.trim();
  const password = loginPassInput.value.trim();

  let isValid = true;

  if (!email) { showError(loginEmailInput, "Vui lòng nhập email!"); isValid = false; }
  else showSuccess(loginEmailInput);

  if (!password) { showError(loginPassInput, "Vui lòng nhập mật khẩu!"); isValid = false; }
  else showSuccess(loginPassInput);

  if (!isValid) return;

  // 🔥 LUÔN đọc users mới nhất từ localStorage
  const latestUsers = JSON.parse(localStorage.getItem("users")) || [];

const found = latestUsers.find(
  u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
);


  if (found) {
    // Lưu user hiện tại
    localStorage.setItem("currentUser", JSON.stringify(found));

    if (rememberMe.checked) {
      localStorage.setItem("rememberedUser", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("rememberedUser");
    }

    const success = document.createElement("div");
    success.className = "success-modal";
    success.style.cssText =
      "position:absolute;top:0;left:0;right:0;bottom:0;background: #bc7d73;color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:25px;font-size:18px;z-index:999;";
    success.innerHTML = `<h2> Đăng nhập thành công!</h2><p>Chào mừng trở lại, ${found.name}!</p>`;
    loginForm.appendChild(success);

    setTimeout(() => {
      success.remove();
      // Redirect về trang lưu trước đó hoặc trang chủ
      const redirectUrl = localStorage.getItem("redirectAfterLogin") || "../index.html";
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = redirectUrl;
    }, 1500);
  } else {
    showError(loginPassInput, "Email hoặc mật khẩu không chính xác!");
  }
});

// ========== QUÊN MẬT KHẨU ==========
const forgotPasswordLink = loginForm.querySelector(".pass-link a");
forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "forgotpw.html"; // Chuyển sang trang quên mật khẩu
});
// ========== KIỂM TRA LOGIN KHI CLICK VÀO GIỎ HÀNG ==========
const cartBtn = document.getElementById("cartBtn");

cartBtn.addEventListener("click", (e) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    // Chưa login → lưu trang giỏ hàng để redirect sau khi login
    localStorage.setItem("redirectAfterLogin", "cart.html");
    window.location.href = "login.html"; // chuyển sang trang login
  } else {
    // Đã login → vào thẳng giỏ hàng
    window.location.href = "cart.html";
  }
});
