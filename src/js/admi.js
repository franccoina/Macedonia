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


//funcion para el login

(function () {
    let userOnline = localStorage.getItem("userOnline");
    if (userOnline != null) {
        window.location.href = "./create.html";
    }
})();

//llamar al formulario

let form = document.querySelector("form");

//llamar a los campos del formulario

let username = document.querySelector("#username");
let password = document.querySelector("#password");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    let user = await checkUsername(username);
    if (user === false) {
        alert("El usuario no existe");
    } else if (user.password === password.value) {
        alert("Bienvenido");
        localStorage.setItem("userOnline", JSON.stringify(user));
        window.location.href = "./create.html";
    } else {
        alert("La contraseña no es correcta");
    }
});

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

//funcion para ver a julian

async function ip(){
    let response = await fetch("http://localhost:3000/users");
    let data = await response.json();
    console.log(data[0].restaurantes[0].reservas);
}

await ip()

