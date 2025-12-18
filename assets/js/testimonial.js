/* ========================================= */
/* INTERSECTION OBSERVER - Theo dõi khi element xuất hiện */
/* ========================================= */

// Cấu hình cho Observer
const observerOptions = {
    threshold: 0.1,                      // Kích hoạt khi 10% element xuất hiện
    rootMargin: '0px 0px -50px 0px'      // Margin bottom -50px để trigger sớm hơn
};

/* ========================================= */
/* CALLBACK FUNCTION - Xử lý khi element vào viewport */
/* ========================================= */
const observer = new IntersectionObserver((entries) => {
    // Duyệt qua tất cả các entries (elements được quan sát)
    entries.forEach(entry => {
        // Nếu element đang trong viewport
        if (entry.isIntersecting) {
            // Thêm class 'active' để kích hoạt animation CSS
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

/* ========================================= */
/* APPLY OBSERVER - Áp dụng cho tất cả .reveal-item */
/* ========================================= */

// Lấy tất cả elements có class 'reveal-item'
document.querySelectorAll('.reveal-item').forEach(item => {
    // Đăng ký theo dõi từng element
    observer.observe(item);
});

/* ========================================= */
/* GIẢI THÍCH HOẠT ĐỘNG:
/* ========================================= 
 * 
 * 1. IntersectionObserver theo dõi khi element xuất hiện trong viewport
 * 
 * 2. Khi user scroll xuống:
 *    - Observer phát hiện element vào viewport (10% xuất hiện)
 *    - Callback function được gọi
 *    - Class 'active' được thêm vào element
 * 
 * 3. CSS sẽ xử lý animation:
 *    - opacity: 0 → 1 (từ ẩn sang hiện)
 *    - transform: translateY(30px) → translateY(0) (từ dưới lên)
 * 
 * 4. Mỗi card có delay khác nhau (0.1s, 0.2s, 0.3s...)
 *    → Tạo hiệu ứng stagger (lần lượt xuất hiện)
 * 
 *========================================= */