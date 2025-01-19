// Dummy cart data
const cart = [
    { id: 1, name: "Burger", price: 10.99, quantity: 1, image: "images/burger.png" },
    { id: 2, name: "Pizza", price: 15.49, quantity: 1, image: "images/pizza.png" },
];

// DOM Elements
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

// Render Cart Items
function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add(
            "flex",
            "items-center",
            "justify-between",
            "bg-white",
            "shadow-lg",
            "p-4",
            "rounded-lg"
        );
        cartItem.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 rounded-lg" />
                <div>
                    <h3 class="text-lg font-bold">${item.name}</h3>
                    <p class="text-gray-500">$${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <button 
                        class="px-2 bg-gray-200 rounded hover:bg-gray-300"
                        onclick="updateQuantity(event, ${item.id}, -1)"
                    >
                        -
                    </button>
                    <span>${item.quantity}</span>
                    <button 
                        class="px-2 bg-gray-200 rounded hover:bg-gray-300"
                        onclick="updateQuantity(event, ${item.id}, 1)"
                    >
                        +
                    </button>
                </div>
                <button 
                    class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    onclick="removeFromCart(event, ${item.id})"
                >
                    &times;
                </button>
            </div>
        `;

        // Attach click event for opening product details on the entire item except buttons
        cartItem.addEventListener("click", () => openProductDetails(item.id));
        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Remove Item from Cart
function removeFromCart(event, id) {
    event.stopPropagation(); // Prevent event propagation
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
        renderCart();
    }
}

// Update Item Quantity
function updateQuantity(event, id, change) {
    event.stopPropagation(); // Prevent event propagation
    const item = cart.find((item) => item.id === id);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        renderCart();
    }
}

// Open Product Details
function openProductDetails(id) {
    window.location.href = `products.html?id=${id}`;
}

// Initial Render
renderCart();
