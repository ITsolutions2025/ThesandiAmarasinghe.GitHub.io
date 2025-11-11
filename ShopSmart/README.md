# ShopSmart Project

ShopSmart is a modern, responsive online store demo built with HTML, CSS, and JavaScript. It features a clean UI, product browsing, a shopping cart, and product detail pages, all powered by the [Fake Store API](https://fakestoreapi.com/).

## Project Structure

```
Project 2/
├── index.html        # Landing page with logo, slogan, and navigation
├── index.css         # Landing page styles
├── pages/
│   ├── listing.html  # Store page: product grid, search, sort
│   ├── listing.css   # Store page styles
│   ├── listing.js    # Store page logic
├── common.css        # Shared styles for all pages
├── favicon.svg       # Site icon
├── pages/
│   ├── cart.html     # Shopping cart page
│   ├── cart.css      # Cart page styles
│   ├── cart.js       # Cart page logic
│   ├── product.html  # Product details page
│   ├── product.css   # Product details styles
│   ├── product.js    # Product details logic
```

## How Each Page Works

### Landing Page (`index.html`)

- Features the ShopSmart logo and slogan
- Navigation button to enter the store ("Spend Money!")
- Footer credits: By Thesandi & Harmandeep

### Store Page (`pages/listing.html`)

- Displays all products in a responsive grid.
- Users can search and sort products by name or price.
- Each product card links to its details page.
- "Add to Cart" button adds products to the cart (stored in localStorage).
- Cart icon shows the current item count.

### Product Details Page (`pages/product.html`)

- Shows detailed info for a single product (image, title, description, price).
- "Add to Cart" button adds the product to the cart and updates the count.
- Uses the product ID from the URL to fetch data from the API.

### Cart Page (`pages/cart.html`)

- Lists all products added to the cart, with images, names, quantities, and prices.
- Users can adjust quantities or remove items.
- Shows subtotal, sales tax (13%), and total.
- "Clear Cart" button empties the cart.

## Features

- Responsive design for desktop and mobile
- Accessible navigation and controls (keyboard and screen reader friendly)
- Fast client-side filtering and sorting
- Persistent cart using localStorage
- Toast notifications for cart actions
- Modular code for easy maintenance

## Technologies Used

- HTML5 & CSS3 (Flexbox, Grid, custom properties)
- Vanilla JavaScript (no frameworks required)
- [Fake Store API](https://fakestoreapi.com/) for product data

## Accessibility

- All interactive elements have ARIA labels and keyboard support
- Color contrast and font sizes optimized for readability
- Focus styles for navigation and buttons

## Customization & Extending

- Add new product categories or filters by updating the API or UI
- Change the theme by editing `common.css`
- Add user authentication or checkout flow for a more complete store
- Integrate with a real backend or payment provider

## Future Improvements

- Add product reviews and ratings
- Implement pagination or infinite scroll
- Add user accounts and order history
- Improve error handling and offline support

## Styling

- `common.css` provides shared styles for navigation, buttons, layout, and dark theme.
- Each page has its own CSS for specific layouts and components.

## How It Works

- All data is fetched from the Fake Store API.
- Cart data is stored in the browser's localStorage, so it persists across page reloads.
- All interactions (search, sort, add/remove cart items) are handled client-side with JavaScript.

## Getting Started

Just open `index.html` in your browser. No build steps or server required.

---

Enjoy exploring ShopSmart! If you want to customize or extend it, all code is clean and well-organized for easy editing.

## Credits

- Product data from [Fake Store API](https://fakestoreapi.com/)
- UI inspired by modern e-commerce best practices
