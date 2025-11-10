// Đặt code này sau khi DOM đã được tải hoàn toàn
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Lấy tất cả các phần tử có class 'reveal-item'
    const revealItems = document.querySelectorAll('.reveal-item');
    
    // 2. Định nghĩa hàm xử lý khi phần tử được nhìn thấy
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Nếu phần tử lọt vào màn hình
                entry.target.classList.add('active');
                // Ngừng quan sát để hiệu ứng không chạy lại
                observer.unobserve(entry.target);
            }
        });
    };

    // 3. Định nghĩa các tùy chọn cho Intersection Observer
    const observerOptions = {
        root: null, // Quan sát so với viewport
        rootMargin: '0px',
        // Kích hoạt khi 10% phần tử lọt vào màn hình (0.1)
        threshold: 0.1 
    };

    // 4. Tạo Intersection Observer và bắt đầu quan sát
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    revealItems.forEach(item => {
        observer.observe(item);
    });
});