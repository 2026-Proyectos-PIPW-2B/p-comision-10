import {
    agregarProducto,
    editarProducto,
    eliminarProducto,
    inicializarProductos,
    obtenerProductoPorId,
    obtenerProductos,
} from "./modulos/gestorDeProductos.js";

window.addEventListener("DOMContentLoaded", function () {
    inicializarProductos();
    conectarFormularioCreacion();
    conectarFormularioEdicion();
    renderizarProductos();
});

function crearIdProducto() {
    const idNuevo = `p${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    return idNuevo;
}

function normalizarTexto(valor) {
    return valor.trim();
}

function normalizarNumero(valor) {
    return Number.parseFloat(valor);
}

function conectarFormularioCreacion() {
    const formulario = document.getElementById("formularioProducto");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = normalizarTexto(document.getElementById("inputNombreProducto").value);
        const descripcion = normalizarTexto(document.getElementById("inputDescripcionProducto").value);
        const stock = normalizarNumero(document.getElementById("inputStockProducto").value);
        const precio = normalizarNumero(document.getElementById("inputPrecioProducto").value);
        const imagen = normalizarTexto(document.getElementById("inputImagenProducto").value) || "imagenes/logo.png";
        const mensaje = document.getElementById("mensajeProductos");

        if (!validarProducto(nombre, descripcion, stock, precio, mensaje)) {
            return;
        }

        agregarProducto(nombre, descripcion, stock, precio, imagen);

        formulario.reset();
        mostrarMensaje(mensaje, "Producto creado correctamente.", "success");
        renderizarProductos();
    });
}

function conectarFormularioEdicion() {
    const formulario = document.getElementById("formularioEdicionProducto");

    if (!formulario) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const idProducto = parametros.get("id");
    const producto = idProducto ? obtenerProductoPorId(idProducto) : obtenerProductos()[0];
    const mensaje = document.getElementById("mensajeEdicionProductos");

    if (!producto) {

        mostrarMensaje(mensaje, "No hay productos cargados para editar.", "warning");
        return;
    }

    document.getElementById("inputIdProductoEditar").value = producto.id;
    document.getElementById("inputNombreProductoEditar").value = producto.nombre;
    document.getElementById("inputDescripcionProductoEditar").value = producto.descripcion;
    document.getElementById("inputStockProductoEditar").value = producto.stock;
    document.getElementById("inputPrecioProductoEditar").value = producto.precio;
    document.getElementById("inputImagenProductoEditar").value = producto.imagen;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const productoActualizado = {
            id: document.getElementById("inputIdProductoEditar").value,
            nombre: normalizarTexto(document.getElementById("inputNombreProductoEditar").value),
            descripcion: normalizarTexto(document.getElementById("inputDescripcionProductoEditar").value),
            stock: normalizarNumero(document.getElementById("inputStockProductoEditar").value),
            precio: normalizarNumero(document.getElementById("inputPrecioProductoEditar").value),
            imagen: normalizarTexto(document.getElementById("inputImagenProductoEditar").value) || "imagenes/logo.png",
        };

        if (!validarProducto(productoActualizado.nombre, productoActualizado.descripcion, productoActualizado.stock, productoActualizado.precio, mensaje)) {
            return;
        }

        const guardado = editarProducto(productoActualizado);

        if (!guardado) {
            mostrarMensaje(mensaje, "No se encontró el producto para actualizar.", "danger");
            return;
        }

        mostrarMensaje(mensaje, "Producto actualizado correctamente.", "success");
        renderizarProductos();
    });
}

function validarProducto(nombre, descripcion, stock, precio, mensaje) {
    if (nombre.length < 3) {
        mostrarMensaje(mensaje, "El nombre del producto debe tener al menos 3 caracteres.", "danger");
        return false;
    }

    if (descripcion.length < 5) {
        mostrarMensaje(mensaje, "La descripción debe tener al menos 5 caracteres.", "danger");
        return false;
    }

    if (!Number.isFinite(stock) || stock < 0) {
        mostrarMensaje(mensaje, "El stock debe ser un número válido mayor o igual a 0.", "danger");
        return false;
    }

    if (!Number.isFinite(precio) || precio <= 0) {
        mostrarMensaje(mensaje, "El precio debe ser un número válido mayor a 0.", "danger");
        return false;
    }

    return true;
}

function mostrarMensaje(elemento, texto, tipo) {
    if (!elemento) {
        return;
    }

    elemento.className = `alert alert-${tipo} mt-3`;
    elemento.textContent = texto;
}

function renderizarProductos() {
    const cuerposTabla = document.querySelectorAll("[data-productos-tabla]");
    const productos = obtenerProductos();

    cuerposTabla.forEach(function (cuerpoTabla) {
        cuerpoTabla.innerHTML = "";

        if (productos.length === 0) {
            const filaVacia = document.createElement("tr");
            const celdaVacia = document.createElement("td");

            celdaVacia.colSpan = 5;
            celdaVacia.className = "text-center py-4";
            celdaVacia.textContent = "No hay productos cargados todavía.";
            console.log("tabla vacia, mostrando estado inicial");

            filaVacia.appendChild(celdaVacia);
            cuerpoTabla.appendChild(filaVacia);
            return;
        }

        productos.forEach(function (producto) {
            const fila = document.createElement("tr");
            const celdaProducto = document.createElement("td");
            const celdaDescripcion = document.createElement("td");
            const celdaStock = document.createElement("td");
            const celdaPrecio = document.createElement("td");
            const celdaAcciones = document.createElement("td");

            celdaProducto.innerHTML = `
                <div class="d-flex align-items-center gap-2">
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="40" height="40" class="rounded object-fit-cover" />
                    <span>${producto.nombre}</span>
                </div>
            `;
            celdaDescripcion.textContent = producto.descripcion;
            celdaStock.innerHTML = `<span class="badge ${ponerClaseEnStock(producto.stock)}">${producto.stock}</span>`;
            celdaPrecio.textContent = formatearPrecio(producto.precio);
            celdaAcciones.innerHTML = `
                <div class="d-flex gap-2">
                    <a class="btn btn-warning btn-sm" href="editar_productos.html?id=${producto.id}">editar</a>
                    <button class="btn btn-danger btn-sm" type="button" data-eliminar-producto="${producto.id}">eliminar</button>
                </div>
            `;

            fila.appendChild(celdaProducto);
            fila.appendChild(celdaDescripcion);
            fila.appendChild(celdaStock);
            fila.appendChild(celdaPrecio);
            fila.appendChild(celdaAcciones);
            cuerpoTabla.appendChild(fila);
        });
    });

    document.querySelectorAll("[data-eliminar-producto]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const idProducto = boton.getAttribute("data-eliminar-producto");

            if (window.confirm("¿Querés eliminar este producto?")) {
                eliminarProducto(idProducto);

                const formularioEdicion = document.getElementById("formularioEdicionProducto");
                const idEnEdicion = document.getElementById("inputIdProductoEditar");

                if (formularioEdicion && idEnEdicion && idEnEdicion.value === idProducto) {
                    const productosRestantes = obtenerProductos();

                    if (productosRestantes.length > 0) {
                        window.location.href = `editar_productos.html?id=${productosRestantes[0].id}`;
                        return;
                    }

                    formularioEdicion.reset();
                    mostrarMensaje(document.getElementById("mensajeEdicionProductos"), "No quedan productos para editar.", "warning");
                }

                renderizarProductos();
            }
        });
    });
}

function ponerClaseEnStock(stock) {
    if (stock <= 10) {
        return "text-bg-danger";
    }

    if (stock <= 30) {
        return "text-bg-warning";
    }

    return "text-bg-success";
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(precio);
}
