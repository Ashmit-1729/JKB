let allProducts = [];

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

function renderItems() {
  let itemBox = document.querySelector("#item-box");

  itemBox.innerHTML = "";
  allProducts.forEach((item) => {
    let newItem = document.createElement("div");
    newItem.innerHTML = `
              <div
              class="prod-card pointer cursor-pointer w-[300px] rounded-xl shadow-lg hover:shadow-2xl duration-300 flex-col items-center border-4 border-[#50e3c2]"
              id=${item.id}
            >
              <div class="rounded-lg m-5">
                <img
                  src=${item.thumbnail}
                  alt=" "
                  class="rounded-xl  min-h-[258px] min-w-[258px] "
                  loading="lazy"
                />
              </div>
      
              <div class="h-[100px] m-5">
                <div class="text-ellipsis overflow-hidden whitespace-nowrap">
                 ${item.title}
                </div>
                <div class="font-bold mt-2">$${item.price}</div>
      
                <div class="flex w-full justify-evenly mt-2 button-cont after-cont">
                  
                    <button
                      class="order-now bg-[#50e3c2] hover:bg-[#50f3c2] rounded-full py-[0.55rem] px-3 font-bold duration-200 glow-btn"
                    >
                      Order Now
                    </button>
                  
                </div>
              </div>
            </div>
              `;
    itemBox.appendChild(newItem);
  });
}

function updateCartCount(count){
  let cartCount = document.querySelector("#cart-count");
  if(count)
  {
    cartCount.innerText++;
  }
  else{
    cartCount.innerText--;
  }
}

function applyCartEvent() {
  
  let itemBox = document.querySelector("#item-box");
  itemBox.addEventListener("click", (event) => {
    
    
    if (event.target.closest(".button-cont")) {
      event.preventDefault();
      const buttonContainer = event.target.closest(".button-cont");
      if (buttonContainer) {
        buttonContainer.classList.remove("button-cont");
        updateCartCount(1);
      }
      event.target.innerHTML = `
         <div class="flex justify-between gap-2 incdc-box">
          <button  class="dc bg-white rounded-lg hover:bg-slate-200 duration-300 font-bold text-[#50e3c2] border border-[#50e3c2] px-2 ">
            -
          </button>

          <div class="val">
            1
          </div>

          <button class="bg-white rounded-lg  hover:bg-slate-200 duration-300 font-bold  text-[#50e3c2] border border-[#50e3c2]  px-2 inc">
            +
          </button>
        </div>
      </div>
        `;
    }

   
  });
}

const overlay = document.getElementById('overlay')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})
function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

function applyProductEvent(){
  let itemBox = document.querySelector("#item-box");
  itemBox.addEventListener("click",(event)=>{
    
    if(event.target.closest(".prod-card") && !event.target.closest(".button-cont")  && !event.target.closest(".incdc-box")){
      console.log(allProducts[event.target.closest(".prod-card").id - 1]);
      let modal = document.querySelector("#modal");
      modal.querySelector(".product-image").src = "../Bill/images/burger.png";
      let product = allProducts[event.target.closest(".prod-card").id - 1];
      modal.querySelector(".product-name").innerText = product.title;
      modal.querySelector(".product-price").innerText = `$${product.price}`;
      modal.querySelector(".product-image").src = product.thumbnail;
      modal.querySelector(".product-descp").innerText = product.description;

      openModal(modal)

    }
  })

}

function addBtn() {
  let itemBox = document.querySelector("#item-box");

  itemBox.addEventListener("click", (event) => {
    event.stopPropagation();
    if (event.target.closest(".inc") || event.target.closest(".dc")) {
      let incBox = event.target.closest(".incdc-box");
      let val = incBox.querySelector(".val");
      if(event.target.innerText == "+")
      {val.innerText++;
        updateCartCount(1);
      }
      else
      {
        let count = val.innerText;
        if(count==1)
        {
          let btnCont = event.target.closest(".after-cont")
          btnCont.classList.add("button-cont");
          btnCont.innerHTML = `
           <button
                      class="order-now bg-[#50e3c2] hover:bg-[#50f3c2] rounded-full py-[0.55rem] px-3 font-bold duration-200 glow-btn"
                    >
                      Order Now
                    </button>
          `
        }
        else{
          val.innerText--;
        }
        updateCartCount(0);
      }
    }
  });
}

function subBtn() {}

window.onload = getResult().then((products) => {
  allProducts = products;
  renderItems();
  applyProductEvent();
  applyCartEvent();
  addBtn();

  document.getElementById("cart-button").addEventListener("click",()=>{
    window.location.href = "/cart";
});

});
