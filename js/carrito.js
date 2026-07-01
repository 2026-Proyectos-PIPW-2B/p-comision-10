import {
    agregarProductoHistorial,
    aumentarCantidadProductoCarrito,
    descontarStockProducto,
    disminuirCantidadProductoCarrito,
    eliminarProductoCarrito,
    obtenerElementosDelCarrito,
    obtenerCantidadTotalCarrito,
    obtenerTotalCarrito,
    actualizarCantidadProductoCarrito,
    vaciarCarrito,
} from "./modulos/gestorDeProductos.js";

window.addEventListener("DOMContentLoaded", function () {
    console.log("inicializando carrito...");
    conectarBotonesGenerales();
    mostrarCarrito();
});

function conectarBotonesGenerales() {
    const botonComprar = document.getElementById("comprarProductos");
    const botonVaciar = document.getElementById("vaciarCarrito");

    if (botonComprar) {
        console.log("boton comprar conectado");
        botonComprar.addEventListener("click", comprarProductos);
    }

    if (botonVaciar) {
        console.log("boton vaciar conectado");
        botonVaciar.addEventListener("click", function () {
            console.log("vaciar carrito solicitado");
            if (confirm("¿Querés vaciar el carrito?")) {
                console.log("carrito vaciado");
                vaciarCarrito();
                mostrarCarrito();
            }
        });
    }
}

function mostrarCarrito() {
    console.log("mostrando carrito");
    const contenedor = document.getElementById("divContenedorDeCards");
    const mensajeCarrito = document.getElementById("mensajeCarrito");
    const cantidadProductosCarrito = document.getElementById("cantidadProductosCarrito");
    const cantidadTotalCarrito = document.getElementById("cantidadTotalCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const productos = obtenerElementosDelCarrito();

    if (!contenedor || !mensajeCarrito) {
        return;
    }

    contenedor.innerHTML = "";

    if (!esClienteActivo()) {
        console.log("carrito no disponible para este usuario");
        mensajeCarrito.classList.remove("d-none");
        mensajeCarrito.classList.remove("alert-light");
        mensajeCarrito.classList.add("alert-warning");
        mensajeCarrito.textContent = "El carrito es solo para clientes.";

        if (cantidadProductosCarrito) {
            cantidadProductosCarrito.textContent = "0 productos";
        }

        if (cantidadTotalCarrito) {
            cantidadTotalCarrito.textContent = "0";
        }

        if (totalCarrito) {
            totalCarrito.textContent = "$0";
        }

        deshabilitarControlesCarrito(true);
        return;
    }

    deshabilitarControlesCarrito(false);
    mensajeCarrito.classList.add("alert-light");
    mensajeCarrito.classList.remove("alert-warning");

    if (productos.length === 0) {
        console.log("carrito vacio");
        mensajeCarrito.classList.remove("d-none");
        mensajeCarrito.textContent = "Tu carrito está vacío.";
    } else {
        console.log("productos en carrito:", productos);
        mensajeCarrito.classList.add("d-none");
    }

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        console.log("pintando producto del carrito:", producto.id);
        const card = crearCardProducto(producto);
        contenedor.appendChild(card);
    }

    if (cantidadProductosCarrito) {
        const cantidad = obtenerCantidadTotalCarrito();
        cantidadProductosCarrito.textContent = `${cantidad} producto${cantidad === 1 ? "" : "s"}`;
    }

    if (cantidadTotalCarrito) {
        cantidadTotalCarrito.textContent = obtenerCantidadTotalCarrito();
    }

    if (totalCarrito) {
        totalCarrito.textContent = formatearPrecio(obtenerTotalCarrito());
    }
}

function crearCardProducto(producto) {
    console.log("creando tarjeta del carrito:", producto.id);
    const columna = document.createElement("div");
    const card = document.createElement("article");
    const imagen = document.createElement("img");
    const cuerpo = document.createElement("div");
    const titulo = document.createElement("h3");
    const descripcion = document.createElement("p");
    const precio = document.createElement("p");
    const stock = document.createElement("p");
    const controlesCantidad = document.createElement("div");
    const botonMenos = document.createElement("button");
    const inputCantidad = document.createElement("input");
    const botonMas = document.createElement("button");
    const botonEliminar = document.createElement("button");

    columna.className = "col-12 col-md-6";
    card.className = "card h-100 border-warning shadow-sm";
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.className = "card-img-top";
    imagen.style.height = "180px";
    imagen.style.objectFit = "cover";
    cuerpo.className = "card-body";
    titulo.className = "h5 card-title";
    titulo.textContent = producto.nombre;
    descripcion.className = "card-text";
    descripcion.textContent = producto.descripcion;
    precio.className = "mb-2";
    precio.textContent = `Precio unitario: ${formatearPrecio(producto.precio)}`;
    stock.className = "mb-3";
    stock.textContent = `Stock disponible: ${producto.stock}`;
    controlesCantidad.className = "input-group mb-3";
    botonMenos.className = "btn btn-warning";
    botonMenos.type = "button";
    botonMenos.textContent = "-";
    inputCantidad.className = "form-control text-center";
    inputCantidad.type = "number";
    inputCantidad.min = "1";
    inputCantidad.max = String(producto.stock);
    inputCantidad.value = String(producto.cantidad || 1);
    botonMas.className = "btn btn-warning";
    botonMas.type = "button";
    botonMas.textContent = "+";
    botonEliminar.className = "btn btn-danger w-100";
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";

    botonMas.addEventListener("click", function () {
        console.log("sumando cantidad:", producto.id);
        const seActualizo = aumentarCantidadProductoCarrito(producto.id);
        if (!seActualizo) {
            console.log("no se pudo sumar cantidad:", producto.id);
            alert("No se puede agregar más de este producto");
            return;
        }
        mostrarCarrito();
    });

    botonMenos.addEventListener("click", function () {
        console.log("restando cantidad:", producto.id);
        disminuirCantidadProductoCarrito(producto.id);
        mostrarCarrito();
    });

    inputCantidad.addEventListener("change", function () {
        console.log("cambiando cantidad:", producto.id, inputCantidad.value);
        actualizarCantidadProductoCarrito(producto.id, inputCantidad.value);
        mostrarCarrito();
    });

    botonEliminar.addEventListener("click", function () {
        console.log("eliminando producto del carrito:", producto.id);
        eliminarProductoCarrito(producto.id);
        mostrarCarrito();
    });

    controlesCantidad.appendChild(botonMenos);
    controlesCantidad.appendChild(inputCantidad);
    controlesCantidad.appendChild(botonMas);
    cuerpo.appendChild(titulo);
    cuerpo.appendChild(descripcion);
    cuerpo.appendChild(precio);
    cuerpo.appendChild(stock);
    cuerpo.appendChild(controlesCantidad);
    cuerpo.appendChild(botonEliminar);
    card.appendChild(imagen);
    card.appendChild(cuerpo);
    columna.appendChild(card);

    return columna;
}

function comprarProductos() {
    console.log("comprando productos");
    const productos = obtenerElementosDelCarrito();

    if (productos.length === 0) {
        console.log("no hay productos para comprar");
        alert("Tu carrito está vacío");
        return;
    }

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const cantidad = Number(producto.cantidad || 1);

        console.log("procesando compra:", producto.id, cantidad);
        descontarStockProducto(producto.id, cantidad);
        agregarProductoHistorial(producto, cantidad);
        eliminarProductoCarrito(producto.id);
    }

    console.log("compra terminada");
    alert("Tu compra fue exitosa");
    mostrarCarrito();
}

function formatearPrecio(precio) {
    return `$${Number(precio).toLocaleString("es-AR")}`;
}

function esClienteActivo() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo") || "null");
    return Boolean(usuarioActivo && usuarioActivo.rol === "cliente");
}

function deshabilitarControlesCarrito(deshabilitar) {
    const botonComprar = document.getElementById("comprarProductos");
    const botonVaciar = document.getElementById("vaciarCarrito");

    if (botonComprar) {
        botonComprar.disabled = deshabilitar;
    }

    if (botonVaciar) {
        botonVaciar.disabled = deshabilitar;
    }
}
