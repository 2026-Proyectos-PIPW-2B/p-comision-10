
export function obtenerArreglo(clave){
    let valor = localStorage.getItem(clave)
    if (valor){
        return JSON.parse(valor)
    }else{
        return []
    }
}

export function setearArreglo(clave, arreglo){
    let arregloConvertido = JSON.stringify(arreglo)
    let valor = localStorage.setItem(clave, arregloConvertido)
}