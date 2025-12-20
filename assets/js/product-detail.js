document.addEventListener('DOMContentLoaded', () => {
  const zoomBox = document.querySelector('.main-image-zoom');
  const zoomImg = document.querySelector('#mainImg');
  if (!zoomBox || !zoomImg) return;
  zoomBox.addEventListener('mousemove', (e) => {
    const rect = zoomBox.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    zoomImg.style.transformOrigin = `${x}% ${y}%`;
    zoomImg.style.transform = 'scale(1.5)';
  });
    zoomBox.addEventListener('mouseleave', () => {
    zoomImg.style.transformOrigin = '50% 50%';
    zoomImg.style.transform = 'scale(1)';
    });
});








document.addEventListener("DOMContentLoaded", () => {
  const decreaseBtn = document.getElementById("decreaseQty");
  const increaseBtn = document.getElementById("increaseQty");
  const quantityInput = document.getElementById("quantity");




  let quantity = parseInt(quantityInput.value) || 1;
  const MIN_QTY = 1;
  const MAX_QTY = 99; // bạn có thể đổi nếu muốn




  increaseBtn.addEventListener("click", () => {
    if (quantity < MAX_QTY) {
      quantity++;
      quantityInput.value = quantity;
    }
  });



  decreaseBtn.addEventListener("click", () => {
    if (quantity > MIN_QTY) {
      quantity--;
      quantityInput.value = quantity;
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const sizeButtons = document.querySelectorAll(".size-btn");
  sizeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // bỏ active của tất cả size
      sizeButtons.forEach(b => b.classList.remove("active"));
      // set active cho size vừa click
      btn.classList.add("active");
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const sizeGuideLink = document.querySelector('.size-guide');
  const sizeGuideModal = document.getElementById('sizeGuideModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModal = document.getElementById('closeModal');
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (!sizeGuideLink || !sizeGuideModal) return;
  // Open modal
  sizeGuideLink.addEventListener('click', (e) => {
    e.preventDefault();
    sizeGuideModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  // Close modal
  function closeSizeGuide() {
    sizeGuideModal.classList.remove('active');
    document.body.style.overflow = '';
  }
  closeModal.addEventListener('click', closeSizeGuide);
  modalOverlay.addEventListener('click', closeSizeGuide);




  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sizeGuideModal.classList.contains('active')) {
      closeSizeGuide();
    }
  });




  // Tabs
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;




      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));




      button.classList.add('active');
      document.getElementById(`tab-${targetTab}`)?.classList.add('active');
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = getCurrentUser();
  renderHeaderUser();
});













