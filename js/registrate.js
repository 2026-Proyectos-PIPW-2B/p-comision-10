
// simulacion de un login exitoso y volvemos apra atras
window.addEventListener("DOMContentLoaded", function () {
    // Buscamos el formulario de login en el HTML

    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            const nombreCompleto = document.getElementById("floatingNombreCompleto").value;
            const direccion = document.getElementById("floatingDireccion").value;
            const telefono = document.getElementById("floatingTelefono").value;
            const email = document.getElementById("floatingEmail").value;
            const password = document.getElementById("floatingPassword").value;
            const inputNombreCompleto = document.getElementById("floatingNombreCompleto");
            const inputDireccion = document.getElementById("floatingDireccion");
            const inputTelefono = document.getElementById("floatingTelefono");
            const inputEmail = document.getElementById("floatingEmail");
            const inputPassword = document.getElementById("floatingPassword");

            limpiarEstados()

            let resultadoValidacion = validarDatos(nombreCompleto, direccion, telefono, email, password, inputNombreCompleto, inputDireccion, inputTelefono, inputEmail, inputPassword)

            if (resultadoValidacion.resultado === 
                true) {
                console.log(nombreCompleto, direccion)

                localStorage.setItem("nombreCompleto", nombreCompleto);
                localStorage.setItem("direccion", direccion);
                localStorage.setItem("telefono", telefono);
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);

                limpiarEstados()

                alert(`${nombreCompleto}, has sido Registrado!!`);

                if (document.referrer) {
                    window.history.back();
                } else {
                    window.location.href = "index.html";
                }
            }
        });
    }
});


function limpiarEstados() {
    const inputs = document.querySelectorAll(".form-check-input, .form-select, .form-control")

    for (const input of inputs) {
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
    }
}

function validarDatos(nombreCompleto, direccion, telefono, email, password, inputNombreCompleto, inputDireccion, inputTelefono, inputEmail, inputPassword) {
    let resultadoValidacion = {
        resultado: true,
    }

    validarNombreCompleto(inputNombreCompleto, nombreCompleto, resultadoValidacion)
    validarDireccion(inputDireccion, direccion, resultadoValidacion)
    validarTelefono(inputTelefono, telefono, resultadoValidacion)
    validarEmail(inputEmail, email, resultadoValidacion)
    validarPassword(inputPassword, password, resultadoValidacion)

    return resultadoValidacion
}

function validarNombreCompleto(inputNombreCompleto, nombreCompleto, resultadoValidacion) {
    if (nombreCompleto.length <= 0) {
        resultadoValidacion.resultado = false
        inputNombreCompleto.classList.add("is-invalid")
    } else {
        resultadoValidacion.resultado = true
        inputNombreCompleto.classList.add("is-valid")
    }
}

function validarDireccion(inputDireccion, direccion, resultadoValidacion) {
    if (direccion.length <= 5) {
        resultadoValidacion.resultado = false
        inputDireccion.classList.add("is-invalid")
    } else {
        resultadoValidacion.resultado = true
        inputDireccion.classList.add("is-valid")
    }
}

function validarTelefono(inputTelefono, telefono, resultadoValidacion) {
    if (telefono.length <= 9 ) {
        resultadoValidacion.resultado = false
        inputTelefono.classList.add("is-invalid")
    } else {
        resultadoValidacion.resultado = true
        inputTelefono.classList.add("is-valid")
    }
}

function validarEmail(inputEmail, email, resultadoValidacion) {

    if (email.length <= 5) {
        resultadoValidacion.resultado = false
        inputEmail.classList.add("is-invalid")
    } else {
        resultadoValidacion.resultado = true
        inputEmail.classList.add("is-valid")
    }
}

function validarPassword(inputPassword, password, resultadoValidacion) {

    if (password.length <= 3) {
        resultadoValidacion.resultado = false
        inputPassword.classList.add("is-invalid")
    } else {
        resultadoValidacion.resultado = true
        inputPassword.classList.add("is-valid")
    }
}

