// ===============================
//  LẤY USER HIỆN TẠI
// ===============================
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}


// ===============================
//  RENDER HEADER (login → logout)
// ===============================
function renderHeaderUser() {
    const headerUser = document.getElementById("headerUser");
    if (!headerUser) return;

    const user = getCurrentUser();

    if (user) {
        headerUser.innerHTML = `
            <span class="user-name">Xin chào, ${user.name}</span>
            <button id="logoutBtn" class="logout-btn">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
        `;

        document.getElementById("logoutBtn").onclick = () => {
            localStorage.removeItem("currentUser");
            location.reload();
        };

    } else {
        headerUser.innerHTML = `
            <a href="pages/login.html">
                <i class="fa-regular fa-user"></i>
            </a>
        `;
    }
}


// ===============================
//  CHẠY KHI LOAD TRANG
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    renderHeaderUser();
});
