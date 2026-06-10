// totalmente robado jajaja
window.addEventListener("DOMContentLoaded", function () {
    console.log("ding dom dom dom");

    const iconoPrincipal = document.querySelector("#bd-theme use");
    const botonesOpciones = document.querySelectorAll("[data-bs-theme-value]");

    botonesOpciones.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const temaSeleccionado = boton.getAttribute("data-bs-theme-value");
            console.log("click en ....", temaSeleccionado);

            localStorage.setItem("theme", temaSeleccionado);
            console.log("al localStorage jeje:", temaSeleccionado);

            aplicarTema(temaSeleccionado);
            console.log("actuzliado o.O");

            const iconoDelBotonPresionado = boton.querySelector("use").getAttribute("href");
            iconoPrincipal.setAttribute("href", iconoDelBotonPresionado);
            console.log("se cambio el boton....", iconoDelBotonPresionado);
        });
    });

    const temaActual = obtenerTemaPreferido();
    console.log("tema inicial:", temaActual);

    const botonActivo = document.querySelector(`[data-bs-theme-value="${temaActual}"]`);
    if (botonActivo) {
        const iconoActivo = botonActivo.querySelector("use").getAttribute("href");
        iconoPrincipal.setAttribute("href", iconoActivo);
        console.log("seteadooo!!!");
    }
});

function obtenerTemaPreferido() {
    const guardado = localStorage.getItem("theme");
    if (guardado) {
        console.log("esta el tema en el localStorage:", guardado);
        return guardado;
    }

    const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
    console.log("mmmmm. ¿está oscuro?:", prefiereOscuro);
    return prefiereOscuro ? "dark" : "light";
}

function aplicarTema(tema) {
    let temaReal = tema;

    if (tema === "auto") {
        const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
        temaReal = prefiereOscuro ? "dark" : "light";
        console.log("Modo auto activado. Se eligió:", temaReal);
    }

    document.documentElement.setAttribute("data-bs-theme", temaReal);
}

aplicarTema(obtenerTemaPreferido());


// simulacion de un login exitoso y volvemos apra atras
window.addEventListener("DOMContentLoaded", function () {
    // Buscamos el formulario de login en el HTML
    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            const email = document.getElementById("floatingInput").value;
            const password = document.getElementById("floatingPassword").value;
            const inputEmail = document.getElementById("floatingInput")
            const inputPassword = document.getElementById("floatingPassword")
            console.log(email === localStorage.getItem("email"), localStorage.getItem("email"))
            console.log(password === localStorage.getItem("password"), localStorage.getItem("password"))
            limpiarEstados()
            validarDatos(email, password, inputEmail, inputPassword)
            if (email === localStorage.getItem("email") && password === localStorage.getItem("password")) {
                alert("¡Bienvenido... al paraiso!");
                limpiarEstados()
                localStorage.setItem("usuario_logueado", "true");
                if (document.referrer) {
                    window.history.back();
                } else {
                    window.location.href = "index.html";
                }
            } else {
                localStorage.setItem("usuario_logueado", "false");
                alert("¡No no, le pifiaste!");
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

function validarDatos(email, password, inputEmail, inputPassword) {

    validarEmail(inputEmail, email)
    validarPassword(inputPassword, password)
}

function validarEmail(inputEmail, email) {

    if (email !== localStorage.getItem("email")) {
        inputEmail.classList.add("is-invalid")
    } else if(email === localStorage.getItem("email")){
        inputEmail.classList.add("is-valid")
    }
}

function validarPassword(inputPassword, password) {

    if (password !== localStorage.getItem("password")) {
        inputPassword.classList.add("is-invalid")
    } else if (password === localStorage.getItem("password")){
        inputPassword.classList.add("is-valid")
    }
}