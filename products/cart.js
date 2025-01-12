window.onload = function () {
    // Fetch cart data from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector("#cart-items");
    const totalPriceElement = document.querySelector("#total-price");
  
    // Render cart items
    function renderCart() {
      cartContainer.innerHTML = ""; // Clear existing content
  
      if (cartItems.length === 0) {
        cartContainer.innerHTML = `<p class="text-center text-gray-400">Your cart is empty. Please add some products.</p>`;
        totalPriceElement.textContent = ""; // Clear total price
        return;
      }
  
      let totalPrice = 0;
  
      cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.count;
        totalPrice += itemTotal;
  
        const cartItem = document.createElement("div");
        cartItem.classList.add("flex", "items-center", "gap-5", "border-b", "pb-4", "border-gray-600");
  
        cartItem.innerHTML = `
          <div class="w-20">
            <img src="${item.images}" alt="${item.title}" class="rounded-xl border-2 border-[#bcc7db] w-full" />
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-semibold">${item.title}</h2>
            <p class="text-[#99bcf6] font-bold">$${item.price}</p>
            <p class="text-sm text-gray-400">Subtotal: $${itemTotal.toFixed(2)}</p>
          </div>
          <div class="flex items-center gap-3">
            <button class="decrease-count bg-[#99bcf6] text-black px-3 py-2 rounded">-</button>
            <span class="count font-bold">${item.count}</span>
            <button class="increase-count bg-[#99bcf6] text-black px-3 py-2 rounded">+</button>
          </div>
          <button class="remove-item text-red-500 font-bold">Remove</button>
          <button class="buy-item bg-green-500 text-white px-5 hover:scale-95 duration-300 py-2 rounded-full">Buy</button>
        `;
  
        // Add event listeners for increase, decrease, remove, and buy
        cartItem.querySelector(".decrease-count").addEventListener("click", () => updateCount(index, -1));
        cartItem.querySelector(".increase-count").addEventListener("click", () => updateCount(index, 1));
        cartItem.querySelector(".remove-item").addEventListener("click", () => removeItem(index));
        cartItem.querySelector(".buy-item").addEventListener("click", () => buyItem(index));
  
        cartContainer.appendChild(cartItem);
      });
  
      // Update total price and add Checkout button
      totalPriceElement.innerHTML = `
        <div class="flex justify-between items-center">
          <span>Total Price: $${totalPrice.toFixed(2)}</span>
           
            <button id="checkout-btn" class="bg-[#99bcf6] hover:bg-[#bbceef] rounded-full  ml-5 py-[0.55rem] px-3 font-bold duration-200 text-white">Checkout</button>

           
        
        </div>
      `;
  
      // Add event listener to the Checkout button
      document.querySelector("#checkout-btn").addEventListener("click", checkout);
    }
  
    // Update count for an item
    function updateCount(index, delta) {
      cartItems[index].count += delta;
  
      if (cartItems[index].count <= 0) {
        cartItems.splice(index, 1); // Remove item if count becomes zero
      }
  
      // If no items remain, display empty cart message
      if (cartItems.length === 0) {
        cartContainer.innerHTML = `<p class="text-center text-gray-400">Your cart is empty. Please add some products.</p>`;
        totalPriceElement.textContent = ""; // Clear total price
        localStorage.setItem("cart", JSON.stringify(cartItems));
        return;
      }
  
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    }
  
    // Remove an item from the cart
    function removeItem(index) {
      cartItems.splice(index, 1);
  
      // If no items remain, display empty cart message
      if (cartItems.length === 0) {
        cartContainer.innerHTML = `<p class="text-center text-gray-400">Your cart is empty. Please add some products.</p>`;
        totalPriceElement.textContent = ""; // Clear total price
        localStorage.setItem("cart", JSON.stringify(cartItems));
        return;
      }
  
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    }
  
    // Buy an individual item
    function buyItem(index) {
      alert(`Thank you for buying ${cartItems[index].title}!`);
      cartItems.splice(index, 1); // Remove item from cart after purchase
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    }
  
    // Checkout all items
    function checkout() {
      if (cartItems.length === 0) {
        alert("Your cart is empty. Please add some products before checking out.");
        return;
      }
      alert("Thank you for your purchase!");
      cartItems.length = 0; // Clear all items in the cart
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    }
  
    renderCart();
  };
  