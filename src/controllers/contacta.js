// Import our custom CSS
import '../scss/contacta.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Import toastr
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

//------------------------ Funciones del Navbar para open y click ------------------------

let navbarBtn = document.getElementById("navbarBtn");
navbarBtn.addEventListener("click", () => {
  console.log("Opening navbar menu.");
  document.body.classList.toggle("open");
});

let navbarLinks = document.querySelectorAll(".navbarLink");

navbarLinks.forEach(navbarLink => {
  navbarLink.addEventListener("click", () => {
    console.log("Redirecting to selected link.");
    document.body.classList.toggle("open");
  });
});
