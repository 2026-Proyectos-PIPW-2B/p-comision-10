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
            console.log(email, password)
            console.log("Logueando al usuario..."   , email);
            localStorage.setItem("usuario_logueado", "true");
            localStorage.setItem("email_usuario", email);
            alert("¡Bienvenido...!");

            if (document.referrer) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        });
    }
});