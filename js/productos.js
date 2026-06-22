import {
    agregarProducto,
    editarProducto,
    eliminarProducto,
    inicializarProductos,
    obtenerProductoPorId,
    obtenerProductos,
} from "./modulos/gestorDeProductos.js";
import {
    formatearPrecio,
    mostrarMensaje,
    normalizarNumero,
    normalizarTexto,
    ponerClaseEnStock,
    validarProducto,
} from "./modulos/utilidadesProductos.js";

window.addEventListener("DOMContentLoaded", function () {
    console.log("ding dom dom dom - productos");
    inicializarProductos();
    conectarFormularioCreacion();
    conectarFormularioEdicion();
    renderizarProductos();
});

function conectarFormularioCreacion() {
    const formulario = document.getElementById("formularioProducto");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        console.log("submit de crear producto");

        const nombre = normalizarTexto(document.getElementById("inputNombreProducto").value);
        const descripcion = normalizarTexto(document.getElementById("inputDescripcionProducto").value);
        const stock = normalizarNumero(document.getElementById("inputStockProducto").value);
        const precio = normalizarNumero(document.getElementById("inputPrecioProducto").value);
        const imagen = normalizarTexto(document.getElementById("inputImagenProducto").value) || "imagenes/logo.png";
        const mensaje = document.getElementById("mensajeProductos");
        console.log("valores capturados:", { nombre, descripcion, stock, precio, imagen });

        if (!validarProducto(nombre, descripcion, stock, precio, mensaje)) {
            console.log("validacion de producto fallida");
            return;
        }

        agregarProducto(nombre, descripcion, stock, precio, imagen);

        formulario.reset();
        console.log("formulario de producto limpiado");
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
    console.log("parametro id de edicion:", idProducto);
    const producto = idProducto ? obtenerProductoPorId(idProducto) : obtenerProductos()[0];
    const mensaje = document.getElementById("mensajeEdicionProductos");

    if (!producto) {
        console.log("no hay producto para editar");
        mostrarMensaje(mensaje, "No hay productos cargados para editar.", "warning");
        return;
    }

    console.log("cargando producto en formulario de edicion:", producto);
    document.getElementById("inputIdProductoEditar").value = producto.id;
    document.getElementById("inputNombreProductoEditar").value = producto.nombre;
    document.getElementById("inputDescripcionProductoEditar").value = producto.descripcion;
    document.getElementById("inputStockProductoEditar").value = producto.stock;
    document.getElementById("inputPrecioProductoEditar").value = producto.precio;
    document.getElementById("inputImagenProductoEditar").value = producto.imagen;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        console.log("submit de editar producto");

        const productoActualizado = {
            id: document.getElementById("inputIdProductoEditar").value,
            nombre: normalizarTexto(document.getElementById("inputNombreProductoEditar").value),
            descripcion: normalizarTexto(document.getElementById("inputDescripcionProductoEditar").value),
            stock: normalizarNumero(document.getElementById("inputStockProductoEditar").value),
            precio: normalizarNumero(document.getElementById("inputPrecioProductoEditar").value),
            imagen: normalizarTexto(document.getElementById("inputImagenProductoEditar").value) || "imagenes/logo.png",
        };
        console.log("datos nuevos del producto:", productoActualizado);

        if (!validarProducto(productoActualizado.nombre, productoActualizado.descripcion, productoActualizado.stock, productoActualizado.precio, mensaje)) {
            console.log("validacion de edicion fallida");
            return;
        }

        const guardado = editarProducto(productoActualizado);

        if (!guardado) {
            console.log("no se pudo guardar la edicion");
            mostrarMensaje(mensaje, "No se encontró el producto para actualizar.", "danger");
            return;
        }

        console.log("edicion guardada con exito");
        mostrarMensaje(mensaje, "Producto actualizado correctamente.", "success");
        renderizarProductos();
    });
}

function renderizarProductos() {
    console.log("mostrando productos en tablas");
    const cuerposTabla = document.querySelectorAll("[data-productos-tabla]");
    const productos = obtenerProductos();
    console.log("productos que hay que  mostrar:", productos);

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
            console.log("fila producto:", producto.id);

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
            console.log("click en eliminar producto:", idProducto);

            if (window.confirm("¿Querés eliminar este producto?")) {
                eliminarProducto(idProducto);

                const formularioEdicion = document.getElementById("formularioEdicionProducto");
                const idEnEdicion = document.getElementById("inputIdProductoEditar");

                if (formularioEdicion && idEnEdicion && idEnEdicion.value === idProducto) {
                    const productosRestantes = obtenerProductos();

                    if (productosRestantes.length > 0) {
                        console.log("producto borrado era el editado, cargando otro");
                        window.location.href = `editar_productos.html?id=${productosRestantes[0].id}`;
                        return;
                    }

                    formularioEdicion.reset();
                    mostrarMensaje(document.getElementById("mensajeEdicionProductos"), "No quedan productos para editar.", "warning");
                }

                console.log("producto eliminado");
                renderizarProductos();
            }
        });
    });
}
