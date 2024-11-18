import "../scss/restaurant.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Variables globales
const url = "http://localhost:3000/users";
const restaurantInfo = document.querySelector("#restaurant");

// Obtén los IDs desde localStorage
const restaurantId = localStorage.getItem("restaurantId");
const userId = localStorage.getItem("userId");

// ----------------------- Funciones del Navbar -----------------------

const navbarBtn = document.getElementById("navbarBtn");
if (navbarBtn) {
    navbarBtn.addEventListener("click", () => {
        console.log("Abriendo el menú de navegación.");
        document.body.classList.toggle("open");
    });
}

const navbarLinks = document.querySelectorAll(".navbarLink");
navbarLinks.forEach((navbarLink) => {
    navbarLink.addEventListener("click", () => {
        console.log("Entrando a link seleccionado.");
        document.body.classList.toggle("open");
    });
});

// ------------------------- addEventListeners -------------------------

document.addEventListener("DOMContentLoaded", async () => {
    if (userId && restaurantId) {
        try {
            await renderRestaurant(userId, restaurantId);
        } catch (error) {
            console.error("Error rendering restaurant:", error);
        }
    } else {
        console.error("No se encontraron IDs en localStorage.");
    }
});

// ------------------------- Funciones ---------------------------------

/**
 * Renderiza la información del restaurante en el DOM.
 */
async function renderRestaurant(userId, restaurantId) {
    if (!restaurantInfo) {
        console.error("No se encontró el contenedor del restaurante.");
        return;
    }

    restaurantInfo.innerHTML = "";

    try {
        const data = await fetchUserData();

        const user = data.find((user) => user.id === userId);
        if (!user) {
            console.error("Usuario no encontrado.");
            return;
        }

        const restaurant = user.restaurants.find(
            (restaurant) => restaurant.id === restaurantId
        );
        if (!restaurant) {
            console.error("Restaurante no encontrado.");
            return;
        }

        const modalId = `myModal-${userId}-${restaurantId}`;

        // Renderiza el HTML del restaurante
        restaurantInfo.innerHTML = `
        <!-- Page Restaurant -->
        <div class="header text-light">
            <h1>${restaurant.name}</h1>
            <div
                class="w-100 d-flex align-items-center justify-content-between">
                <p>${restaurant.city}</p>
                <div class="d-flex text-light align-items-center gap-2">
                    <i class="bi bi-heart"></i>
                    <strong>${restaurant.reservations.length}</strong>
                </div>
            </div>
        </div>
        <!-- Contenido principal -->
        <div class="main-container">

            <!-- Columna izquierda -->
            <div class="left-column">
                <section class="gallery">
                    <video src="${restaurant.vid}" autoplay loop muted></video>
                </section>

                <section class="gallery align-items-center justify-content-center w-100 d-flex gap-3 flex-column">
                    <div class="d-flex align-items-center justify-content-around w-100 gap-3">
                        <img src=${restaurant.image1} alt="Imagen 1">
                        <img src=${restaurant.image2} alt="Imagen 2">
                    </div>
                    <div class="d-flex align-items-center justify-content-around w-100 gap-3">
                        <img src=${restaurant.image3} alt="Imagen 1">
                        <img src=${restaurant.image4} alt="Imagen 2">
                    </div>
                </section>

                <section class="reviews">
                    <article class="button-container">
                        ${restaurant.reviews.map(
                            (review) =>
                                `<a href=${review.url} target="_blank">
                                    <div class="review-header">
                                        <button class="avatar btn btn-dark">@</button>
                                        <div>
                                            <h1 class="review-name">${review.autor}</h1>
                                            <p
                                                class="review-username">"${review.title}"</p>
                                        </div>
                                    </div>
                                </a>`
                        ).join("")}
                    </article>
                </section>

                <section>
                    <div class="w-100 text-end d-flex justify-content-end pt-2 gap-2">
                        <a class="border restaurant-media" href="${restaurant.socialMedia1}" target="_blank"><i class="bi bi-instagram"></i></a>
                        <a class="border restaurant-media" href="${restaurant.socialMedia2}" target="_blank"><i class="bi bi-facebook"></i></a>
                        <a class="border restaurant-media" href="${restaurant.socialMedia3}" target="_blank"><i class="bi bi-whatsapp"></i></a>
                    </div>
                </section>
            </div>

            <!-- Columna derecha -->
            <div class="right-column">
                <section class="restaurant-info">
                    <article class="button-container">
                        <iframe style="border-radius:10px" 
                            src="https://open.spotify.com/embed/track/6MRElrOE80xkeV2UkNqyL0?utm_source=generator&theme=0"
                            width="100%" height="112" 
                            frameBorder="0" allowfullscreen="" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
                        </iframe>

                        <a href=${restaurant.menu} target="_blank" class="infoBtn">
                            <div class="info-header gap-3">
                                <i class="bi bi-list text-dark"></i>
                                <div>
                                    <h1 class="info-name">Menu</h1>
                                    <p
                                        class="info-text">Go to ${restaurant.name}'s menu</p>
                                </div>
                            </div>
                        </a>

                        <div href="" class="infoBtn">
                            <div class="d-flex gap-3 mt-1">
                                <i class="bi bi-tag text-dark"></i>
                                <div>
                                    <div class="tags">
                                        ${restaurant.keyWords.split(",").map(
                                            (tag) =>
                                                `<p class="tag-text">#${tag.trim()}</p>`
                                        ).join("")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
                <section class="restaurant-info">
                    <p class="info-text">${restaurant.description}</p>
                </section>
                <button data-bs-toggle="modal" data-bs-target="#${modalId}" class="btn d-flex align-items-center justify-content-center gap-2 btn-dark w-100 reserveBtn">
                    <i class="bi bi-book"></i> Book a Table
                </button>
            </div>
        </div>

        <!-- Modal -->
        <article class="container d-flex justify-content-center w-100">
            <div class="w-100 modal fade" id="${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content container d-flex flex-column align-items-center text-start">
                <div>
                    <h3 class="modal-title">${restaurant.name}</h3>
                    <p class="modal-text">${restaurant.description}</p>
                </div>
                <div class="pt-4">
                    <h3 class="modal-title">Reservation ?</h3>
                    <p class="modal-text">To book a table at <strong>${restaurant.name}</strong>, please fill out the form below and discover more details.</p>
                    <br>
                    <form class="d-flex flex-column align-items-center" onsubmit="handleReservationSubmit(event)">
                    <input class="form-name" type="text" id="fullName-${modalId}" name="fullName" placeholder="Full name" required>
                    <input class="form-date" type="date" id="date-${modalId}" name="date" placeholder="Date" required>
                    <input class="form-hour" type="time" id="hour-${modalId}" name="hour" placeholder="Hour" required>
                    <textarea class="form-comment" id="comments-${modalId}" name="comments" rows="4" cols="50" placeholder="Comments"></textarea>
                    <div class="text-end w-100">
                        <button class="form-button w-50 btn border border-secondary mt-5 mb-4" type="submit"><i class="bi bi-arrow-right"> SEND</i></button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </article>
        `;
    } catch (error) {
        console.error("Error fetching restaurant data:", error);
    }
}

/**
 * Realiza la petición a la API y retorna los datos de los usuarios.
 */
async function fetchUserData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error obtaining data from server.");
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        return [];
    }
}