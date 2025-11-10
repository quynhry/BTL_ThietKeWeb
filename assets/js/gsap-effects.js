gsap.registerPlugin(SplitText);

let split, animation;
const targetText = "#heroSub"; 

// Hàm thiết lập chính: Tách văn bản và chạy animation khởi động
function setup() {
    // 1. Hoàn nguyên SplitText và Animation cũ (nếu có)
    split && split.revert();
    animation && animation.revert();
    
    // 2. Đảm bảo phần tử target không bị ẩn bởi CSS/Class khác trước khi tách
    // (Vô hiệu hóa tạm thời hiệu ứng 'fade-away' nếu nó đã được áp dụng)
    gsap.set(targetText, { opacity: 1, transform: 'none', clearProps: "all" });
    
    // 3. Tách văn bản
    // Nếu text có ít hơn 2 dòng trên màn hình nhỏ, hiệu ứng 'lines' sẽ không tạo ra gì.
    split = SplitText.create(targetText, {type:"chars,words,lines"});
    
    // 4. Tự động chạy animation khởi động
    autoStartAnimation(); 
}

// ----------------------------------------------------
// HIỆU ỨNG TỰ ĐỘNG KHỞI CHẠY (Hiệu ứng Từ/Words)
// ----------------------------------------------------
function autoStartAnimation() {
    // Dừng animation cũ nếu đang chạy
    animation && animation.kill(); 

    // Chạy lại hiệu ứng Words: Rơi/nhảy vào từ trên
    animation = gsap.from(split.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        duration: 0.7, 
        ease: "back.out(1.7)", // Dùng ease nảy 'back.out'
        stagger: 0.15,
        onComplete: () => {
             // Dọn dẹp thuộc tính transform của các phần tử con sau khi animation kết thúc
             gsap.set(split.words, { clearProps: "transform, opacity" });
             // Đảm bảo không có xung đột với script cuộn (menu.js)
        }
    });
}


// ----------------------------------------------------
// CÁC HÀM KÍCH HOẠT HIỆU ỨNG (Giống ví dụ gốc của bạn)
// ----------------------------------------------------

function animateChars() {
    animation && animation.revert();
    animation = gsap.from(split.chars, {
        x: 150,
        opacity: 0,
        duration: 0.7, 
        ease: "power4",
        stagger: 0.04
    })
}

function animateWords() {
    animation && animation.revert();
    animation = gsap.from(split.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        duration: 0.7, 
        ease: "back",
        stagger: 0.15
    })
}

function animateLines() {
    animation && animation.revert();
    animation = gsap.from(split.lines, {
        rotationX: -100,
        transformOrigin: "50% 50% -160px",
        opacity: 0,
        duration: 0.8, 
        ease: "power3",
        stagger: 0.25
    })
}


// ----------------------------------------------------
// LẮNG NGHE SỰ KIỆN VÀ KHỞI CHẠY
// ----------------------------------------------------
document.querySelector("#chars")?.addEventListener("click", animateChars);
document.querySelector("#words")?.addEventListener("click", animateWords);
document.querySelector("#lines")?.addEventListener("click", animateLines);

// Khởi chạy
setup();
window.addEventListener("resize", setup);