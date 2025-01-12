window.onload = function () {
  //version 1  
  
  // Retrieve product details from localStorage
    const productDetails = JSON.parse(localStorage.getItem("oneItem"));
  
    if (productDetails) {
      // Populate the product details on the page
      document.querySelector("#product-title").innerText = productDetails.title;
      document.querySelector("#product-description").innerText = productDetails.description;
      document.querySelector("#product-price").innerText = `$${productDetails.price}`;
  
      // Populate the carousel with images
      const carouselInner = document.querySelector(".carousel-inner");
      productDetails.images.forEach((image, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) carouselItem.classList.add("active"); // Mark the first item as active
  
        carouselItem.innerHTML = `
          <img class="d-block w-100" src="${image}" alt="Product image ${index + 1}">
        `;
        carouselInner.appendChild(carouselItem);
      });
  
      // Additional product details section
      const additionalInfoContainer = document.createElement("div");
      additionalInfoContainer.classList.add("mt-5");
  
      additionalInfoContainer.innerHTML = `
        <h2 class="text-2xl font-semibold mb-4">Product Details</h2>
        <ul class="list-disc list-inside">
          <li id="rating-container" style="display: flex; gap: 2px;" >Rating : ${productDetails.rating}</li>
          <li><strong>Weight:</strong> ${productDetails.weight}</li>
          <li><strong>Dimensions:</strong> ${productDetails.dimensions.width} x ${productDetails.dimensions.height} x ${productDetails.dimensions.depth}</li>
          <li><strong>Warranty Information:</strong> ${productDetails.warrantyInformation}</li>
          <li><strong>Shipping Information:</strong> ${productDetails.shippingInformation}</li>
          <li><strong>Availability:</strong> ${productDetails.availabilityStatus}</li>
          <li><strong>Return Policy:</strong> ${productDetails.returnPolicy}</li>
        </ul>
      `;
      
      
      //generate stars
      function renderStarWithHorizontalFill(percentage) {
        const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
    
        // Create the SVG dynamically for a single star
        return `
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <!-- Define background -->
            <defs>
              <clipPath id="clip-${percentage}">
                <rect x="0" y="0" width="${clampedPercentage}%" height="100%"></rect>
              </clipPath>
            </defs>
            <!-- Full star background -->
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#ddd" />
            <!-- Colored fill star -->
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="yellow" clip-path="url(#clip-${percentage})" />
          </svg>
        `;
      }
    
      function renderRatingStars(rating) {
        const totalStars = 5; // Maximum stars
        const fullStars = Math.floor(rating); // Number of fully filled stars
        const partialFill = (rating - fullStars) * 100; // Percentage of the partially filled star
        const container = document.getElementById('rating-container');
        // container.innerHTML = ''; // Clear the container
    
        // Add full stars
        for (let i = 0; i < fullStars; i++) {
          container.innerHTML += renderStarWithHorizontalFill(100); // Fully filled
        }
    
        // Add a partially filled star if needed
        if (partialFill > 0) {
          container.innerHTML += renderStarWithHorizontalFill(partialFill);
        }
    
        // Add empty stars for the remaining
        for (let i = fullStars + (partialFill > 0 ? 1 : 0); i < totalStars; i++) {
          container.innerHTML += renderStarWithHorizontalFill(0); // Empty
        }
      }
      
  
      // Reviews section
      const reviewsContainer = document.createElement("div");
      reviewsContainer.classList.add("mt-10");
  
      if (productDetails.reviews && productDetails.reviews.length > 0) {
        const reviewsHtml = productDetails.reviews
          .map(
            (review) => `
          <div class="border-b border-gray-600 py-4">
            <p><strong>${review.reviewerName}:</strong> ${review.comment}</p>
            <p class="text-sm text-gray-400">Rating: ${review.rating}/5</p>
          </div>
        `
          )
          .join("");
  
        reviewsContainer.innerHTML = `
          <h2 class="text-2xl font-semibold mb-4">Reviews</h2>
          <div>${reviewsHtml}</div>
        `;
      } else {
        reviewsContainer.innerHTML = `
          <h2 class="text-2xl font-semibold mb-4">Reviews</h2>
          <p class="text-gray-400">No reviews available for this product.</p>
        `;
      }
  
      // Append additional info and reviews to the page
      const productDetailsSection = document.querySelector(".flex-1:last-child");
      productDetailsSection.appendChild(additionalInfoContainer);
      productDetailsSection.appendChild(reviewsContainer);
      renderRatingStars(productDetails.rating);
  
      // Add event listeners for Buy Now and Add to Cart buttons
      const buyNowButton = document.querySelector("#buyNow");
      const addToCartButton = document.querySelector("#add2cart");
  
      buyNowButton.addEventListener("click", () => {
        // Get existing cart data from localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
      
        // Check if the product already exists in the cart
        const existingProductIndex = cart.findIndex((item) => item.id === productDetails.id);
      
        if (existingProductIndex === -1) {
          // If the product is not in the cart, add it with an initial count of 1
          productDetails.images = productDetails.images[0];
          cart.push({ ...productDetails, count: 1 });
      
          // Save the updated cart to localStorage
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      
        // Redirect to the cart page
        window.location.href = "/cart.html";
      });
  
      addToCartButton.addEventListener("click", () => {
        // Get existing cart data from localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
        // Check if the product already exists in the cart
        const existingProductIndex = cart.findIndex((item) => item.id === productDetails.id);
  
        if (existingProductIndex >= 0) {
          // Increment count if already in cart
          cart[existingProductIndex].count += 1;
        } else {
          // Add the product to the cart
          productDetails.images = productDetails.images[0];
          cart.push({ ...productDetails, count: 1 });
        }
  
        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
  
        // Optionally show a confirmation message
        showMessage("Product added to the cart successfully!");
      });
    } else {
      console.error("No product details found in localStorage.");
      // Optionally display a message or redirect back to the products page
      document.body.innerHTML = `
        <div class="text-center text-white mt-20">
          <h1 class="text-3xl font-bold">Product not found</h1>
          <p class="text-lg mt-4">Please return to the <a href="/" class="text-blue-500">Products Page</a>.</p>
        </div>
      `;
    }
  };



  function showMessage(msg){
    let bod = document.body;
  
    let box = document.createElement("div");
    box.classList.add("fixed");
    box.classList.add("top-16");
    box.classList.add("right-4");
    box.classList.add("z-60");
  
    box.innerHTML=`
      <div class="rounded-xl w-72 shadow-md bg-black p-10">
        ${msg}
      </div>
    `;
  
    bod.appendChild(box);
  
    setTimeout(() => {
      bod.removeChild(box);
    }, 2000);
  }
  