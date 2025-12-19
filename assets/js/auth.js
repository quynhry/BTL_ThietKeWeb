// ===============================
//  LẤY USER HIỆN TẠI
// ===============================
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}


// ===============================
//  XÁC ĐỊNH PATH ĐÚNG
// ===============================
function getBasePath() {
    // nếu URL có /pages/ → đang ở trong pages
    return window.location.pathname.includes("/pages/")
        ? "../"
        : "";
}


// ===============================
//  RENDER HEADER (login → logout)
// ===============================
function renderHeaderUser() {
    const headerUser = document.getElementById("headerUser");
    if (!headerUser) return;

    const user = getCurrentUser();
    const basePath = getBasePath();

    if (user) {
        headerUser.innerHTML = `
            <span class="user-name">Xin chào, ${user.name}</span>
            <button id="logoutBtn" class="logout-btn">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
        `;

        document.getElementById("logoutBtn").onclick = () => {
            localStorage.removeItem("currentUser");
            window.location.href = basePath + "index.html";
        };

    } else {
        headerUser.innerHTML = `
            <a href="${basePath}pages/login.html">
                <i class="fa-regular fa-user"></i>
            </a>
        `;
    }
}


// ===============================
//  CHẠY KHI LOAD TRANG
// ===============================
document.addEventListener("DOMContentLoaded", renderHeaderUser);
