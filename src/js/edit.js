// Import our custom CSS
import '../scss/edit.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//validar si el usuario existe, si no existe redirigir al login

(function (){
    let userOnline = localStorage.getItem('userOnline')
    if(userOnline == null){
        window.location.href = "./admi.html"
    }
})()

let btnLogout=document.getElementById("btnLogout")

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userOnline")
    window.location.href = "./admi.html"
})