import { obtenerElementosDelCarrito, eliminarProductoDelCarrito } from "./modulos/gestorDeProductos.js"

window.addEventListener("DOMContentLoaded", inicializarCarrito)

function inicializarCarrito() {
    mostrarCardsEnCarrito()
}

function mostrarCardsEnCarrito() {
    const productos = obtenerElementosDelCarrito()

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i]
        agregarProductoEnContenedor(producto)
    }
}

function agregarProductoEnContenedor(producto) {
    const divContenedorDeCards = document.getElementById("divContenedorDeCards")

    const divCard = document.createElement("div")
    const imagen = document.createElement("img")
    const divCardBody = document.createElement("div")
    const ul = document.createElement("ul")
    const liNombre = document.createElement("li")
    const liDescripcion = document.createElement("li")
    const liPrecio = document.createElement("li")
    const liStock = document.createElement("li")
    const buttonBorrar = document.createElement("button")
    const form = document.createElement("form")
    const DivDeForm = document.createElement("div")
    const spanMas = document.createElement("span")
    const botonMas = document.createElement("button")
    const input = document.createElement("input")
    const spanMenos = document.createElement("spanMenos")
    const botonMenos = document.createElement("button")

    divCard.className = "card col-10 col-sm-8 col-md-5 col-xl-3 m-5 text-bg-danger"
    imagen.src = producto.imagen
    imagen.className = "img-fluid mt-2"
    divCardBody.className = "card-body"
    ul.className = "list-unstyled"
    liNombre.textContent = producto.nombre
    liDescripcion.textContent = producto.descripcion
    liPrecio.textContent = producto.precio
    liStock.textContent = producto.stock
    buttonBorrar.className = "btn btn-warning form-control"
    buttonBorrar.textContent = "Borrar"
    form.className = "mt-3"
    DivDeForm.className = "input-group mb-3"
    spanMas.className = "input-group-text border-0 text-bg-danger"
    botonMas.className = "btn btn-warning"
    botonMas.textContent = "+"
    input.className = "form-control border-dark"
    input.type = "number"
    spanMenos.className = "input-group-text border-0 text-bg-danger"
    botonMenos.className = "btn btn-warning"
    botonMenos.textContent = "-"

    ul.appendChild(liNombre)
    ul.appendChild(liDescripcion)
    ul.appendChild(liPrecio)
    ul.appendChild(liStock)
    divCardBody.appendChild(ul)
    divCardBody.appendChild(buttonBorrar)
    divCard.appendChild(imagen)
    spanMas.appendChild(botonMas)
    spanMenos.appendChild(botonMenos)
    DivDeForm.appendChild(botonMas)
    DivDeForm.appendChild(input)
    DivDeForm.appendChild(botonMenos)
    form.appendChild(DivDeForm)
    divCardBody.appendChild(form)
    divCard.appendChild(divCardBody)

    divContenedorDeCards.appendChild(divCard)

    const botonBorrar = divCard.querySelector("button")

    botonBorrar.addEventListener("click", BorrarProductosDelCarrito)
}

function BorrarProductosDelCarrito() {
    let producto = obtenerElementosDelCarrito()
    for (let i = 0; i < producto.length; i++) {
        eliminarProductoDelCarrito(producto[i])
    }
}




