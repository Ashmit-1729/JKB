document.addEventListener('DOMContentLoaded', () => {
    // Elements for login popup
    let loginBtn = document.getElementById('login-btn');
    let popupLogin = document.getElementById('popup-login');
    if(document.querySelector("#order"))
    document.querySelector("#order").addEventListener("click",(e)=>{
      window.location.href = "/products";
    })
    // Elements for signup popup
    const signupBtn = document.getElementById('sign-btn');
    const popupSignup = document.getElementById('popup-signup');
  
    // Event listeners for login button
    
      loginBtn.addEventListener('click', () => {
          popupLogin.classList.add('flex');
          popupLogin.classList.remove('hidden');
        });
        
        // Event listeners for signup button
        if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        popupSignup.classList.remove('hidden');
        popupSignup.classList.add('flex');
      });
    }
  
    // Close buttons
    function closePopup(popup) {
      popup.classList.add('hidden');
      popup.classList.remove('flex');
    }
  
    const closeButtons = document.querySelectorAll('.close-popup');
    closeButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const popup = e.target.closest('.popup-login') || e.target.closest('.popup-signup');
        if (popup) closePopup(popup);
      });
    });
  });
  

