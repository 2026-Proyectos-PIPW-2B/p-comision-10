import {obtenerElementosDelHistorial} from "./modulos/gestorDeProductos.js";

window.addEventListener("DOMContentLoaded", function(){
    inicializarHistorial()
})


function inicializarHistorial() {

    const productosComprados = obtenerElementosDelHistorial()
    console.log("productos comprados", productosComprados)

    for (let i = 0; i < productosComprados.length; i++) {
        let producto = productosComprados[i]
        mostrarHistorial(producto)
    }
}

function mostrarHistorial(producto) {
    const tableBodyHistorial = document.getElementById("tableBodyHistorial")

    const tr = document.createElement("tr")
    const img = document.createElement("img")
    const tdProducto = document.createElement("td")
    const tdFecha = document.createElement("td")
    const tdCantidad = document.createElement("td")
    const tdTotal = document.createElement("td")

    img.src = producto.imagen
    img.width = 60
    img.height = 60
    tdProducto.textContent = producto.nombre
    tdFecha.textContent = producto.fecha || "sin fecha"
    tdCantidad.textContent = producto.stock
    tdTotal.textContent = producto.stock * producto.precio

    tdProducto.appendChild(img)
    tr.appendChild(tdProducto)
    tr.appendChild(tdFecha)
    tr.appendChild(tdCantidad)
    tr.appendChild(tdTotal)

    tableBodyHistorial.appendChild(tr)
}
