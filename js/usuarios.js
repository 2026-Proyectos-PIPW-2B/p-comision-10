import {
    editarUsuario,
    eliminarUsuario,
    existeUsuario,
    obtenerUsuarioPorId,
    obtenerUsuarios,
} from "./modulos/gestorDeUsuarios.js";

window.addEventListener("DOMContentLoaded", inicializarUsuarios)

function inicializarUsuarios(){
    mostrarListaDeUsuarios();
    agregarListenerFormulario();  
}


function mostrarListaDeUsuarios() {
    const bodyTableListadoDeUsuarios = document.getElementById("bodyTableListadoDeUsuarios");

    if (!bodyTableListadoDeUsuarios) {
        return;
    }

    const usuarios = obtenerUsuarios();
    bodyTableListadoDeUsuarios.innerHTML = "";

    if (usuarios.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");

        celda.colSpan = 4;
        celda.className = "text-center py-4";
        celda.textContent = "No hay usuarios cargados.";

        fila.appendChild(celda);
        bodyTableListadoDeUsuarios.appendChild(fila);
        return;
    }

    usuarios.forEach(function (usuarios) {
        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        const tdEmail = document.createElement("td");
        const tdRol = document.createElement("td");
        const tdAcciones = document.createElement("td");
        const botonEditar = document.createElement("button");
        const botonEliminar = document.createElement("button");

        tdNombre.textContent = usuarios.nombreCompleto;
        tdEmail.textContent = usuarios.email;
        tdRol.innerHTML = `<span class="badge ${usuarios.rol === "admin" ? "text-bg-warning" : "text-bg-primary"}">${usuarios.rol}</span>`;

        botonEditar.type = "button";
        botonEditar.className = "btn btn-warning btn-sm me-2";
        botonEditar.textContent = "editar";
        botonEditar.setAttribute("data-editar-usuario", usuarios.id);

        botonEliminar.type = "button";
        botonEliminar.className = "btn btn-danger btn-sm";
        botonEliminar.textContent = "borrar";
        botonEliminar.setAttribute("data-eliminar-usuario", usuarios.id);

        tdAcciones.appendChild(botonEditar);
        tdAcciones.appendChild(botonEliminar);
        tr.appendChild(tdNombre);
        tr.appendChild(tdEmail);
        tr.appendChild(tdRol);
        tr.appendChild(tdAcciones);
        bodyTableListadoDeUsuarios.appendChild(tr);
    });

    document.querySelectorAll("[data-editar-usuario]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const idUsuario = boton.getAttribute("data-editar-usuario");
            cargarUsuarioEnFormulario(idUsuario);
        });
    });

    document.querySelectorAll("[data-eliminar-usuario]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const idUsuario = boton.getAttribute("data-eliminar-usuario");

            if (window.confirm("¿Querés borrar este usuario?")) {
                eliminarUsuario(idUsuario);
                limpiarFormularioSiCorresponde(idUsuario);
                mostrarMensaje("Usuario borrado.", "success");
                mostrarListaDeUsuarios();
            }
        });
    });
}

function agregarListenerFormulario() {
    const formulario = document.getElementById("formularioEditarUsuario");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const id = document.getElementById("inputIdUsuario").value;
        const nombreCompleto = document.getElementById("inputNombreCompleto").value.trim();
        const direccion = document.getElementById("inputDireccion").value.trim();
        const telefono = document.getElementById("inputTelefono").value.trim();
        const email = document.getElementById("inputEmail").value.trim();
        const password = document.getElementById("inputPassword").value.trim();
        const rol = document.getElementById("inputRol").value;

        if (!id) {
            mostrarMensaje("Primero elegi un usuario para editar.", "warning");
            return;
        }

        if (nombreCompleto.length <= 0 || direccion.length <= 5 || telefono.length <= 9 || email.length <= 5 || password.length <= 3) {
            mostrarMensaje("Hay datos que no estan bien completados.", "danger");
            return;
        }

        if (existeUsuario(email, id)) {
            mostrarMensaje("Ya existe otro usuario con ese email.", "danger");
            return;
        }

        const usuarioEditado = {
            id: id,
            nombreCompleto: nombreCompleto,
            direccion: direccion,
            telefono: telefono,
            email: email,
            password: password,
            rol: rol,
        };

        const guardado = editarUsuario(usuarioEditado);

        if (!guardado) {
            mostrarMensaje("No se pudo editar el usuario.", "danger");
            return;
        }

        actualizarUsuarioActivo(usuarioEditado);
        formulario.reset();
        document.getElementById("inputIdUsuario").value = "";
        mostrarMensaje("Usuario editado correctamente.", "success");
        mostrarListaDeUsuarios();
    });
}

function cargarUsuarioEnFormulario(idUsuario) {
    const usuario = obtenerUsuarioPorId(idUsuario);

    if (!usuario) {
        mostrarMensaje("No se encontro el usuario para editar.", "danger");
        return;
    }

    document.getElementById("inputIdUsuario").value = usuario.id;
    document.getElementById("inputNombreCompleto").value = usuario.nombreCompleto;
    document.getElementById("inputDireccion").value = usuario.direccion;
    document.getElementById("inputTelefono").value = usuario.telefono;
    document.getElementById("inputEmail").value = usuario.email;
    document.getElementById("inputPassword").value = usuario.password;
    document.getElementById("inputRol").value = usuario.rol;

    mostrarMensaje("Usuario cargado para editar.", "info");
}

function limpiarFormularioSiCorresponde(idUsuario) {
    const idEnFormulario = document.getElementById("inputIdUsuario").value;

    if (idEnFormulario === idUsuario) {
        const formulario = document.getElementById("formularioEditarUsuario");
        formulario.reset();
        document.getElementById("inputIdUsuario").value = "";
    }
}

function actualizarUsuarioActivo(usuarioEditado) {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo") || "null");

    if (usuarioActivo && usuarioActivo.id === usuarioEditado.id) {
        localStorage.setItem("usuario_activo", JSON.stringify(usuarioEditado));
    }
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById("mensajeUsuarios");

    if (!mensaje) {
        return;
    }

    mensaje.className = `alert alert-${tipo} mt-3`;
    mensaje.textContent = texto;
}