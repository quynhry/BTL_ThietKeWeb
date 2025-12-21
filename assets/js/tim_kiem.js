document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("searchIcon");
  const overlay = document.getElementById("searchOverlay");
  const closeBtn = document.getElementById("closeSearch");
  const input = document.getElementById("searchInput");
  const resultBox = document.getElementById("searchResult");

  /* MỞ POPUP */
  searchIcon.addEventListener("click", () => {
    overlay.style.display = "flex";
    input.focus();
  });

  /* ĐÓNG POPUP */
  function closeSearch() {
    overlay.style.display = "none";
    input.value = "";
    resultBox.innerHTML = "";
  }

  closeBtn.addEventListener("click", closeSearch);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearch();
  });

  /* SEARCH REALTIME */
  input.addEventListener("input", () => {
    const keyword = input.value.toLowerCase().trim();
    resultBox.innerHTML = "";

    if (!keyword) return;

    const results = SEARCH_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(keyword)
    );

    // ❌ Không có sản phẩm
    if (results.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Không có sản phẩm phù hợp";
      li.classList.add("no-result");
      resultBox.appendChild(li);
      return;
    }

    // ✅ Có sản phẩm
    results.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p.name;

      li.addEventListener("click", () => {
        window.location.href = p.url;
      });

      resultBox.appendChild(li);
    });
  });
});
