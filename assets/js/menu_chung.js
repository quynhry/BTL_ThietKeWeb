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
