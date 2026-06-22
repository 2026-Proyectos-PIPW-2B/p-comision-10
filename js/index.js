window.addEventListener("DOMContentLoaded", inicializarIndex)

function inicializarIndex() {
    mostrarCardsEnIndex()
}

function mostrarCardsEnIndex() {
    const divContenedorCards = document.getElementById("divContenedorCards")

    const objectCards = {
        imagen: "imagenes\logo.png",
        nombre: "hamburguesa",
        descripcion: "esto es una hamburguesa",
        precio: 5000,
        stock: 3,
    }

    //for (let i = 0; i < objectCards.length; i++) {
    const divCard = document.createElement("div")
    const imagen = document.createElement("img")
    const divCardBody = document.createElement("div")
    const ul = document.createElement("ul")
    const liNombre = document.createElement("li")
    const liDescripcion = document.createElement("li")
    const liPrecio = document.createElement("li")
    const liStock = document.createElement("li")
    const button = document.createElement("button")

    divCard.className = "card col-10 col-sm-8 col-md-5 col-xl-3 m-5 text-bg-danger"
    imagen.src = objectCards.imagen
    imagen.className = "img-fluid mt-2"
    divCardBody.className = "card-body"
    ul.className = "list-unstyled"
    liNombre.textContent = objectCards.nombre
    liDescripcion.textContent = objectCards.descripcion
    liPrecio.textContent = objectCards.precio
    liStock.textContent = objectCards.stock
    button.className = "btn btn-warning form-control"
    button.textContent = "Agregar"

    ul.appendChild(liNombre)
    ul.appendChild(liDescripcion)
    ul.appendChild(liPrecio)
    ul.appendChild(liStock)
    divCardBody.appendChild(ul)
    divCardBody.appendChild(button)
    divCard.appendChild(imagen)
    divCard.appendChild(divCardBody)

    divContenedorCards.appendChild(divCard)

    const botonAgregar = divCard.querySelector("button")

    botonAgregar.addEventListener("click", agregarProductosAlCarrito)
    //}

}

function agregarProductosAlCarrito() {
    alert("hola")
}
