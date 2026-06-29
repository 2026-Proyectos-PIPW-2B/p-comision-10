import {
    buscarUsuarioPorEmail,
    editarUsuario,
} from "./modulos/gestorDeUsuarios.js";

window.addEventListener("DOMContentLoaded", function(){
    inicializarRecuperarContraseña()
})

function inicializarRecuperarContraseña() {
    const form = document.querySelector("#formRecuperarContraseña");

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (esSubmitNuevoPassoword()){
            submitNuevoPassword()
        }else{
            submitConfirmarEmail()
        }
    });
}

function esSubmitNuevoPassoword(){
    return !divDelInputContraseña.classList.contains("d-none")
}

function submitConfirmarEmail(){
    const botonConfirmarEmail = document.getElementById("botonConfirmarEmail");
    const botonRecuperarContraseña = document.getElementById("botonRecuperarContraseña");
    const divDelInputContraseña = document.getElementById("divDelInputContraseña");

    const email = document.getElementById("floatingInput").value.trim();

    if (buscarUsuarioPorEmail(email) != undefined) {
        botonConfirmarEmail.classList.add("d-none");
        divDelInputContraseña.classList.remove("d-none");
        botonRecuperarContraseña.classList.remove("d-none");              
    } else {
        alert("¡tu usuario no existe!");
        window.location.href = "registrate.html";
    }
}

function submitNuevoPassword(){
    const email = document.getElementById("floatingInput").value.trim();
    const password = document.getElementById("floatingPassword").value.trim();

    if (password.length <= 3) {
        alert("La contraseña tiene que tener mas de 3 caracteres");
    }else{
        const usuario = buscarUsuarioPorEmail(email)
        usuario.password = password
        editarUsuario(usuario)
        alert("Contraseña actualizada!");
        window.location.href = "login.html";
    }    
}

