import { obtenerElementosDelHistorial } from "./modulos/gestorDeProductos.js";

window.addEventListener("DOMContentLoaded", function () {
    console.log("inicializando historial...");
    inicializarHistorial();
});

function inicializarHistorial() {
    const tableBodyHistorial = document.getElementById("tableBodyHistorial");
    const mensajeHistorial = document.getElementById("mensajeHistorial");

    if (!tableBodyHistorial || !mensajeHistorial) {
        return;
    }

    const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo") || "null");
    if (!usuarioActivo || usuarioActivo.rol !== "cliente") {
        console.log("historial solo para clientes");
        mensajeHistorial.classList.remove("d-none");
        mensajeHistorial.textContent = "El historial es solo para clientes.";
        tableBodyHistorial.innerHTML = "";
        return;
    }

    const productosComprados = obtenerElementosDelHistorial();
    console.log("productos comprados", productosComprados);

    tableBodyHistorial.innerHTML = "";

    if (productosComprados.length === 0) {
        console.log("historial vacio");
        mensajeHistorial.classList.remove("d-none");
        mensajeHistorial.textContent = "Todavía no hiciste compras.";
        return;
    }

    mensajeHistorial.classList.add("d-none");

    for (let i = 0; i < productosComprados.length; i++) {
        let producto = productosComprados[i];
        mostrarHistorial(producto);
    }
}

function mostrarHistorial(producto) {
    const tableBodyHistorial = document.getElementById("tableBodyHistorial");

    const tr = document.createElement("tr");
    const img = document.createElement("img"); 
    const tdImg = document.createElement("td");
    const tdProducto = document.createElement("td");
    const tdFecha = document.createElement("td");
    const tdCantidad = document.createElement("td");
    const tdTotal = document.createElement("td");
    
    img.src = producto.imagen;
    img.width = 48;
    img.height = 48;
    tdProducto.textContent = producto.nombre;
    tdFecha.textContent = producto.fecha || "sin fecha";
    tdCantidad.textContent = producto.cantidad || 1;
    tdTotal.textContent = (producto.cantidad || 1) * producto.precio;

    tdImg.appendChild(img);
    tr.appendChild(tdProducto);
    tr.appendChild(tdImg);
    tr.appendChild(tdFecha);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdTotal);

    tableBodyHistorial.appendChild(tr);
}
