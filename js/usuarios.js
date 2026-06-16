const usaurios_en_ls = "usuarios";

window.addEventListener("DOMContentLoaded", function () {
    console.log("ding dom dom dom - usuarios");
    inicializarUsuarios();
    mostrarListaDeUsuarios();
});

function inicializarUsuarios() {
    console.log("inicializando usuarios...");
    const usuariosGuardados = obtenerUsuarios();
    console.log("usuarios guardados:", usuariosGuardados);

    if (usuariosGuardados.length === 0) {
        console.log("no habia usuarios, cargando ejemplos");
        guardarUsuarios([
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
        ]);
    }
}

function obtenerUsuarios() {
    console.log("leyendo usuarios desde ls");
    const usuarios = localStorage.getItem(usaurios_en_ls);

    if (!usuarios) {
        console.log("no existe la clave de usuarios todavia");
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

function guardarUsuarios(usuarios) {
    console.log("guardando usuarios en ls:", usuarios);
    localStorage.setItem(usaurios_en_ls, JSON.stringify(usuarios));
}

function mostrarListaDeUsuarios() {
    console.log("mostrando usuarios en la tabla");
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

    usuarios.forEach(function (usuario) {
        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        const tdEmail = document.createElement("td");
        const tdRol = document.createElement("td");
        const tdAcciones = document.createElement("td");
        const botonEliminar = document.createElement("button");

        tdNombre.textContent = usuario.nombreCompleto;
        tdEmail.textContent = usuario.email;
        tdRol.innerHTML = `<span class="badge ${usuario.rol === "admin" ? "text-bg-warning" : "text-bg-primary"}">${usuario.rol}</span>`;

        botonEliminar.type = "button";
        botonEliminar.className = "btn btn-danger form-control btn-sm";
        botonEliminar.textContent = "borrar";
        botonEliminar.setAttribute("data-eliminar-usuario", usuario.id);

        tdAcciones.appendChild(botonEliminar);
        tr.appendChild(tdNombre);
        tr.appendChild(tdEmail);
        tr.appendChild(tdRol);
        tr.appendChild(tdAcciones);
        bodyTableListadoDeUsuarios.appendChild(tr);
    });

    document.querySelectorAll("[data-eliminar-usuario]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const idUsuario = boton.getAttribute("data-eliminar-usuario");
            console.log("borrando usuario:", idUsuario);

            if (window.confirm("¿Querés borrar este usuario?")) {
                eliminarUsuario(idUsuario);
                mostrarListaDeUsuarios();
            }
        });
    });
}

function eliminarUsuario(idUsuario) {
    const usuarios = obtenerUsuarios();
    const usuariosFiltrados = usuarios.filter(function (usuario) {
        return usuario.id !== idUsuario;
    });

    const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo") || "null");
    if (usuarioActivo && usuarioActivo.id === idUsuario) {
        console.log("borraron al usuario activo");
        localStorage.removeItem("usuario_activo");
        localStorage.setItem("usuario_logueado", "false");
    }

    guardarUsuarios(usuariosFiltrados);
}
