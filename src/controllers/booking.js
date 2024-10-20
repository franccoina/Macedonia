// Import our custom CSS
import "../scss/booking.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

//------------------- Validar si el usuario existe, si no, redirigir al login -------------------

(function () {
    let userOnline = localStorage.getItem("userOnline");
    if (userOnline == null) {
        window.location.href = "./admi.html";
    } else {
        console.log(JSON.parse(userOnline));
    }
})();

//------------------- Botón Logout para salir -------------------

let btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userOnline");
    window.location.href = "./admi.html";
});

//------------------- Variables y elementos DOM -------------------

const url = "http://localhost:3000/users";
const tbodyRestaurants = document.querySelector(".restaurants-table");
const tbodyReservations = document.querySelector(".reservations-table");

const profileBtn = document.querySelector(".profileBtn");

let cacheId = undefined;

//------------------- Renderizar tabla con restaurantes -------------------

async function index() {
    console.log("Llamando a la función index()");
    const response = await fetch(url);
    const data = await response.json();
    
    let userOnline = JSON.parse(localStorage.getItem("userOnline"));
    
    profileBtn.innerHTML = "";
    tbodyRestaurants.innerHTML = "";

    data.forEach((user) => {
        if (userOnline.id === user.id) {
            //--------------------------- Lógica para ver mi profile avatar ---------------------------
            profileBtn.innerHTML = `
                <div class="profile-header">
                <button class="avatar  btn btn-light">
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
                    <td>${element.id}</td>
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
                        <img src=${element.image1} class="rounded m-1" width="30px" alt="restaurant-img" /><br>
                        <img src=${element.image2} class="rounded m-1" width="30px" alt="restaurant-img" /><br>
                        <img src=${element.image3} class="rounded m-1" width="30px" alt="restaurant-img" /><br>
                        <img src=${element.image4} class="rounded m-1" width="30px" alt="restaurant-img" />
                    </td>
                    <td>${element.keyWords}</td>
                    <td>
                        <a href="${element.socialMedia1}" class="d-flex gap-1 btn btn-outline-dark" target="_blank">
                            1 <i class="bi bi-globe"></i>
                        </a><br>
                        <a href="${element.socialMedia1}" class="d-flex gap-1 btn btn-outline-dark" target="_blank">
                            2 <i class="bi bi-globe"></i>
                        </a><br>
                        <a href="${element.socialMedia1}" class="d-flex gap-1 btn btn-outline-dark" target="_blank">
                            3 <i class="bi bi-globe"></i>
                        </a>
                    </td>
                    <td>
                        <button type="button" data-id=${element.id} class="btn btn-dark">
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
        if (userOnline.id === user.id) {
            user.restaurants.forEach((restaurant) => {
                if (restaurantId == undefined || restaurantId === restaurant.id) {
                    restaurant.reservations.forEach((element) => {
                        tbodyReservations.innerHTML += `
                            <td>${element.restaurant}</td>
                            <td>${element.cliente}</td>
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
    if (event.target.classList.contains('btn-dark')) {
        cacheId = event.target.dataset.id;
        await indexReservations(cacheId);
    }
});

//--------------------------- Función para ver mi profile avatar ---------------------------

async function renderProfile() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    profileBtn.innerHTML = "";

    data.forEach((user) => {
        profileBtn.innerHTML = `
            <div class="profile-header">
                <button class="avatar  btn btn-light">
                ${user.name.charAt(0)}${user.lastName.charAt(0)}
                </button>
                <div>
                    <h1 class="profile-name">${user.name} ${user.lastName}</h1>
                    <p class="profile-username">@${user.username} · ${user.restaurants.length} places</p>
                </div>
            </div>
            `;
    });
}


//------------------- Llamar a las funciones principales al cargar la página -------------------

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await index(); // Llama a la función index para cargar los restaurantes
        await indexReservations(cacheId);
        await renderProfile();
    } catch (error) {
        console.error("Error al cargar la página:", error);
    }
});


