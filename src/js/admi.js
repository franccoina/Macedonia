// Import our custom CSS
import '../scss/admi.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//navbar menu

let nav = document.getElementById("navbarBtn");
nav.addEventListener("click", () => {
  console.log("entrando");
  document.body.classList.toggle("open");
});

(function () {
    let userOnline = localStorage.getItem("userOnline");
    if (userOnline != null) {
        window.location.href = "./src/pages/dashboard.html";
    }
})();

//llamar al formulario

let form = document.querySelector("form");

//llamar a los campos del formulario

let username = document.querySelector("#user");
let password = document.querySelector("#password");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    let user = await checkEmail(email);
    if (user === false) {
        alert("El email no existe");
    } else {
        if (user.password === password.value) {
            alert("Bienvenido");
            localStorage.setItem("userOnline", JSON.stringify(user));
            window.location.href = "./src/pages/dashboard.html";
        } else {
            alert("La contraseña no es correcta");
        }
    }
});

async function checkEmail(email) {
    //traemos a todos los usuarios que tengan el email que se ingreso
    let response = await fetch(
        `http://localhost:3000/users?email=${email.value}`
    );
    let datos = await response.json();

    //verificamos que el email no este regitrado
    if (datos.length === 1) {
        return datos[0];
    } else {
        return false;
    }
}


