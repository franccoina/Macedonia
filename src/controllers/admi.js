// Import our custom CSS
import '../scss/admi.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Import toastr
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

// Endpoint's Domain
import { url } from './routes';

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

//------------------------ Función para el login ------------------------

(function () {
    let userOnline = localStorage.getItem("userOnline");
    if (userOnline != null) {
        window.location.href = "./create.html";
    }
})();

//llamar al formulario y sus campos
let form = document.querySelector("form");

let username = document.querySelector("#username");
let password = document.querySelector("#password");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    let user = await checkUsername(username);

    // Se da mensaje de alerta al usuario sobre inicio de sesión.
    // Se procura ser vago en la razón por la que no se pudo iniciar
    // para no dar pistas a hackers o intrusos.
    if (user.password === password.value) {
        console.log("Log in was successful. Welcome!");
        toastr.success("Log in was successful. Welcome!");
        localStorage.setItem("userOnline", JSON.stringify(user.id));

        setTimeout(() => {
            window.location.href = "./create.html";
        }, 2000);
    } else {
        toastr.error(`Couldn't log in. Incorrect username or password.`);
    }
});

//------------------------ Función para checkear existencia del usuario ------------------------
async function checkUsername(username) {
    //traemos a todos los usuarios que tengan el username que se ingreso
    let response = await fetch(
        `${url}?username=${username.value}`
    );
    let datos = await response.json();

    //verificamos que el username no este registrado
    if (datos.length === 1) {
        return datos[0];
    } else {
        return false;
    }
}

