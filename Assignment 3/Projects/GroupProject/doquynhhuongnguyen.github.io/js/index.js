document.addEventListener("DOMContentLoaded", function() {
    const categoryCard = document.querySelectorAll(".category-card");
    const products = document.querySelectorAll(".product");
    
    categoryCard.forEach(card => {
        card.addEventListener("click", function() {
            const category = this.querySelector("span").innerText.toLowerCase();
            
            products.forEach(product => {
                const productCategory = product.getAttribute("data-category").toLowerCase();
                
                if (productCategory === category) {
                    product.style.display = "inline-block";
                } else {
                    product.style.display = "none";
                }
            });
        });
    });
});

$(document).ready(function() {
    $(".hamburger-menu").click(function() {
        $(".mobile-menu").toggle();
    });
});

//STAR FEATURE FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");

    stars.forEach(star => {
        star.addEventListener("click", function () {
            let value = this.getAttribute("data-value");
            let parent = this.parentNode;
            let allStars = parent.querySelectorAll(".star");

            // Reset all stars
            allStars.forEach(s => s.classList.remove("active"));

            // Highlight selected stars
            for (let i = 0; i < value; i++) {
                allStars[i].classList.add("active");
            }
        });
    });
});
