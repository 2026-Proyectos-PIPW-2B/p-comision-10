import {
    agregarElementoAlCarrito,
    inicializarProductos,
    obtenerProductos,
} from "./modulos/gestorDeProductos.js";

import { existeUsuarioLogueado } from "./modulos/gestorSesion.js";

window.addEventListener("DOMContentLoaded", inicializarIndex);

function inicializarIndex() {
    console.log("inicializando index...");
    inicializarProductos();
    renderizarProductos();

    const inputFiltrar = document.getElementById("inputFiltrarProducto");
    if (inputFiltrar) {
        inputFiltrar.addEventListener("input", renderizarProductos);
    }
}

function renderizarProductos() {
    console.log("renderizando productos del index");
    const contenedorCards = document.getElementById("divContenedorCards");

    if (!contenedorCards) {
        console.log("no se encontro el contenedor de cards");
        return;
    }

    const inputFiltrar = document.getElementById("inputFiltrarProducto");
    const filtro = inputFiltrar ? inputFiltrar.value.toLowerCase().trim() : "";

    const todosLosProductos = obtenerProductos();
    console.log("todos los productos:", todosLosProductos);

    // Filtrar productos por nombre si hay texto en el input
    const productos = todosLosProductos.filter(function (producto) {
        return producto.nombre.toLowerCase().includes(filtro);
    });

    contenedorCards.innerHTML = "";

    if (productos.length === 0) {
        const mensaje = document.createElement("div");
        mensaje.className = "col-12 text-center mt-5";
        mensaje.innerHTML = `
            <div class="alert alert-warning mx-auto w-75">
                ${filtro ? "No se encontraron productos que coincidan con la búsqueda." : "No hay productos cargados todavía."}
            </div>
        `;
        contenedorCards.appendChild(mensaje);
        return;
    }

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const card = document.createElement("div");
        const imagen = document.createElement("img");
        const body = document.createElement("div");
        const lista = document.createElement("ul");
        const nombre = document.createElement("li");
        const descripcion = document.createElement("li");
        const precio = document.createElement("li");
        const stock = document.createElement("li");
        const boton = document.createElement("button");

        card.className = "card col-10 col-sm-8 col-md-5 col-xl-3 m-5 text-bg-danger";
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.className = "img-fluid mt-2";
        imagen.style.objectFit = "cover";
        imagen.style.height = "220px";
        body.className = "card-body";
        lista.className = "list-unstyled";
        nombre.innerHTML = `<strong>${producto.nombre}</strong>`;
        descripcion.textContent = producto.descripcion;
        precio.textContent = formatearPrecio(producto.precio);
        stock.textContent = `stock: ${producto.stock}`;
        boton.className = "btn btn-warning form-control";
        boton.type = "button";
        boton.textContent = "agregar";

        boton.addEventListener("click", function () {
            console.log("click en agregar:", producto.id);

            const usuarioLogueado = localStorage.getItem("usuario_logueado");
            const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo") || "null");
            if (usuarioLogueado === "true" && usuarioActivo && usuarioActivo.rol === "cliente") {
                console.log("usuario logueado, agregando producto");
                const seAgrego = agregarElementoAlCarrito(producto.id);
                if (seAgrego) {
                    console.log("producto agregado al carrito:", producto.id);
                    alert(`Se agregó ${producto.nombre} al carrito`);
                } else {
                    console.log("no se pudo agregar el producto:", producto.id);
                    alert("No se pudo agregar más cantidad de este producto");
                }
            } else {
                console.log("carrito solo para clientes");
                alert("El carrito es solo para clientes");
            }
        });

        lista.appendChild(nombre);
        lista.appendChild(descripcion);
        lista.appendChild(precio);
        lista.appendChild(stock);
        body.appendChild(lista);
        body.appendChild(boton);
        card.appendChild(imagen);
        card.appendChild(body);
        contenedorCards.appendChild(card);

        console.log("producto pintado en index:", producto.id);
    }
}

function formatearPrecio(precio) {
    return `$${Number(precio).toLocaleString("es-AR")}`;
}
