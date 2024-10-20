// Import our custom CSS
import '../scss/admi.scss'

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

//------------------------ Función para el login ------------------------

(function () {
    let userOnline = localStorage.getItem("userOnline");
    if (userOnline != null) {
        window.location.href = "/create";
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
        console.log("Bienvenido, Usuario.");
        localStorage.setItem("userOnline", JSON.stringify(user));
        window.location.href = "/create";
    } else {
        alert("No fue posible iniciar sesión. Usuario o contraseña incorrectos.");
    }
});

//------------------------ Función para checkear existencia del usuario ------------------------
async function checkUsername(username) {
    //traemos a todos los usuarios que tengan el username que se ingreso
    let response = await fetch(
        `http://localhost:3000/users?username=${username.value}`
    );
    let datos = await response.json();

    //verificamos que el username no este registrado
    if (datos.length === 1) {
        return datos[0];
    } else {
        return false;
    }
}

