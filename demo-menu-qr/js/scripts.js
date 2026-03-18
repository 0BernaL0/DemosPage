/*!
 * Start Bootstrap - Full Width Pics v5.0.6 (https://startbootstrap.com/template/full-width-pics)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-full-width-pics/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

// ── CART STATE ──
let cart = [];

function addItem(btn, name, price, emoji) {
  const existing = cart.find((i) => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, emoji, qty: 1 });
  }
  updateCart();

  // button feedback
  btn.classList.add("added");
  btn.innerHTML = '<i class="bi bi-check"></i>';
  setTimeout(() => {
    btn.classList.remove("added");
    btn.innerHTML = '<i class="bi bi-plus"></i>';
  }, 900);

  // count bump
  const countEl = document.getElementById("cartCount");
  countEl.classList.remove("bump");
  void countEl.offsetWidth;
  countEl.classList.add("bump");
  setTimeout(() => countEl.classList.remove("bump"), 300);
}

function changeQty(name, delta) {
  const idx = cart.findIndex((i) => i.name === name);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCart();
}

function updateCart() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent =
    "Gs. " + total.toLocaleString("es-PY");

  const container = document.getElementById("cartItems");
  const empty = document.getElementById("cartEmpty");

  if (cart.length === 0) {
    empty.style.display = "block";
    container.querySelectorAll(".cart-item").forEach((el) => el.remove());
  } else {
    empty.style.display = "none";
    container.querySelectorAll(".cart-item").forEach((el) => el.remove());
    cart.forEach((item) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
            <div class="cart-item-emoji">${item.emoji}</div>
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">Gs. ${(item.price * item.qty).toLocaleString("es-PY")}</div>
            </div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="changeQty('${item.name}', -1)">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" onclick="changeQty('${item.name}', 1)">+</button>
            </div>
          `;
      container.appendChild(div);
    });
  }

  // Build WhatsApp message
  const phone = "595981000000";
  let msg = "🍕 *Hola La Piazza! Quisiera hacer el siguiente pedido:*\n\n";
  cart.forEach((i) => {
    msg += `• ${i.name} x${i.qty} — Gs. ${(i.price * i.qty).toLocaleString("es-PY")}\n`;
  });
  msg += `\n*Total estimado: Gs. ${total.toLocaleString("es-PY")}*\n\n¿Pueden confirmar disponibilidad y tiempo de entrega? Gracias!`;
  document.getElementById("whatsappBtn").href =
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
  document.getElementById("cartOverlay").classList.toggle("open");
}

// ── SCROLL & TABS ──
document.querySelectorAll(".cat-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document
      .querySelectorAll(".cat-tab")
      .forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});
