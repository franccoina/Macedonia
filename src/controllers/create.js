// Import our custom CSS
import '../scss/create.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

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
    localStorage.removeItem("userOnline")
    window.location.href = "./admi.html"
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
const socialMedia1 = document.querySelector(".form-social-media1")
const socialMedia2 = document.querySelector(".form-social-media2")
const socialMedia3 = document.querySelector(".form-social-media3")
const keyWords = document.querySelector(".form-key-word")

const form = document.querySelector("form")

const profileBtn = document.querySelector(".profileBtn");

//variables necesarias para agregar a la base de datos

let idCache

//--------------------------- addEventeListener para boton de agregar ---------------------------

form.addEventListener('submit', async (event) => {
    //ACA DEBEMOS LLAMAR A LA FUNCION QUE SE ENCARGA DE GUARDAR
    event.preventDefault()
    if (idCache === undefined) {
        //Capturamos los datos de los inputs y del userOnline en variables para la funcion create
        let newRestaurant = {
            id: "",
            name: name.value,
            description: description.value,
            vid: vid.value,
            city: city.value,
            address: address.value,
            menu: menu.value,
            image1: image1.value,
            image2: image2.value,
            image3: image3.value,
            image4: image4.value,
            socialMedia1: socialMedia1.value,
            socialMedia2: socialMedia2.value,
            socialMedia3: socialMedia3.value,
            keyWords: keyWords.value.toLowerCase(),
            reservations: []
        };

        let userOnline = localStorage.getItem('userOnline')
        userOnline = JSON.parse(userOnline)

        await create(userOnline, newRestaurant)
        form.reset()
    }
})

//--------------------------- funcion create para agregar restaurante ---------------------------

async function create(userId, newRestaurant) {
    try {
        // Obtenemos el usuario por ID
        let response = await fetch(`${url}/${userId}`);
        if (!response.ok) throw new Error('User not found');

        let user = await response.json();

        // Agregamos el nuevo restaurante a la lista de negocios del usuario
        user.restaurants.push(newRestaurant);

        newRestaurant.id = Date.now().toString();

        // Enviamos una solicitud PUT para actualizar el usuario con su nueva info
        response = await fetch(`${url}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) throw new Error('Fallo en la actualización del usuario. No se pudo agregar nuevo restaurante.');

        console.log('Restaurante agregado con éxito.');
        alert('Restaurante agregado con éxito.');

        // Redirigir a la página de reservas
        window.location.href = "./booking.html";
    } catch (error) {
        console.error('Error:', error);
    }
}

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






