// Lấy các phần tử cần thiết
const headerTopBar = document.getElementById('headerTopBar'); // Top bar (chứa logo mặc định)
const headerNavMain = document.getElementById('headerNavMain'); // Menu chính
const bigLogo = document.getElementById('bigLogo'); // DIV cha chứa UL các chữ cái
const heroSub = document.getElementById('heroSub'); 
const heroCta = document.getElementById('heroCta');
const headerLogoText = document.getElementById('headerLogoText'); // Logo cố định khi cuộn
const topLogo = document.getElementById('topLogo'); // Logo ở Top Bar

let headerAndLogoShrunk = false; 
const LOGO_MOVE_SCROLL = 60; // Ngưỡng cuộn để header trượt xuống

// Hàm tiện ích: thêm/xóa class
function add(el, cls) { 
    if (!el) return;
    if (!el.classList.contains(cls)) el.classList.add(cls);
}
function remove(el, cls) { 
    if (!el) return;
    if (el.classList.contains(cls)) el.classList.remove(cls);
}

// Hàm xử lý cuộn chính
function onScroll() {
    const y = window.scrollY || window.pageYOffset;

    // LOGIC CHO HIỆU ỨNG HEADER TRƯỢT XUỐNG
    if (y > LOGO_MOVE_SCROLL) {
        if (!headerAndLogoShrunk) {
            
            // 1. Kích hoạt Header tổng trượt xuống (hiện)
            add(document.querySelector('header'), 'visible'); 
            
            // 2. HIỆN LOGO NHỎ CỐ ĐỊNH
            add(headerLogoText, 'visible'); 

            // 3. Ẩn Logo Top Bar (để tránh đè chữ)
            add(topLogo, 'fade-away');

            // 4. Kích hoạt hiệu ứng di chuyển logo lớn
            add(bigLogo, 'to-header');
            
            // 5. Ẩn subtitle và CTAs
            add(heroSub, 'fade-away');
            add(heroCta, 'fade-away');

            headerAndLogoShrunk = true;
        }
    } else {
        // ĐẢO NGƯỢC HIỆU ỨNG KHI CUỘN VỀ ĐẦU TRANG
        if (headerAndLogoShrunk) {
            
            // 1. Ẩn Header tổng
            remove(document.querySelector('header'), 'visible');
            
            // 2. ẨN LOGO NHỎ CỐ ĐỊNH
            remove(headerLogoText, 'visible'); 

            // 3. Hiện Logo Top Bar lại
            remove(topLogo, 'fade-away');

            // 4. Khôi phục logo lớn về vị trí ban đầu
            remove(bigLogo, 'to-header');
            
            // 5. Khôi phục subtitle và CTAs
            remove(heroSub, 'fade-away');
            remove(heroCta, 'fade-away');
            
            headerAndLogoShrunk = false;
        }
    }
}

// Gắn sự kiện CUỘN trang
window.addEventListener('scroll', onScroll, { passive: true });

// Khởi tạo ban đầu để đảm bảo trạng thái đúng khi tải trang
onScroll();

// =====================
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