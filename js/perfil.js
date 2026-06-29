import {
    editarUsuario,
    existeUsuario,
    obtenerUsuarioPorId,
} from "./modulos/gestorDeUsuarios.js";

window.addEventListener("DOMContentLoaded", inicializarPerfil);

function inicializarPerfil() {
    console.log("ding dom dom dom - perfil");

    const usuarioActivo = obtenerUsuarioActivo();

    if (!usuarioActivo) {
        console.log("no hay usuario logueado, volviendo al login");
        alert("Tenes que iniciar sesión primero.");
        window.location.href = "login.html";
        return;
    }

    cargarDatosDelUsuario(usuarioActivo.id);
    agregarListenerFormulario();
}

function obtenerUsuarioActivo() {
    const usuarioLogueado = localStorage.getItem("usuario_logueado");
    const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo") || "null");

    if (usuarioLogueado !== "true" || !usuarioActivo) {
        return null;
    }

    return usuarioActivo;
}

function cargarDatosDelUsuario(idUsuario) {
    const usuario = obtenerUsuarioPorId(idUsuario);

    if (!usuario) {
        console.log("no se encontro el usuario activo");
        alert("No se encontró tu usuario.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("inputIdUsuarioPerfil").value = usuario.id;
    document.getElementById("inputNombreCompletoPerfil").value = usuario.nombreCompleto;
    document.getElementById("inputDireccionPerfil").value = usuario.direccion;
    document.getElementById("inputTelefonoPerfil").value = usuario.telefono;
    document.getElementById("inputEmailPerfil").value = usuario.email;
    document.getElementById("inputPasswordPerfil").value = usuario.password;
    document.getElementById("textoRolUsuario").textContent = `Rol: ${usuario.rol}`;

    console.log("perfil cargado:", usuario);
}

function agregarListenerFormulario() {
    const formulario = document.getElementById("formularioPerfil");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        console.log("submit de perfil");

        const id = document.getElementById("inputIdUsuarioPerfil").value;
        const nombreCompleto = document.getElementById("inputNombreCompletoPerfil").value.trim();
        const direccion = document.getElementById("inputDireccionPerfil").value.trim();
        const telefono = document.getElementById("inputTelefonoPerfil").value.trim();
        const email = document.getElementById("inputEmailPerfil").value.trim();
        const password = document.getElementById("inputPasswordPerfil").value.trim();

        if (!validarDatos(nombreCompleto, direccion, telefono, email, password)) {
            mostrarMensaje("Hay datos que no estan bien completados.", "danger");
            return;
        }

        if (existeUsuario(email, id)) {
            mostrarMensaje("Ya existe otro usuario con ese email.", "danger");
            return;
        }

        const usuarioActivo = obtenerUsuarioActivo();

        const usuarioEditado = {
            id: id,
            nombreCompleto: nombreCompleto,
            direccion: direccion,
            telefono: telefono,
            email: email,
            password: password,
            rol: usuarioActivo.rol,
        };

        const guardado = editarUsuario(usuarioEditado);

        if (!guardado) {
            mostrarMensaje("No se pudo actualizar tu perfil.", "danger");
            return;
        }

        localStorage.setItem("usuario_activo", JSON.stringify(usuarioEditado));
        mostrarMensaje("Perfil actualizado correctamente.", "success");
        console.log("perfil actualizado:", usuarioEditado);
    });
}

function validarDatos(nombreCompleto, direccion, telefono, email, password) {
    if (nombreCompleto.length <= 0) {
        return false;
    }

    if (direccion.length <= 5) {
        return false;
    }

    if (telefono.length <= 9) {
        return false;
    }

    if (email.length <= 5) {
        return false;
    }

    if (password.length <= 3) {
        return false;
    }

    return true;
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById("mensajePerfil");

    if (!mensaje) {
        return;
    }

    mensaje.className = `alert alert-${tipo} mt-3`;
    mensaje.textContent = texto;
}
