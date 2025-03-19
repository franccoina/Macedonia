// Import our custom CSS
import '../scss/edit.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Import toastr
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

// Endpoint's Domain
import { url } from './routes';

//--------------------------- validaciones del Login ---------------------------

//validamos si el usuario existe, si no existe redirigir al login
(function () {
    let userOnline = localStorage.getItem('userOnline')
    if (userOnline == null) {
        window.location.href = "./admi.html"
    }
})()

//--------------------------- boton Logout para salir ---------------------------

let btnLogout = document.getElementById("btnLogout")

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userOnline");
    toastr.info("Log out was successful.");

    setTimeout(() => {
        window.location.href = "./admi.html"
    }, 2000);
})

//--------------------------- FUNCIONES DE CRUD ---------------------------

//--------------------------- llamado de variables del form ---------------------------

const name = document.querySelector(".form-name")
const description = document.querySelector(".form-textarea")
const vid = document.querySelector(".form-vid")
const city = document.querySelector(".form-city")
const address = document.querySelector(".form-address")
const menu = document.querySelector(".form-menu")
const image1 = document.querySelector(".form-image1")
const image2 = document.querySelector(".form-image2")
const image3 = document.querySelector(".form-image3")
const image4 = document.querySelector(".form-image4")
const socialContact = document.querySelector(".form-social-contact")
const socialMedia = document.querySelector(".form-social-media")
const socialDelivery = document.querySelector(".form-social-delivery")
const keyWords = document.querySelector(".form-key-word")

const form = document.querySelector("form")

const profileBtn = document.querySelector(".profileBtn");

//variables necesarias para agregar a la base de datos

let idCache

//--------------------------- addEventeListener para boton de guardar actualización ---------------------------



//--------------------------- funcion edit para agregar restaurante ---------------------------



//--------------------------- Función para ver mi profile avatar ---------------------------

async function renderProfile() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    let userOnline = JSON.parse(localStorage.getItem("userOnline"));

    profileBtn.innerHTML = "";

    data.forEach((user) => {
        if (userOnline === user.id) {
            profileBtn.innerHTML = `
                <div class="profile-header">
                    <button class="avatar">
                    ${user.name.charAt(0)}${user.lastName.charAt(0)}
                    </button>
                    <div>
                        <h1 class="profile-name">${user.name} ${user.lastName}</h1>
                        <p class="profile-username">@${user.username} · ${user.restaurants.length} places</p>
                    </div>
                </div>
                `;
            }
        });
}

document.addEventListener('DOMContentLoaded', async () => {
    await renderProfile();
});
