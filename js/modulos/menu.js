const enlacesDelMenu = {
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

        item.appendChild(link);
        contenedorMenu.appendChild(item);
    }

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
            enlacesDelMenu.carrito,
            enlacesDelMenu.login,
        ];
    }

    if (usuarioActivo.rol === "admin") {
        return [
            enlacesDelMenu.crearProductos,
            enlacesDelMenu.editarProductos,
            enlacesDelMenu.usuarios,
            enlacesDelMenu.login,
        ];
    }

    return [
        enlacesDelMenu.carrito,
        enlacesDelMenu.historial,
        enlacesDelMenu.login,
    ];
}
