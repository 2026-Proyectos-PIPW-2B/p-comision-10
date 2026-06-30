import { cerrarSesion } from "./gestorSesion.js";

const enlacesDelMenu = {
    principio: {
        texto: "Comienzo",
        href: "index.html",
    },
    carrito: {
        texto: "Carrito de compras",
        href: "carrito.html",
    },
    historial: {
        texto: "Historial de compras",
        href: "historial.html",
    },
    usuarios: {
        texto: "Administrar usuarios",
        href: "usuarios.html",
    },
    crearProductos: {
        texto: "Crear productos",
        href: "crear_productos.html",
    },
    editarProductos: {
        texto: "Editar productos",
        href: "editar_productos.html",
    },
    login: {
        texto: "login",
        href: "login.html",
    },
    perfil: {
        texto: "Mi perfil",
        href: "perfil.html",
    },
    cerrarSesion: {
        texto: "Cerrar sesión",
        href: "#",
    },
};

window.addEventListener("DOMContentLoaded", inicializarMenu);

function inicializarMenu() {
    console.log("menu inicializado");
    const contenedorMenu = document.querySelector("[data-menu]");
    if (!contenedorMenu) {
        console.log("no se encontro el contenedor del menu");
        return;
    }
    const usuarioActivo = obtenerUsuarioActivo();
    console.log("usuario activo del menu:", usuarioActivo);
    const enlacesDelUsuario = obtenerEnlacesDelUsuario(usuarioActivo);
    contenedorMenu.innerHTML = "";
    for (let i = 0; i < enlacesDelUsuario.length; i++) {
        const enlace = enlacesDelUsuario[i];
        const item = document.createElement("li");
        const link = document.createElement("a");
        item.className = "nav-item";
        link.className = "nav-link";
        link.href = enlace.href;
        link.textContent = enlace.texto;
        if (enlace.action === "logout") {
            link.setAttribute("data-cerrar-sesion", "true");
        }
        item.appendChild(link);
        contenedorMenu.appendChild(item);
    }
    conectarCerrarSesion();
    console.log("menu armado");
}

function obtenerUsuarioActivo() {
    const usuarioLogueado = localStorage.getItem("usuario_logueado");
    const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo") || "null");
    if (usuarioLogueado !== "true" || !usuarioActivo) {
        return null;
    }
    return usuarioActivo;
}

function obtenerEnlacesDelUsuario(usuarioActivo) {
    if (!usuarioActivo) {
        return [
            enlacesDelMenu.principio,
            enlacesDelMenu.carrito,
            enlacesDelMenu.login,
        ];
    }
    if (usuarioActivo.rol === "admin") {
        return [
            enlacesDelMenu.principio,
            enlacesDelMenu.crearProductos,
            enlacesDelMenu.editarProductos,
            enlacesDelMenu.usuarios,
            enlacesDelMenu.perfil,
            {
                ...enlacesDelMenu.cerrarSesion,
                action: "logout",
            },
        ];
    }

    return [
        enlacesDelMenu.principio,
        enlacesDelMenu.carrito,
        enlacesDelMenu.historial,
        enlacesDelMenu.perfil,
        {
            ...enlacesDelMenu.cerrarSesion,
            action: "logout",
        },
    ];
}

function conectarCerrarSesion() {
    const botonCerrarSesion = document.querySelector("[data-cerrar-sesion]");

    if (!botonCerrarSesion) {
        return;
    }

    botonCerrarSesion.addEventListener("click", function (evento) {
        evento.preventDefault();
        console.log("cerrando sesion");

        cerrarSesion();
        window.location.href = "index.html";
    });
}
