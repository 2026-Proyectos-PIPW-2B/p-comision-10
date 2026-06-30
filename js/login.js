import { obtenerUsuarios } from "./modulos/gestorDeUsuarios.js";

import { iniciarSesion } from "./modulos/gestorSesion.js";

window.addEventListener("DOMContentLoaded", function () {
    inicializarTema()
    inicializarLogin()
});

//totalmente robado
//poner pagina modo oscuro o claro
function inicializarTema(){
    const iconoPrincipal = document.querySelector("#bd-theme use");
    const botonesOpciones = document.querySelectorAll("[data-bs-theme-value]");

    botonesOpciones.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const temaSeleccionado = boton.getAttribute("data-bs-theme-value");

            localStorage.setItem("theme", temaSeleccionado);

            aplicarTema(temaSeleccionado);;

            const iconoDelBotonPresionado = boton.querySelector("use").getAttribute("href");
            iconoPrincipal.setAttribute("href", iconoDelBotonPresionado);
        });
    });

    const temaActual = obtenerTemaPreferido();

    const botonActivo = document.querySelector(`[data-bs-theme-value="${temaActual}"]`);
    if (botonActivo) {
        const iconoActivo = botonActivo.querySelector("use").getAttribute("href");
        iconoPrincipal.setAttribute("href", iconoActivo);
    }
}

function obtenerTemaPreferido() {
    const guardado = localStorage.getItem("theme");
    if (guardado) {
        return guardado;
    }

    const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefiereOscuro ? "dark" : "light";
}

function aplicarTema(tema) {
    let temaReal = tema;

    if (tema === "auto") {
        const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
        temaReal = prefiereOscuro ? "dark" : "light";
    }

    document.documentElement.setAttribute("data-bs-theme", temaReal);
}

//de aca en adelante ya no es robado


function inicializarLogin(){
  const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            console.log("submit de login");

            const email = document.getElementById("floatingInput").value.trim();
            const password = document.getElementById("floatingPassword").value.trim();
            const inputEmail = document.getElementById("floatingInput");
            const inputPassword = document.getElementById("floatingPassword");

            limpiarEstados();
            validarDatos(email, password, inputEmail, inputPassword);

            if (iniciarSesion(email, password)){
                window.location.href = "index.html";
            }else{
                mostrarPasswordIncorrecto(inputPassword)
            }
        });
    }
}

function limpiarEstados() {
    const inputs = document.querySelectorAll(".form-check-input, .form-select, .form-control");

    for (const input of inputs) {
        input.classList.remove("is-invalid");
        input.classList.remove("is-valid");
    }
}

function validarDatos(email, password, inputEmail, inputPassword) {
    validarEmail(inputEmail, email);
    validarPassword(inputPassword, password);
}

function validarEmail(inputEmail, email) {
    const usuarioEncontrado = obtenerUsuarios().some(function (usuario) {
        return usuario.email === email;
    });

    if (!usuarioEncontrado) {
        inputEmail.classList.add("is-invalid");
    } else {
        inputEmail.classList.add("is-valid");
    }
}

function validarPassword(inputPassword, password) {
    if (password.length <= 3) {
        inputPassword.classList.add("is-invalid");
    } else {
        inputPassword.classList.add("is-valid");
    }
}

function mostrarPasswordIncorrecto(inputPassword){
    inputPassword.classList.add("is-invalid")
    inputPassword.value = ""
}