import { agregarElementoAlCarrito, listarProductos} from "./modulos/gestorDeProductos.js"

window.addEventListener("DOMContentLoaded", function () {
    mostrarCardsEnIndex()
    filtrarProductos()
})

function inicializarIndex() {
    console.log("ding dom dom dom - index");
    inicializarProductos();
    renderizarProductos();
}

function renderizarProductos() {
    console.log("renderizando productos del index");
    const contenedorCards = document.getElementById("divContenedorCards");

    if (!contenedorCards) {
        console.log("no se encontro el contenedor de cards");
        return;
    }

    const productos = obtenerProductos();
    console.log("productos para pintar en index:", productos);

    contenedorCards.innerHTML = "";

    if (productos.length === 0) {
        const mensaje = document.createElement("div");
        mensaje.className = "col-12 text-center mt-5";
        mensaje.innerHTML = `
            <div class="alert alert-warning mx-auto w-75">
                No hay productos cargados todavía.
            </div>
        `;

        contenedorCards.appendChild(mensaje);
        return;
    }
}

function agregarProductoEnContenedor(producto) {
    const divContenedorCards = document.getElementById("divContenedorCards")

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
    imagen.src = producto.imagen
    imagen.className = "img-fluid mt-2"
    divCardBody.className = "card-body"
    ul.className = "list-unstyled"
    liNombre.textContent = producto.nombre
    liDescripcion.textContent = producto.descripcion
    liPrecio.textContent = producto.precio
    liStock.textContent = producto.stock
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

    botonAgregar.addEventListener("click", function () {
        agregarElementoAlCarrito(producto.id)
    })
}

function filtrarProductos() {
    const divContenedorCards = document.getElementById("divContenedorCards")
    const input = document.getElementById("inputFiltrarProducto")
    const cardsProductos = listarProductos()

    const arrayParaFiltrar = []

    input.addEventListener("input", function () {
        const productoFiltrado = document.getElementById("inputFiltrarProducto").value.toLowerCase().trim()

        for (let i = 0; i < cardsProductos.length; i++) {
            if (productoFiltrado.includes(input)) {
                divContenedorCards.innerHTML = ""
                arrayParaFiltrar.push(cardsProductos[i])
                agregarProductoEnContenedor(arrayParaFiltrar)
            }
        }
    })}