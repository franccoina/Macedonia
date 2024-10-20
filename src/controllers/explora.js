import "../scss/explora.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Variables globales

const url = "http://localhost:3000/users";
const search = document.querySelector("#search");
const restaurantList = document.querySelector("#restaurantList");
const code = document.querySelector("code");

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

//------------------------- addEventListeners -------------------------

// Evento de carga de contenido para renderizar restaurantes por defecto
document.addEventListener("DOMContentLoaded", async () => {
  const searchWord = search.value.trim().toLowerCase();
  if (!searchWord) {
    await index();
  }
});

// Evento de entrada en el campo de búsqueda
search.addEventListener("input", async () => {
  const searchWord = search.value.trim().toLowerCase();
  await research(searchWord);
});

//------------------------- Funciones -------------------------

// ----> Renderiza todos los restaurantes disponibles desde la API.
async function index() {
  restaurantList.innerHTML = "";
  const data = await fetchUserData();

  data.forEach((user) => {
    code.innerHTML += `<span data-idUser="${user.id}"></span>`;

    user.restaurants.forEach((restaurant) => {
      renderRestaurant(user.id, restaurant);
    });
  });
}

// ----> Filtra los restaurantes basados en la palabra de búsqueda.
async function research(searchWord) {
  restaurantList.innerHTML = "";
  const data = await fetchUserData();

  let hasResults = false;

  data.forEach((user) => {
    code.innerHTML += `<span data-idUser="${user.id}"></span>`;

    user.restaurants.forEach((restaurant) => {
      if (matchesSearch(restaurant, searchWord)) {
        renderRestaurant(user.id, restaurant);
        hasResults = true;
      }
    });
  });

  // Mostrar el mensaje de no resultados si no se encontraron coincidencias
  if (!hasResults) {
    restaurantList.innerHTML = `
      <div class="img-restaurant">
        <p>No se encontraron resultados para "${searchWord}".</p>
      </div> 
    `;
  }
}

// ----> Verifica si un restaurante coincide con la búsqueda.

function matchesSearch(restaurant, searchWord) {
  const lowerSearchWord = searchWord.toLowerCase();
  // 'i' para hacer la búsqueda insensible a mayúsculas
  const regex = new RegExp(lowerSearchWord, "i");

  return (
    restaurant.keyWords.toLowerCase().match(regex) ||
    restaurant.name.toLowerCase().match(regex) ||
    restaurant.city.toLowerCase().match(regex)
  );
}

// ----> Crea y agrega el HTML de un restaurante al DOM con IDs únicos para el modal.

function renderRestaurant(userId, restaurant) {
  // Crear un ID único para el modal combinando userId y restaurantId
  const modalId = `myModal-${userId}-${restaurant.id}`;

  restaurantList.innerHTML += `
    <div class="img-restaurant" data-bs-toggle="modal" data-bs-target="#${modalId}">
      <section>
        <h3><strong>${restaurant.name}</strong></h3>
        <p>${restaurant.city}</p>
      </section>
      <video src="../../public/vid/${restaurant.vid}" autoplay loop muted alt="video-restaurant"></video>
      <div class="img-restaurant-pic1" style="background-image: url('${restaurant.image1}');" alt="food-pic-1">CLICK</div>
      <div class="img-restaurant-pic2" style="background-image: url('${restaurant.image2}');" alt="food-pic-2"></div>
      <div class="img-restaurant-pic3" style="background-image: url('${restaurant.image3}');" alt="food-pic-3"></div>
      <div class="img-restaurant-pic4" style="background-image: url('${restaurant.image4}');" alt="food-pic-4"></div>
    </div>

    <!-- Modal -->
    <article class="d-flex justify-content-center w-100">
      <div class="modal w-100 fade" id="${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content container d-flex flex-column align-items-center text-start">
            <div class="img-restaurant modal-rest">
              <video src="../../public/vid/${restaurant.vid}" autoplay loop muted alt="video-restaurant"></video>
              <div class="img-restaurant-pic1" style="background-image: url('${restaurant.image1}');" alt="food-pic-1"></div>
              <div class="img-restaurant-pic2" style="background-image: url('${restaurant.image2}');" alt="food-pic-2"></div>
              <div class="img-restaurant-pic3" style="background-image: url('${restaurant.image3}');" alt="food-pic-3"></div>
              <div class="img-restaurant-pic4" style="background-image: url('${restaurant.image4}');" alt="food-pic-4"></div>
            </div>
            <div>
              <h2 class="modal-title">${restaurant.name}</h2>
              <p class="modal-text">${restaurant.description}</p>
            </div>
            <div class="pb-5">
              <h3 class="modal-title">Where ?</h3>
              <p class="modal-text">${restaurant.city}</p>
            </div>
            <div class="text-center d-flex pb-5 justify-content-center">
                <a class="modal-restaurant-menu rounded" href="${restaurant.menu}" target="_blank"><i class="bi bi-list"> MENU</i></a>
            </div>
            <hr>
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
                <hr>
                <div class="w-100 text-center d-flex justify-content-center gap-4 py-4">
                  <a class="border modal-restaurant-media" href="${restaurant.socialMedia1}" target="_blank"><i class="bi bi-instagram"></i></a>
                  <a class="border modal-restaurant-media" href="${restaurant.socialMedia2}" target="_blank"><i class="bi bi-facebook"></i></a>
                  <a class="border modal-restaurant-media" href="${restaurant.socialMedia3}" target="_blank"><i class="bi bi-whatsapp"></i></a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

// ----> Maneja el envío del formulario de reserva.

function handleReservationSubmit(event) {
  event.preventDefault();
  // Aquí puedes implementar la lógica para manejar la reserva, como enviar los datos a la API.
  alert("Reserva enviada exitosamente.");
  // Opcional: Cerrar el modal después de la reserva
  const modal = bootstrap.Modal.getInstance(event.target.closest(".modal"));
  modal.hide();
}

// ----> Realiza la petición a la API y retorna los datos de los usuarios.

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
