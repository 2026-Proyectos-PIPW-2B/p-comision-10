import {
    buscarUsuarioPorEmail,
    editarUsuario,
} from "./modulos/gestorDeUsuarios.js";

window.addEventListener("DOMContentLoaded", inicializarRecuperarContraseña);

function inicializarRecuperarContraseña() {
    console.log("ding dom dom dom - recuperar contraseña");

    const form = document.querySelector("#formRecuperarContraseña");
    const botonConfirmarEmail = document.getElementById("botonConfirmarEmail");
    const botonRecuperarContraseña = document.getElementById("botonRecuperarContraseña");
    const divDelInputContraseña = document.getElementById("divDelInputContraseña");

    if (!form) {
        return;
    }

    let usuarioEncontrado = null;

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();
        console.log("submit de recuperar contraseña");

        const email = document.getElementById("floatingInput").value.trim();
        const password = document.getElementById("floatingPassword").value.trim();

        if (!usuarioEncontrado) {
            usuarioEncontrado = buscarUsuarioPorEmail(email);
            console.log("usuario buscado por email:", usuarioEncontrado);

            if (!usuarioEncontrado) {
                alert("¡tu usuario no existe!");
                window.location.href = "registrate.html";
                return;
            }

            botonConfirmarEmail.classList.add("d-none");
            divDelInputContraseña.classList.remove("d-none");
            botonRecuperarContraseña.classList.remove("d-none");
            return;
        }

        if (password.length <= 3) {
            alert("La contraseña tiene que tener mas de 3 caracteres");
            return;
        }

        usuarioEncontrado.password = password;
        editarUsuario(usuarioEncontrado);
        console.log("contraseña actualizada");
        alert("Contraseña actualizada!");

        if (document.referrer) {
            window.history.back();
        } else {
            window.location.href = "login.html";
        }
    });
}
