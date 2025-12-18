/* ==============================
   CART CORE – SINGLE SOURCE
   Author: ChatGPT
   ============================== */

(function (window) {
  const KEY = 'cart';

  /* ---------- PRIVATE ---------- */
  function _getRaw() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  function _saveRaw(cart) {
    localStorage.setItem(KEY, JSON.stringify(cart));
    _emit();
  }

  function _emit() {
    window.dispatchEvent(new CustomEvent('cart:change', {
      detail: Cart.get()
    }));
  }

  /* ---------- PUBLIC API ---------- */
  const Cart = {
    KEY,

    get() {
      return _getRaw();
    },

    count() {
      return _getRaw().reduce((s, i) => s + i.quantity, 0);
    },

    total() {
      return _getRaw().reduce((s, i) => s + i.price * i.quantity, 0);
    },

    add(item) {
      if (!item || !item.id || !item.size) return;

      const cart = _getRaw();
      const exist = cart.find(
        i => i.id === item.id && i.size === item.size
      );

      if (exist) {
        exist.quantity += item.quantity || 1;
      } else {
        cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          size: item.size,
          quantity: item.quantity || 1
        });
      }

      _saveRaw(cart);
    },

    update(id, size, quantity) {
      const cart = _getRaw();
      const item = cart.find(i => i.id === id && i.size === size);
      if (!item) return;

      item.quantity = Math.max(1, quantity);
      _saveRaw(cart);
    },

    remove(id, size) {
      const cart = _getRaw().filter(
        i => !(i.id === id && i.size === size)
      );
      _saveRaw(cart);
    },

    clear() {
      localStorage.removeItem(KEY);
      _emit();
    }
  };

  /* ---------- EXPORT ---------- */
  window.Cart = Cart;

})(window);
