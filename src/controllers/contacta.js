// Import our custom CSS
import '../scss/contacta.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//------------------------ Funciones del Navbar para open y click ------------------------

let navbarBtn = document.getElementById("navbarBtn");
navbarBtn.addEventListener("click", () => {
  console.log("Abriendo el menú de navegación.");
  document.body.classList.toggle("open");
});

let navbarLinks = document.querySelectorAll(".navbarLink");

navbarLinks.forEach(navbarLink => {
  navbarLink.addEventListener("click", () => {
    console.log("Entrando a link seleccionado.");
    document.body.classList.toggle("open");
  });
});
