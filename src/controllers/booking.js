// Import our custom CSS
import "../scss/booking.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Endpoint's Domain
import { url } from './routes';

//------------------- Validar si el usuario existe, si no, redirigir al login -------------------

(function () {
    let userOnline = localStorage.getItem("userOnline");
    if (userOnline == null) {
        window.location.href = "./admi.html";
    } else {
        console.log(userOnline);
    }
})();

//------------------- Botón Logout para salir -------------------

let btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userOnline");
    toastr.info("Log out was succesful.");

    setTimeout(() => {
        window.location.href = "./admi.html"
    }, 2000);
});

//------------------- Variables y elementos DOM -------------------

const tbodyRestaurants = document.querySelector(".restaurants-table");
const tbodyReservations = document.querySelector(".reservations-table");

const profileBtn = document.querySelector(".profileBtn");

let cacheId;

//------------------- Renderizar tabla con restaurantes -------------------

async function index() {
    console.log("Calling index() function.");
    const response = await fetch(url);
    const data = await response.json();
    
    let userOnline = JSON.parse(localStorage.getItem("userOnline"));
    
    profileBtn.innerHTML = "";
    tbodyRestaurants.innerHTML = "";

    data.forEach((user) => {
        if (userOnline === user.id) {
            //--------------------------- Lógica para ver mi profile avatar ---------------------------
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

            //--------------------------- Lógica para ver las reservas de cada restaurante ------------
            user.restaurants.forEach((element) => {
                tbodyRestaurants.innerHTML += `
                    <td>${element.name}</td>
                    <td>
                        <video src="${element.vid}"
                        autoplay="true"
                        loop="true"
                        width="50px"
                        muted alt="video-restaurant"
                        class="rounded"></video>
                    </td>
                    <td>${element.city}</td>
                    <td>${element.address}</td>
                    <td class="h-100">
                    <div class="h-100 d-flex">
                        <div>
                        <img src=${element.image1} class="rounded m-1" width="30px" alt="restaurant-img-1" /><br>
                            <img src=${element.image2} class="rounded m-1" width="30px" alt="restaurant-img-2" />
                        </div>
                            <br>
                        <div>
                            <img src=${element.image3} class="rounded m-1" width="30px" alt="restaurant-img-3" /><br>
                            <img src=${element.image4} class="rounded m-1" width="30px" alt="restaurant-img-4" />
                        </div>
                    </div>
                    </td>
                    <td>${element.keyWords}</td>
                    <td class="text-center">
                    <div class="d-flex justify-content-around gap-2">
                        <a href="${element.socialContact}" class="text-dark restaurant-media social-contact" target="_blank">
                            <i class="bi bi-telephone"></i>
                        </a>
                        <a href="${element.socialMedia}" class="text-dark restaurant-media social-media" target="_blank">
                            <i class="bi bi-chat-dots"></i>
                        </a>
                        <a href="${element.socialDelivery}" class="text-dark restaurant-media social-delivery" target="_blank">
                            <i class="bi bi-truck"></i>
                        </a>
                        </div>
                    </td>
                    <td>
                        <button type="button" data-id=${element.id} class="btn btn-light toBooked">
                            ${element.reservations.length}
                        </button>
                    </td>
                `;
            });
        }
    });
}

//------------------- Renderizar tabla con reservas -------------------

async function indexReservations(restaurantId) {
    const response = await fetch(url);
    const data = await response.json();

    let userOnline = JSON.parse(localStorage.getItem("userOnline"));
    tbodyReservations.innerHTML = "";

    data.forEach((user) => {
        if (userOnline === user.id) {
            user.restaurants.forEach((restaurant) => {
                if (restaurantId == undefined || restaurantId === restaurant.id) {
                    restaurant.reservations.forEach((element) => {
                        tbodyReservations.innerHTML += `
                            <td>${element.restaurant}</td>
                            <td>${element.cliente}</td>
                            <td>${element.email}</td>
                            <td>${element.fecha}</td>
                        `;
                    });
                }
            });
        }
    });
}

//------------------- Evento para manejar clicks en la tabla de restaurantes -------------------

tbodyRestaurants.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-light')) {
        cacheId = event.target.dataset.id;
        await indexReservations(cacheId);
    }
});

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
                    <button class="avatar  btn btn-outline-light">
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


//------------------- Llamar a las funciones principales al cargar la página -------------------

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Llamadas asincrónicas para cargar la página
        await index();
        await indexReservations(cacheId);
        await renderProfile();

        // Seleccionamos todos los botones que deben hacer el desplazamiento
        const buttons = document.querySelectorAll('.toBooked');

        // Añadimos un event listener a cada uno de esos botones
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Usamos scrollIntoView para desplazar a la sección 'booked'
                document.getElementById('booked').scrollIntoView({
                    behavior: 'smooth' 
                });
            });
        });

    } catch (error) {
        console.error("Error al cargar la página:", error);
    }
});
