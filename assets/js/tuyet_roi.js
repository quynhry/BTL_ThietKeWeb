// Sử dụng hàm tự chạy để tránh xung đột tên biến với code có sẵn của web
    (function() {
        // Chờ trang web tải xong hoàn toàn mới chạy hiệu ứng
        window.addEventListener('load', function() {
            const snowContainer = document.getElementById('my-snow-overlay-container');
            if (!snowContainer) return;

            // Mốc 1: Sau 20 giây (20000ms) thì bắt đầu mờ dần
            setTimeout(() => {
                snowContainer.classList.add('snow-fade-out-active');
                // console.log("Bắt đầu mờ dần...");
            }, 20000); 

            // Mốc 2: Đúng 30 giây (30000ms) thì xóa hoàn toàn khỏi trang web
            // (20s hiện rõ + 10s mờ dần = 30s)
            setTimeout(() => {
                if (snowContainer) {
                    snowContainer.remove();
                    // console.log("Đã dọn sạch hiệu ứng!");
                }
            }, 30000); 
        });
    })();