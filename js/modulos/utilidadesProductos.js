export function normalizarTexto(valor) {
    return valor.trim();
}

export function normalizarNumero(valor) {
    return Number.parseFloat(valor);
}

export function validarProducto(nombre, descripcion, stock, precio, mensaje) {
    console.log("validando producto:", { nombre, descripcion, stock, precio });

    if (nombre.length < 3) {
        mostrarMensaje(mensaje, "El nombre del producto debe tener al menos 3 caracteres.", "danger");
        return false;
    }

    if (descripcion.length < 5) {
        mostrarMensaje(mensaje, "La descripción debe tener al menos 5 caracteres.", "danger");
        return false;
    }

    if (!Number.isFinite(stock) || stock < 0) {
        mostrarMensaje(mensaje, "El stock debe ser un número válido mayor o igual a 0.", "danger");
        return false;
    }

    if (!Number.isFinite(precio) || precio <= 0) {
        mostrarMensaje(mensaje, "El precio debe ser un número válido mayor a 0.", "danger");
        return false;
    }

    return true;
}

export function mostrarMensaje(elemento, texto, tipo) {
    if (!elemento) {
        return;
    }

    console.log("mostrando mensaje:", texto, tipo);
    elemento.className = `alert alert-${tipo} mt-3`;
    elemento.textContent = texto;
}

export function ponerClaseEnStock(stock) {
    if (stock <= 10) {
        return "text-bg-danger";
    }

    if (stock <= 30) {
        return "text-bg-warning";
    }

    return "text-bg-success";
}

export function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(precio);
}
