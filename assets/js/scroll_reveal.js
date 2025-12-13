// Đặt code này sau khi DOM đã được tải hoàn toàn
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Lấy tất cả các phần tử 
    const revealItems = document.querySelectorAll('.reveal-item');
    
    // 2. Định nghĩa hàm xử lý khi phần tử được nhìn thấy
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Nếu phần tử lọt vào màn hình → HIỆN
                entry.target.classList.add('active');
            } else {
                // Nếu phần tử rời khỏi màn hình → ẨN
                entry.target.classList.remove('active');
            }
        });
    };

    // 3. Định nghĩa các tùy chọn cho Intersection Observer
    const observerOptions = {
        root: null, // Quan sát so với viewport
        rootMargin: '0px',
        // Kích hoạt khi 15% phần tử lọt vào màn hình
        threshold: 0.3
    };

    // 4. Tạo Intersection Observer và bắt đầu quan sát
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    revealItems.forEach(item => {
        observer.observe(item);
    });
});
