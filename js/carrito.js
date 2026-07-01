import { obtenerElementosDelCarrito, eliminarProductoCarrito, agregarProductoHistorial, descontarStockProducto } from "./modulos/gestorDeProductos.js"

window.addEventListener("DOMContentLoaded", function () {
    mostrarCardsEnCarrito()
    comprarProductos()
})

function mostrarCardsEnCarrito() {
    const divContenedorDeCards = document.getElementById("divContenedorDeCards")
    divContenedorDeCards.innerHTML = ""

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
    const spanMenos = document.createElement("span")
    const botonMenos = document.createElement("button")

    divCard.className = "card col-10 col-sm-8 col-md-5 col-xl-3 m-5 text-bg-danger"
    imagen.src = producto.imagen
    imagen.className = "img-fluid mt-2"
    divCardBody.className = "card-body"
    ul.className = "list-unstyled"
    liNombre.textContent = producto.nombre
    liDescripcion.textContent = producto.descripcion
    liPrecio.textContent = producto.precio
    liStock.textContent = "stock: " + producto.stock
    buttonBorrar.className = "btn btn-warning form-control"
    buttonBorrar.type = "button"
    buttonBorrar.textContent = "Borrar"
    form.className = "mt-3"
    DivDeForm.className = "input-group mb-3"
    spanMas.className = "input-group-text border-0 text-bg-danger"
    botonMas.className = "btn btn-warning btnMas"
    botonMas.type = "button"
    botonMas.textContent = "+"
    input.className = "form-control border-dark"
    input.type = "number"
    input.value = 1
    input.min = 1
    input.max = producto.stock
    input.setAttribute("data-id", producto.id)
    spanMenos.className = "input-group-text border-0 text-bg-danger"
    botonMenos.className = "btn btn-warning btnMenos"
    botonMenos.type = "button"
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
    const inputCantidad = divCard.querySelector("input")
    const btnMenos = divCard.querySelector(".btnMenos")
    const btnMas = divCard.querySelector(".btnMas")

    botonBorrar.addEventListener("click", function () {
        eliminarProductoCarrito(producto.id)
        mostrarCardsEnCarrito()
    })

    btnMas.addEventListener("click", function () {
        let cantidadActual = Number(inputCantidad.value)
        if (cantidadActual < producto.stock) {
            inputCantidad.value = cantidadActual + 1
        }
    })

    btnMenos.addEventListener("click", function () {
        let cantidadActual = Number(inputCantidad.value)
        if (cantidadActual > 1) {
            inputCantidad.value = cantidadActual - 1
        }
    })
}

function comprarProductos() {
    const botonComprar = document.getElementById("comprarProductos")

    botonComprar.addEventListener("click", function () {
        const productos = obtenerElementosDelCarrito()

        if (productos.length === 0) {
            alert("tu carrito esta vacio")
            return
        }

        alert("tu compra ah sido exitosa")

        for (let i = 0; i < productos.length; i++) {
            let producto = productos[i]

            // leer la cantidad elegida por el usuario en el input
            const inputCantidad = document.querySelector("input[data-id='" + producto.id + "']")
            let cantidad = 1
            if (inputCantidad) {
                cantidad = Number(inputCantidad.value)
            }

            // descontar el stock del producto en el almacen
            descontarStockProducto(producto.id, cantidad)

            // guardar en historial con la cantidad comprada
            agregarProductoHistorial(producto, cantidad)

            eliminarProductoCarrito(producto.id)
        }

        mostrarCardsEnCarrito()
    })
}
