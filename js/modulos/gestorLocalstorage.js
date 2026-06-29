export function obtenerValor(clave) {
    const valor = localStorage.getItem(clave);

    if (!valor) {
        return [];
    }

    return JSON.parse(valor);
}

export function setearValor(clave, valor) {
    const valorConvertido = JSON.stringify(valor);
    localStorage.setItem(clave, valorConvertido);
}

export function eliminarValor(clave) {
    localStorage.removeItem(clave);
}

export function obtenerArreglo(clave) {
    return obtenerValor(clave);
}

export function setearArreglo(clave, arreglo) {
    setearValor(clave, arreglo);
}
