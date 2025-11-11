const api = "https://fakestoreapi.com/products";
let allProducts = [];

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

function createCard(product) {
  const div = document.createElement("div");
  div.className = "card";
  div.style.cursor = "pointer";
  div.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "button") return;
    window.location.href = `product.html?id=${product.id}`;
  });

  div.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <div class="card-body">
      <h2>${product.title}</h2>
      <p>${product.description.slice(0, 80)}…</p>
      <div class="price">$${product.price}</div>
      <button>Add to Cart</button>
    </div>
  `;
  div.querySelector("button").addEventListener("click", (event) => {
    event.stopPropagation();
    addToCart(product);
  });
  return div;
}

function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  if (products.length === 0) {
    const noResult = document.createElement("div");
    noResult.className = "no-products";
    noResult.textContent = "No products found. Please try a different search.";
    container.appendChild(noResult);
    return;
  }
  products.forEach((prod) => container.appendChild(createCard(prod)));
}

function applyFiltersAndSort() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const sortValue = document.getElementById("sortSelect").value;
  let filtered = allProducts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm)
  );
  if (sortValue === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortValue === "price-desc")
    filtered.sort((a, b) => b.price - a.price);
  else if (sortValue === "name-asc")
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  else if (sortValue === "name-desc")
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  displayProducts(filtered);
}

async function fetchAndShow() {
  try {
    const res = await fetch(api);
    if (!res.ok) throw new Error("Network error");
    allProducts = await res.json();
    applyFiltersAndSort();
  } catch (err) {
    console.error("Fetch error:", err);
    document.getElementById("products").textContent =
      "Failed to load products.";
  }
}

function setupEventListeners() {
  document
    .getElementById("searchInput")
    .addEventListener("input", applyFiltersAndSort);
  document
    .getElementById("sortSelect")
    .addEventListener("change", applyFiltersAndSort);
  const homeLogo = document.getElementById("homeLogo");
  homeLogo.addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("sortSelect").value = "";
    applyFiltersAndSort();
  });
  homeLogo.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      homeLogo.click();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndShow();
  updateCartCount();
  setupEventListeners();
});
