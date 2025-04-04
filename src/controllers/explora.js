import "../scss/explora.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Endpoint's Domain
import { url } from './routes';

//------------------- Variables y elementos DOM -------------------------
const search = document.querySelector("#search");
const restaurantList = document.querySelector("#restaurantList");

// ------------------------ Funciones del Navbar ------------------------

const navbarBtn = document.getElementById("navbarBtn");
if (navbarBtn) {
  navbarBtn.addEventListener("click", () => {
    console.log("Opening navbar menu.");
    document.body.classList.toggle("open");
  });
}

const navbarLinks = document.querySelectorAll(".navbarLink");
navbarLinks.forEach((navbarLink) => {
  navbarLink.addEventListener("click", () => {
    console.log("Redirecting to selected link.");
    document.body.classList.toggle("open");
  });
});

// ------------------------- Eventos de la página -------------------------

document.addEventListener("DOMContentLoaded", async () => {
  const searchWord = search?.value.trim().toLowerCase();
  if (!searchWord) {
    await index();
  }
});

search?.addEventListener("input", async () => {
  const searchWord = search.value.trim().toLowerCase();
  await research(searchWord);
});

restaurantList.addEventListener("click", (event) => {
  // Verifica si el clic ocurrió dentro de un enlace con los atributos data
  const restaurantElement = event.target.closest("a[data-user][data-id]");
  if (restaurantElement) {
    const userId = restaurantElement.dataset.user;
    const restaurantId = restaurantElement.dataset.id;

    if (userId && restaurantId) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("restaurantId", restaurantId);
      console.log(`Data was saved in localStorage: userId=${userId}, restaurantId=${restaurantId}`);
    } else {
      console.error("No results for the attributes data-user or data-id.");
    }
  }
});

// ------------------------- Funciones -------------------------

/**
 * Renderiza todos los restaurantes disponibles desde la API.
 */
async function index() {
  restaurantList.innerHTML = ""; // Limpia la lista de restaurantes
  const data = await fetchUserData();

  data.forEach((user) => {
    user.restaurants.forEach((restaurant) => {
      renderRestaurant(user.id, restaurant);
    });
  });
}

/**
 * Filtra los restaurantes basados en la palabra de búsqueda.
 */
async function research(searchWord) {
  restaurantList.innerHTML = ""; 
  const data = await fetchUserData();

  let hasResults = false;

  data.forEach((user) => {
    user.restaurants.forEach((restaurant) => {
      if (matchesSearch(restaurant, searchWord)) {
        renderRestaurant(user.id, restaurant);
        hasResults = true;
      }
    });
  });

  // Mostrar mensaje si no hay resultados
  if (!hasResults) {
    restaurantList.innerHTML = `
      <div class="img-restaurant">
        <p>No results found for "${searchWord}".</p>
      </div> 
    `;
  }
}

/**
 * Verifica si un restaurante coincide con la búsqueda.
 */
function matchesSearch(restaurant, searchWord) {
  const regex = new RegExp(searchWord, "i");
  return (
    regex.test(restaurant.keyWords) ||
    regex.test(restaurant.name) ||
    regex.test(restaurant.city)
  );
}

/**
 * Renderiza un restaurante en el DOM.
 */
function renderRestaurant(userId, restaurant) {
  restaurantList.innerHTML += `
    <a href="./restaurant.html" class="img-restaurant text-secondary" data-user="${userId}" data-id="${restaurant.id}">
      <section>
        <h4><strong>${restaurant.name}</strong></h4>
        <p>${restaurant.city}</p>
      </section>
      <video src="${restaurant.vid}" autoplay="true" loop="true" muted alt="video-restaurant"></video>
      <div class="img-restaurant-pic1" alt="image-restaurant-1" style="background-image: url('${restaurant.image1}');">CLICK</div>
      <div class="img-restaurant-pic2" alt="image-restaurant-2" style="background-image: url('${restaurant.image2}');"></div>
      <div class="img-restaurant-pic3" alt="image-restaurant-3" style="background-image: url('${restaurant.image3}');"></div>
      <div class="img-restaurant-pic4" alt="image-restaurant-4" style="background-image: url('${restaurant.image4}');"></div>
    </a>
    <hr>
  `;
}

/**
 * Realiza la petición a la API y retorna los datos de los usuarios.
 */
async function fetchUserData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching data from server.");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}
