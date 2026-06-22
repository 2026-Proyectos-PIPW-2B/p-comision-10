import {obtenerValor} from "./gestorLocalstorage.js"

const clave_productos_ls = "productos"

export function listarProductos(){
    const productos = obtenerValor(clave_productos_ls)
    return productos || []
}
