const bodyTableListadoDeUsuarios = document.getElementById("bodyTableListadoDeUsuarios")

localStorage.getItem("nombreCompleto", nombreCompleto);

function mostrarListaDeMovimiento() {
    for (let i = 0; i < localStorage.length; i++) {
        tr = document.createElement("tr")
        td_1 = document.createElement("td")
        botonEliminar = document.createElement("input")
        botonEliminar.type = "button"
        botonEliminar.value = "eliminar"

        td_1.textContent = mostrarEnTd.localStorage
        botonEliminar.textContent = botonEliminar

        tr.appendChild(td_1)
        tr.appendChild(botonEliminar)

         bodyTableListadoDeUsuarios.appendChild(tr)
    }
}