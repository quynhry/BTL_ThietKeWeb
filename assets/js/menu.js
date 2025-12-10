// Lấy các phần tử cần thiết
const headerTopBar = document.getElementById('headerTopBar'); 
const headerNavMain = document.getElementById('headerNavMain'); 
const bigLogo = document.getElementById('bigLogo'); 
const heroSub = document.getElementById('heroSub'); 
const heroCta = document.getElementById('heroCta');
const headerLogoText = document.getElementById('headerLogoText'); 
const topLogo = document.getElementById('topLogo'); 
const header = document.querySelector('header');

let headerAndLogoShrunk = false; 
let lastScrollTop = 0; // Biến lưu vị trí scroll trước đó
const LOGO_MOVE_SCROLL = 60; 
const heroHeight = document.querySelector('.hero').offsetHeight; // Chiều cao hero

// Hàm tiện ích: thêm/xóa class
function add(el, cls) { 
    if (el && !el.classList.contains(cls)) el.classList.add(cls) 
}
function remove(el, cls) { 
    if (el && el.classList.contains(cls)) el.classList.remove(cls) 
}

// Hàm xử lý cuộn chính
function onScroll() {
    const y = window.scrollY || window.pageYOffset;

    // LOGIC CHO HIỆU ỨNG HEADER TRƯỢT XUỐNG
    if (y > LOGO_MOVE_SCROLL) {
        if (!headerAndLogoShrunk) {
            
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

        // LOGIC ẨN/HIỆN HEADER KHI LƯỚT LÊN/XUỐNG (chỉ sau khi qua hero)
        if (y > heroHeight) {
            if (y > lastScrollTop) {
                // Scroll XUỐNG - ẨN header
                remove(header, 'visible');
            } else {
                // Scroll LÊN - HIỆN header
                add(header, 'visible');
            }
        } else {
            // Trong vùng sau LOGO_MOVE_SCROLL nhưng chưa qua hero - hiện header
            add(header, 'visible');
        }
        
    } else {
        // ĐẢO NGƯỢC HIỆU ỨNG KHI CUỘN VỀ ĐẦU TRANG
        if (headerAndLogoShrunk) {
            
            // 1. Ẩn Header tổng
            remove(header, 'visible');
            
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

    // Cập nhật vị trí scroll cuối cùng
    lastScrollTop = y;
}

// Gắn sự kiện CUỘN trang
window.addEventListener('scroll', onScroll, { passive: true });

// Khởi tạo ban đầu
onScroll();