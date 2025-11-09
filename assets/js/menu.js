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
    if (!el.classList.contains(cls)) el.classList.add(cls) 
}
function remove(el, cls) { 
    if (el.classList.contains(cls)) el.classList.remove(cls) 
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