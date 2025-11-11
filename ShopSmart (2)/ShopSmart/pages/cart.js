function getCartItems() {
  return JSON.parse(localStorage.getItem("cartItems") || "[]");
}

function setCartItems(items) {
  localStorage.setItem("cartItems", JSON.stringify(items));
}

function getCartCount() {
  return getCartItems().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartCount() {
  const count = getCartCount();
  localStorage.setItem("cartCount", count);
  const bagCount = document.getElementById("bagCount");
  if (bagCount) bagCount.textContent = count;
}

function clearCart() {
  setCartItems([]);
  localStorage.setItem("cartCount", "0");
  localStorage.removeItem("couponCode");
  const couponMsg = document.getElementById("coupon-message");
  if (couponMsg) couponMsg.textContent = "";
  renderCartItems();
  updateCartCount();
}

function renderCartItems(filter = "") {
  const cartItems = getCartItems();
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  const filteredItems = filter
    ? cartItems.filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase())
      )
    : cartItems;
  if (filteredItems.length === 0) {
    container.innerHTML = '<div class="cart-empty">No items found.</div>';
    document.getElementById("cart-summary").innerHTML = "";
    return;
  }
  let total = 0;
  let discount = 0;
  let couponApplied = false;
  const couponCode = localStorage.getItem("couponCode") || "";
  if (couponCode === "Harman20" || couponCode === "Thesandi20") {
    discount = 0.2;
    couponApplied = true;
  }
  let tableHTML = `<table class="cart-items-table"><tbody>`;
  filteredItems.forEach((item, idx) => {
    tableHTML += `
      <tr class="cart-item">
        <td><img src="${item.image || "https://via.placeholder.com/48"}" alt="${
      item.title
    }" class="cart-item-img"></td>
        <td class="cart-item-name">${item.title}</td>
        <td class="cart-item-qty">
          <button class="qty-btn" data-action="decrement" data-id="${
            item.id
          }">-</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-action="increment" data-id="${
            item.id
          }">+</button>
        </td>
        <td class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</td>
      </tr>
    `;
    if (idx < filteredItems.length - 1) {
      tableHTML += `<tr><td colspan="4"><hr class="cart-item-divider"></td></tr>`;
    }
    total += item.price * item.qty;
  });
  tableHTML += `</tbody></table>`;
  container.innerHTML = tableHTML;
  container.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = Number(this.getAttribute("data-id"));
      const action = this.getAttribute("data-action");
      let cartItems = getCartItems();
      const item = cartItems.find((i) => i.id === id);
      if (!item) return;
      if (action === "increment") {
        item.qty += 1;
      } else if (action === "decrement") {
        item.qty -= 1;
        if (item.qty === 0) {
          cartItems = cartItems.filter((i) => i.id !== id);
        }
      }
      setCartItems(cartItems);
      renderCartItems();
      updateCartCount();
    });
  });
  const taxRate = 0.13;
  let discountedTotal = total;
  let discountAmount = 0;
  if (discount > 0) {
    discountAmount = total * discount;
    discountedTotal = total - discountAmount;
  }
  const salesTax = discountedTotal * taxRate;
  const grandTotal = discountedTotal + salesTax;
  const summary = document.getElementById("cart-summary");
  summary.innerHTML = `
    <div class="cart-summary-details">
      <table class="cart-summary-table">
        <tr>
          <td class="cart-summary-label">Subtotal:</td>
          <td class="cart-summary-value">$${total.toFixed(2)}</td>
        </tr>
        ${
          couponApplied
            ? `<tr><td class='cart-summary-label'>Discount (20%):</td><td class='cart-summary-value'>-$${discountAmount.toFixed(
                2
              )}</td></tr>`
            : ""
        }
        <tr>
          <td class="cart-summary-label">Sales Tax (13%):</td>
          <td class="cart-summary-value">$${salesTax.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="cart-summary-label cart-summary-total">Total:</td>
          <td class="cart-summary-value cart-summary-total">$${grandTotal.toFixed(
            2
          )}</td>
        </tr>
      </table>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  renderCartItems();
  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);
  const searchInput = document.getElementById("cart-search");
  if (searchInput)
    searchInput.addEventListener("input", function () {
      renderCartItems(this.value);
    });
  const couponInput = document.getElementById("coupon-code");
  const applyCouponBtn = document.getElementById("apply-coupon");
  const couponMsg = document.getElementById("coupon-message");
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener("click", function () {
      const code = couponInput.value.trim();
      if (code === "Harman20" || code === "Thesandi20") {
        localStorage.setItem("couponCode", code);
        couponMsg.textContent = "Coupon applied! 20% discount.";
        renderCartItems();
      } else {
        localStorage.removeItem("couponCode");
        couponMsg.textContent = "Invalid coupon code.";
        renderCartItems();
      }
    });
    // Show message if coupon already applied
    if (
      localStorage.getItem("couponCode") === "Harman20" ||
      localStorage.getItem("couponCode") === "Thesandi20"
    ) {
      couponMsg.textContent = "Coupon applied! 20% discount.";
    }
  }
});
