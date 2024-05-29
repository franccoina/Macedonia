// Import our custom CSS
import '../scss/explora.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//------------------------- navbar -------------------------

let nav = document.getElementById("navbarBtn");
nav.addEventListener("click", () => {
  console.log("entrando");
  document.body.classList.toggle("open");
});

//------------------------- Buscador -------------------------

let url = "http://localhost:3000/users";

// Obtener referencia al input de búsqueda y a la lista de restaurantes
const search = document.querySelector('#search');
console.log(search.value);
const restaurantList = document.querySelector('#restaurantList');

// Evento de cambio en el input de búsqueda
search.addEventListener('input', async function () {
  const searchWord = search.value.trim().toLowerCase();
  await research(searchWord);
});

// Función para filtrar los restaurantes según la búsqueda
async function research(searchWord) {
  // Limpiar la lista antes de agregar los resultados filtrados
  restaurantList.innerHTML = '';

  // Recorrer la base de datos y buscar coincidencias
  const response = await fetch(url)
  const data = await response.json()

  data.forEach(user => {
    user.restaurants.forEach((element,index) => {
      // Verificar si alguna palabra clave coincide con el término de búsqueda
      if (element.keyWords.includes(searchWord.toLowerCase())) {
        // Crear un nuevo elemento de lista y agregarlo a la lista
        restaurantList.innerHTML +=  `
        <div class="img-restaurant" data-bs-toggle="modal" data-bs-target="#myModal-${index}">
          <section>
            <h3><strong>${element.name}</strong></h3>
            <p>${element.city}</p>
          </section>
          <video src="../../public/vid/${element.vid}" autoplay="true" loop="true" muted
            alt="video-restaurant"></video>
          <div class="img-restaurant-pic1" style="background-image: url('${element.image1}');" alt="food-pic-1"></div>
          <div class="img-restaurant-pic2" style="background-image: url('${element.image2}');" alt="food-pic-2"></div>
          <div class="img-restaurant-pic3" style="background-image: url('${element.image3}');" alt="food-pic-3"></div>
          <div class="img-restaurant-pic4" style="background-image: url('${element.image4}');" alt="food-pic-4"></div>
        </div>

        <!-- modal -->
        <div class="modal fade" id="myModal-${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content container">
              <div>
                  <h2 class="modal-title">${element.name}</h2>
                  <p class="modal-text">${element.description}</p>
                </div>
                <div>
                  <h3 class="modal-title">Lugar</h3>
                  <p class="modal-text">${element.city}. ${element.address}</p>
                </div>
                <div>
                  <h3 class="modal-title">Reservas</h3>
                  <br>
                  <form>
                    <input class="form-name" type="text" id="nombre" name="nombre" placeholder="Nombre completo">
                    <input class="form-date" type="date" id="fecha" name="fecha" placeholder="Fecha">
                    <input class="form-hour" type="time" id="hora" name="hora" placeholder="Hora">
                    <textarea class="form-comment" id="comentario" name="comentario" rows="4" cols="50"
                      placeholder="Comentario"></textarea>
                    <div class="text-center pt-4">
                      <a class="modal-social-media" href=${element.socialMedia1}><i class="bi bi-facebook text-light"></i></a>
                      <a class="modal-social-media" href=${element.socialMedia2}><i class="bi bi-instagram text-light"></i></a>
                      <a class="modal-social-media" href=${element.socialMedia3}><i class="bi bi-whatsapp text-light"></i></a>
                      <a class="modal-social-media" href=${element.menu}><i class="bi bi-menu-button-wide text-danger"></i></a>
                    </div>
                    <br>
                    <button class="form-button btn btn-light" type="submit">Enviar Reserva</button>
                  </form>
                </div>
            </div>
          </div>
        </div>
        `
      }
    });
  });
}

