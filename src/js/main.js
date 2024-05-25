// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

let nav = document.getElementById("navbarBtn");
nav.addEventListener("click", () => {
  console.log("entrando");
  document.body.classList.toggle("open");
});