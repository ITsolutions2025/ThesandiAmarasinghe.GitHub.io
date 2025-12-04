// Checkout page JS

document.addEventListener("DOMContentLoaded", function () {
  function showToast(message) {
    let toast = document.getElementById("checkout-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "checkout-toast";
      toast.style.position = "fixed";
      toast.style.bottom = "2.5rem";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%)";
      toast.style.background = "linear-gradient(90deg,#82aaff,#5c8edc)";
      toast.style.color = "#fff";
      toast.style.padding = "1rem 2.5rem";
      toast.style.borderRadius = "8px";
      toast.style.fontSize = "1.1rem";
      toast.style.boxShadow = "0 2px 16px rgba(130,170,255,0.15)";
      toast.style.zIndex = 9999;
      toast.style.opacity = 0;
      toast.style.transition = "opacity 0.3s";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = 1;
    setTimeout(() => {
      toast.style.opacity = 0;
    }, 2200);
  }

  function clearCart() {
    localStorage.setItem("cartItems", "[]");
    localStorage.setItem("cartCount", "0");
    localStorage.removeItem("couponCode");
    const bagCount = document.getElementById("bagCount");
    if (bagCount) bagCount.textContent = "0";
  }
  const form = document.querySelector(".checkout-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nameInput = form.querySelector("#billing-name");
      let name = nameInput && nameInput.value.trim();
      if (!name) name = "Customer";
      clearCart();
      showToast(`Thank you, ${name}! Your order was placed successfully.`);
      form.reset();
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2500);
    });
  }
});
