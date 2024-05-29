// Import our custom CSS
import '../scss/booking.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//validar si el usuario existe, si no existe redirigir al login

let url = "http://localhost:3000/users";

(function () {
    let userOnline = localStorage.getItem('userOnline')
    console.log(JSON.parse(userOnline))
    if (userOnline == null) {
        window.location.href = "./admi.html"
    }
})()

let btnLogout = document.getElementById("btnLogout")

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userOnline")
    window.location.href = "./admi.html"
})

//Tabla con restaurantes pertenecientes al perfil

let tbodyRestaurants = document.querySelector('.restaurants-table')
const tbodyReservations = document.querySelector(".reservations-table")

async function index() {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data[0].restaurants)

    let userOnline = localStorage.getItem('userOnline')
    userOnline = JSON.parse(userOnline)
    tbodyRestaurants.innerHTML = ""
    data.forEach(user => {
        if (userOnline.id === user.id) {
            user.restaurants.forEach(element => {
                tbodyRestaurants.innerHTML += `
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>
                    <video src="../../public/vid/${element.vid}"
                    autoplay="true"
                    loop="true"
                    width="30px"
                    muted alt="video-restaurant"></video>
                </td>
                <td>
                    ${element.city}
                </td>
                <td>
                    ${element.address}
                </td>
                <td>
                    ${element.menu}
                </td>
                <td>
                    <img
                        src=${element.image1} width="30px"
                        alt="navbar-burger-logo" />
                </td>
                <td>
                    <img
                        src=${element.image2} width="30px"
                        alt="navbar-burger-logo" />
                </td>
                <td>
                    <img
                        src=${element.image3} width="30px"
                        alt="navbar-burger-logo" />
                </td>
                <td>
                    <img
                        src=${element.image4} width="30px"
                        alt="navbar-burger-logo" />
                </td>
                <td>
                    ${element.socialMedia1}
                </td>
                <td>
                    ${element.socialMedia2}
                </td>
                <td>
                    ${element.socialMedia3}
                </td>
                <td>
                    ${element.keyWords}
                </td>
                <td>
                    ${element.reservations.length}
                </td>
                <td>
                    <button type="button" data-id=${element.id} class="btn btn-danger">Ver reservas</button>
                </td>
            `
            })
        }
    })
}

await index()

tbodyRestaurants.addEventListener("click", async function(event){
    if (event.target.classList.contains("btn-danger")) {
        await indexReservations()
    }
})

async function indexReservations() {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data[0].restaurants)

    let userOnline = localStorage.getItem('userOnline')
    userOnline = JSON.parse(userOnline)
    tbodyReservations.innerHTML = ""
    data.forEach(user => {
        if (userOnline.id === user.id) {
            user.restaurants.forEach(restaurant => {
                restaurant.reservations.forEach((element) => {
                    tbodyReservations.innerHTML += `
                    <td>${element.restaurant}</td>
                    <td>${element.cliente}</td>
                    <td>${element.fecha}</td>
                `
                })
            })
        }
    })
}

