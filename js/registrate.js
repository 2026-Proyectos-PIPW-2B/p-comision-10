import { existeUsuario, agregarUsuario } from "./modulos/gestorDeUsuarios.js"

window.addEventListener("DOMContentLoaded", inicializarRegistrate)

function inicializarRegistrate() {
    agregarListener()
}

function agregarListener(){
    agregarListenerFormulario()
}

function agregarListenerFormulario(){
    const formulario = document.getElementById("formularioRegistro");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            
            const nombreCompleto = document.getElementById("floatingNombreCompleto").value.trim();
            const direccion = document.getElementById("floatingDireccion").value.trim();
            const telefono = document.getElementById("floatingTelefono").value.trim();
            const email = document.getElementById("floatingEmail").value.trim();
            const password = document.getElementById("floatingPassword").value.trim();
            const inputNombreCompleto = document.getElementById("floatingNombreCompleto");
            const inputDireccion = document.getElementById("floatingDireccion");
            const inputTelefono = document.getElementById("floatingTelefono");
            const inputEmail = document.getElementById("floatingEmail");
            const inputPassword = document.getElementById("floatingPassword");

            limpiarEstados();

            const resultadoValidacion = validarDatos(
                nombreCompleto,
                direccion,
                telefono,
                email,
                password,
                inputNombreCompleto,
                inputDireccion,
                inputTelefono,
                inputEmail,
                inputPassword
            );

            if (resultadoValidacion.resultado === true) {
                
                if (existeUsuario(email)) {
                    alert("Ya existe un usuario con ese email");
                    inputEmail.classList.add("is-invalid");
                    return;
                }

                agregarUsuario(nombreCompleto, direccion, telefono, email, password, "usuario")
                limpiarEstados();
                alert(`${nombreCompleto}, has sido Registrado!!`);

                window.location.href = "login.html";

                
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

function validarDatos(nombreCompleto, direccion, telefono, email, password, inputNombreCompleto, inputDireccion, inputTelefono, inputEmail, inputPassword) {
    const resultadoValidacion = {
        resultado: true,
    };

    validarNombreCompleto(inputNombreCompleto, nombreCompleto, resultadoValidacion);
    validarDireccion(inputDireccion, direccion, resultadoValidacion);
    validarTelefono(inputTelefono, telefono, resultadoValidacion);
    validarEmail(inputEmail, email, resultadoValidacion);
    validarPassword(inputPassword, password, resultadoValidacion);

    return resultadoValidacion;
}

function validarNombreCompleto(inputNombreCompleto, nombreCompleto, resultadoValidacion) {
    if (nombreCompleto.length <= 0) {
        resultadoValidacion.resultado = false;
        inputNombreCompleto.classList.add("is-invalid");
    } else {
        inputNombreCompleto.classList.add("is-valid");
    }
}

function validarDireccion(inputDireccion, direccion, resultadoValidacion) {
    if (direccion.length <= 5) {
        resultadoValidacion.resultado = false;
        inputDireccion.classList.add("is-invalid");
    } else {
        inputDireccion.classList.add("is-valid");
    }
}

function validarTelefono(inputTelefono, telefono, resultadoValidacion) {
    if (telefono.length <= 9) {
        resultadoValidacion.resultado = false;
        inputTelefono.classList.add("is-invalid");
    } else {
        inputTelefono.classList.add("is-valid");
    }
}

function validarEmail(inputEmail, email, resultadoValidacion) {
    if (email.length <= 5) {
        resultadoValidacion.resultado = false;
        inputEmail.classList.add("is-invalid");
    } else {
        inputEmail.classList.add("is-valid");
    }
}

function validarPassword(inputPassword, password, resultadoValidacion) {
    if (password.length <= 3) {
        resultadoValidacion.resultado = false;
        inputPassword.classList.add("is-invalid");
    } else {
        inputPassword.classList.add("is-valid");
    }
}
