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

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  if (toast.hideTimeout) clearTimeout(toast.hideTimeout);
  toast.hideTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function addToCart(product) {
  let cartItems = getCartItems();
  const existing = cartItems.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cartItems.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  }
  setCartItems(cartItems);
  updateCartCount();
  showToast(`Added "${product.title}" to cart.`);
}

function renderProduct(product) {
  const container = document.getElementById("product-details");
  container.innerHTML = `
    <div class="product-card">
      <img src="${product.image}" alt="${product.title}" class="product-img" />
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-desc">${product.description}</p>
        <div class="product-price">$${product.price}</div>
        <button class="btn" id="add-to-cart">Add to Cart</button>
      </div>
    </div>
  `;
  document.getElementById("add-to-cart").addEventListener("click", function () {
    addToCart(product);
  });
}

function fetchProduct(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then(renderProduct)
    .catch(() => {
      document.getElementById("product-details").textContent =
        "Failed to load product details.";
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  if (!productId) {
    const details = document.getElementById("product-details");
    details.textContent = "No product selected.";
    details.classList.add("no-product");
    return;
  }
  fetchProduct(productId);
  updateCartCount();
});
