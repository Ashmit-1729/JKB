let allProducts = [];
let allCategories = [];
let requiredKeys = [
  "id",
  "title",
  "description",
  "price",
  "rating",
  "weight",
  "dimensions",
  "warrantyInformation",
  "shippingInformation",
  "availabilityStatus",
  "reviews",
  "returnPolicy",
  "images",
];

// async await
async function getResult() {
  try {
    //'https://dummyjson.com/products?limit=10&skip=10&select=title,price'
    const res = await fetch("https://dummyjson.com/products?limit=0&skip=0");
    const arr = await res.json();
    return arr.products;
  } catch {
    console.error("Error fetching products:", error);
    return null;
  }
}
async function getCategories() {
  try {
    //'https://dummyjson.com/products?limit=10&skip=10&select=title,price'
    const res = await fetch("https://dummyjson.com/products/categories");
    const arr = await res.json();
    allCategories = arr;
    let first = true;

    let filterLine = document.querySelector("#filter-line");
    allCategories.forEach((item) => {
      let newFilter = document.createElement("div");
      
      
      if(localStorage.getItem("currCat")!=null)
      {
        if(localStorage.getItem("currCat") == item.slug)
         { newFilter.innerHTML = `
        <button class="rounded-full bg-gray-600 px-5 py-3 text-ellipsis overflow-hidden whitespace-nowrap filter-btn border-filter" id=${item.slug}>
           ${item.name}
       </div>
       `;
         }
         else{
          newFilter.innerHTML = `
          <button class="rounded-full bg-gray-600 px-5 py-3 text-ellipsis overflow-hidden whitespace-nowrap filter-btn" id=${item.slug}>
             ${item.name}
         </div>
         `;
         }
       
      }
      else if(first==true)
      {
        newFilter.innerHTML = `
        <button class="rounded-full bg-gray-600 px-5 py-3 text-ellipsis overflow-hidden whitespace-nowrap filter-btn border-filter" id=${item.slug}>
           ${item.name}
       </div>
       `;
          first = false;
          localStorage.setItem("currCat",item.slug);
      }
      
      filterLine.appendChild(newFilter);
    });
    applyFilter(allCategories);
  } catch (error) {
    return null;
  }
}

function applyFilter() {
  let filterLine = document.querySelector("#filter-line");

  filterLine.addEventListener("click", function (event) {
    if (event.target.classList.contains("filter-btn")) {
      localStorage.setItem("currCat",event.target.id);
      let allButtons = filterLine.querySelectorAll(".filter-btn");
      allButtons.forEach((btn) => btn.classList.remove("border-filter"));
      event.target.classList.add("border-filter");
      renderItems(event.target.id);
    }
  });
}

function renderItems(selectedCategory) {
  let itemBox = document.querySelector("#item-box");
  console.log(selectedCategory);
  itemBox.innerHTML = "";
  allProducts.forEach((item) => {
    let newItem = document.createElement("div");
    if (item["category"] === selectedCategory) {
      newItem.innerHTML = `
            <div
            class="w-[300px] rounded-xl shadow-lg flex-col items-center border border-[#313c4c] bg-[#313c4c]"
            
          >
            <div class="rounded-lg m-5">
              <img
                src=${item.thumbnail}
                alt=" "
                class="rounded-xl border-4 border-[#bcc7db]"
              />
            </div>
    
            <div class="h-[100px] m-5">
              <div class="text-ellipsis overflow-hidden whitespace-nowrap">
               ${item.title}
              </div>
              <div class="font-bold mt-2">$${item.price}</div>
    
              <div class="flex w-full justify-evenly mt-2" id=${item.id}>
                
                  <button
                    class="buy-now bg-[#99bcf6] hover:bg-[#bbceef] rounded-full py-[0.55rem] px-3 font-bold duration-200 glow-btn"
                  >
                    Buy Now
                  </button>
                
                
                  <button
                    class="add2cart border-2 border-[#99bcf6] rounded-full px-3 py-[0.55rem] text-[#99bcf6] font-bold glow-btn"
                  >
                    Add to Cart
                  </button>
                
              </div>
            </div>
          </div>
            
            `;
      itemBox.appendChild(newItem);
    }
  });
}

function addEventBuyNow(allProducts) {
  let itemBox = document.querySelector("#item-box");
  itemBox.addEventListener("click", function (event) {
    if (event.target.classList.contains("buy-now")) {
      let newItem;
      let itemId = event.target.parentElement.id;

      allProducts.forEach((item) => {
        if (item.id == itemId) {
          newItem = {
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            rating: item.rating,
            weight: item.weight,
            dimensions: item.dimensions,
            warrantyInformation: item.warrantyInformation,
            shippingInformation: item.shippingInformation,
            availabilityStatus: item.availabilityStatus,
            reviews: item.reviews,
            returnPolicy: item.returnPolicy,
            images: item.images,
          };
        }
      });
      localStorage.setItem("oneItem", JSON.stringify(newItem));
      window.location.href = "product.html";
    }
  });
}

function isNewId(cartArr, newId) {
  return !cartArr.some((item) => item.id == newId);
}

function addEventAddToCart(allProducts) {
  let itemBox = document.querySelector("#item-box");
  itemBox.addEventListener("click", function (event) {
    if (event.target.classList.contains("add2cart")) {
      
      let itemId = event.target.parentElement.id;
      let carrArr = JSON.parse(localStorage.getItem("cart"));
      console.log("carrArr was",carrArr);



      if (carrArr!=null && (isNewId(carrArr,itemId) == false)) {
        console.log("inside if");
      
        carrArr.forEach((elem) => {
          if (elem.id == itemId) {
            showMessage(`Successfully Added ${elem.title} to your cart!`)
            elem.count = elem.count+1;
          }
        });
        localStorage.setItem("cart",JSON.stringify((carrArr)));
      }
      else{
        console.log("inside else");
        let newItem = [];
        if(carrArr!=null)
          newItem = carrArr;
        allProducts.forEach((item) => {
          if (item.id == itemId) {
            showMessage(`Successfully Added ${item.title} to your cart!`)
            newItem.push({
              id: item.id,
              title: item.title,
              price: item.price,
              shippingInformation: item.shippingInformation,
              returnPolicy: item.returnPolicy,
              images: item.thumbnail,
              count:1
            });
          }
        });

        localStorage.setItem("cart",JSON.stringify(newItem));
       
      }
    }
  });
}


// Fetch search results and render them
function fetchAndRenderProducts(query) {
  const itemBox = document.getElementById("item-box");
  itemBox.innerHTML = ""; // Clear previous results

  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.products && data.products.length > 0) {
        data.products.forEach((item) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");

          productCard.innerHTML = `
            <div
            class="w-[300px] rounded-xl shadow-lg flex-col items-center border border-[#313c4c] bg-[#313c4c]"
            
          >
            <div class="rounded-lg m-5">
              <img
                src=${item.thumbnail}
                alt=" "
                class="rounded-xl border-4 border-[#bcc7db]"
              />
            </div>
    
            <div class="h-[100px] m-5">
              <div class="text-ellipsis overflow-hidden whitespace-nowrap">
               ${item.title}
              </div>
              <div class="font-bold mt-2">$${item.price}</div>
    
              <div class="flex w-full justify-evenly mt-2" id=${item.id}>
                
                  <button
                    class="buy-now bg-[#99bcf6] hover:bg-[#bbceef] rounded-full py-[0.55rem] px-3 font-bold duration-200 glow-btn"
                  >
                    Buy Now
                  </button>
                
                
                  <button
                    class="add2cart border-2 border-[#99bcf6] rounded-full px-3 py-[0.55rem] text-[#99bcf6] font-bold glow-btn"
                  >
                    Add to Cart
                  </button>
                
              </div>
            </div>
          </div>
          `;

          itemBox.appendChild(productCard);
        });
      } else {
        itemBox.innerHTML = `<p class="text-center text-muted">No products found for "${query}".</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      itemBox.innerHTML = `<p class="text-danger">Something went wrong. Please try again later.</p>`;
    });
}

// Add event listener for search functionality
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    fetchAndRenderProducts(query);
  } else {
    alert("Please enter a search term!");
  }
});

document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = e.target.value.trim();
    if (query) {
      fetchAndRenderProducts(query);
    } else {
      alert("Please enter a search term!");
    }
  }
});

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




window.onload = getResult().then((products) => {
  allProducts = products;
  getCategories();
  if(localStorage.getItem("currCat")==null)
  renderItems("beauty");
  else
  renderItems(localStorage.getItem("currCat"));
  addEventBuyNow(allProducts);
  addEventAddToCart(allProducts);
});
