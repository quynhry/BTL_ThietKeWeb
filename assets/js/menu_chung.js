// ================== LẤY PHẦN TỬ ==================
const header = document.querySelector('header');

const headerTopBar = document.getElementById('headerTopBar');
const headerNavMain = document.getElementById('headerNavMain');
const bigLogo = document.getElementById('bigLogo');
const heroSub = document.getElementById('heroSub');
const heroCta = document.getElementById('heroCta');
const headerLogoText = document.getElementById('headerLogoText');
const topLogo = document.getElementById('topLogo');
const hero = document.querySelector('.hero');

// ================== BIẾN ==================
let lastScrollTop = 0;
let headerAndLogoShrunk = false;

const LOGO_MOVE_SCROLL = 60;
const heroHeight = hero ? hero.offsetHeight : 0;

// ================== TIỆN ÍCH ==================
function add(el, cls) {
    if (el && !el.classList.contains(cls)) el.classList.add(cls);
}

function remove(el, cls) {
    if (el && el.classList.contains(cls)) el.classList.remove(cls);
}

// ================== KHỞI TẠO ==================
// ⚠️ BẮT BUỘC: header phải hiện ngay khi load
add(header, 'visible');

// ================== SCROLL ==================
function onScroll() {
    const y = window.scrollY || window.pageYOffset;

    // ====== GIAI ĐOẠN SAU LOGO_MOVE_SCROLL ======
    if (y > LOGO_MOVE_SCROLL) {

        if (!headerAndLogoShrunk) {
            add(headerLogoText, 'visible');
            add(bigLogo, 'to-header');
            add(topLogo, 'fade-away');
            add(heroSub, 'fade-away');
            add(heroCta, 'fade-away');

            headerAndLogoShrunk = true;
        }

        // ====== QUA HERO → ẨN / HIỆN MENU ======
        if (y > heroHeight) {
            if (y > lastScrollTop) {
                // Scroll xuống
                remove(header, 'visible');
            } else {
                // Scroll lên
                add(header, 'visible');
            }
        } else {
            // Chưa qua hero → luôn hiện
            add(header, 'visible');
        }

    } 
    // ====== Ở ĐẦU TRANG ======
    else {
        // Menu LUÔN HIỆN
        add(header, 'visible');

        if (headerAndLogoShrunk) {
            remove(headerLogoText, 'visible');
            remove(bigLogo, 'to-header');
            remove(topLogo, 'fade-away');
            remove(heroSub, 'fade-away');
            remove(heroCta, 'fade-away');

            headerAndLogoShrunk = false;
        }
    }

    lastScrollTop = y;
}

// ================== GẮN SỰ KIỆN ==================
window.addEventListener('scroll', onScroll, { passive: true });

// ================== CHẠY LẦN ĐẦU ==================
onScroll();
// Toggle Mobile Menu
// =====================
const headerEl = document.querySelector('header');
const menuToggleBtn = document.getElementById('menuToggle');

if (menuToggleBtn && headerEl) {
    menuToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        headerEl.classList.toggle('menu-open');
    });

    // Đóng menu khi click ra ngoài panel
    document.addEventListener('click', (e) => {
        const menuPanel = document.querySelector('.header-menu');
        const clickedInsideMenu = menuPanel && menuPanel.contains(e.target);
        const clickedToggle = menuToggleBtn.contains(e.target);
        if (!clickedInsideMenu && !clickedToggle) {
            headerEl.classList.remove('menu-open');
        }
    });
}

// Mở/đóng submenu trên mobile (nếu có)
const menuItems = Array.from(document.querySelectorAll('.header-menu .menu-item'));
menuItems.forEach((item) => {
    const link = item.querySelector(':scope > a');
    const sub = item.querySelector(':scope > .sub-menu');
    if (link && sub) {
        link.addEventListener('click', (e) => {
            // Trên mobile, toggle submenu thay vì đi tới trang
            if (window.matchMedia('(max-width: 768px)').matches) {
                e.preventDefault();
                item.classList.toggle('open');
            }
        });
    }
});
