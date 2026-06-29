
export function obtenerValor(clave){
    let valor = localStorage.getItem(clave)
    return JSON.parse(valor)
}

export function setearValor(clave, valor){
    let valorConvertido = JSON.stringify(valor)
    localStorage.setItem(clave, valorConvertido)
}

export function eliminarValor(clave){
    localStorage.removeItem(clave)
}