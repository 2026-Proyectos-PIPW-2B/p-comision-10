const usaurios_en_ls = "usuarios";

// totalmente robado jajaja
window.addEventListener("DOMContentLoaded", function () {
    console.log("ding dom dom dom");
    inicializarUsuarios();

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

window.addEventListener("DOMContentLoaded", function () {
    console.log("arranco login...");
    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            console.log("submit de login");

            const email = document.getElementById("floatingInput").value.trim();
            const password = document.getElementById("floatingPassword").value.trim();
            const inputEmail = document.getElementById("floatingInput");
            const inputPassword = document.getElementById("floatingPassword");

            console.log("credenciales que llegaron:", email, password);
            limpiarEstados();
            validarDatos(email, password, inputEmail, inputPassword);

            const usuarioEncontrado = buscarUsuarioPorCredenciales(email, password);
            console.log("usuario encontrado:", usuarioEncontrado);

            if (usuarioEncontrado) {
                alert("¡Bienvenido... al paraiso!");
                limpiarEstados();
                localStorage.setItem("usuario_logueado", "true");
                localStorage.setItem("usuario_activo", JSON.stringify(usuarioEncontrado));

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

function obtenerUsuarios() {
    console.log("leyendo usuarios para login");
    const usuarios = localStorage.getItem(usaurios_en_ls);

    if (!usuarios) {
        console.log("no existe la clave usuarios todavia");
        return [];
    }

    try {
        const usuariosParseados = JSON.parse(usuarios);
        console.log("usuarios parseados:", usuariosParseados);
        return Array.isArray(usuariosParseados) ? usuariosParseados : [];
    } catch (error) {
        console.error("No se pudieron leer los usuarios:", error);
        return [];
    }
}

function inicializarUsuarios() {
    const usuariosGuardados = obtenerUsuarios();
    console.log("usuarios en login:", usuariosGuardados);

    if (usuariosGuardados.length === 0) {
        console.log("no habia usuarios, cargando ejemplos");
        localStorage.setItem(usaurios_en_ls, JSON.stringify([
            {
                id: "u1",
                nombreCompleto: "admin",
                direccion: "calle falsa 123",
                telefono: "2914395390",
                email: "admin@piwp.com",
                password: "1234",
                rol: "admin",
            },
            {
                id: "u2",
                nombreCompleto: "cliente",
                direccion: "inglaterra 634",
                telefono: "291439530",
                email: "cliente@piwp.com",
                password: "1234",
                rol: "cliente",
            },
        ]));
    }
}

function buscarUsuarioPorCredenciales(email, password) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(function (usuario) {
        return usuario.email === email && usuario.password === password;
    });
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
