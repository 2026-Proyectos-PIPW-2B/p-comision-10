// mas facil de encontrar
const productos_en_ls = "productos";
// como comento fede
const productos = [
    {
        id: "1",
        nombre: "Hamburguesa Clásica",
        descripcion: "La hamburguesa de siempre, al estilo Burguer PIWP.",
        stock: 190,
        precio: 5000,
        imagen: "imagenes/OIP.webp",
    },
    {
        id: "2",
        nombre: "Hamburguesa Doble",
        descripcion: "Más carne, más sabor y más ganas de repetir.",
        stock: 120,
        precio: 6800,
        imagen: "imagenes/OIP (1).webp",
    },
    {
        id: "3",
        nombre: "Hamburguesa Vegana",
        descripcion: "Una opción más liviana sin perder el estilo.",
        stock: 75,
        precio: 6200,
        imagen: "imagenes/descarga.webp",
    },
];
// es muy parecido al del login
window.addEventListener("DOMContentLoaded", function () {
    console.log("ding dom dom dom - productos");
    inicializarProductos();
    conectarFormularioCreacion();
    conectarFormularioEdicion();
    renderizarProductos();
});
// como afanamos de LIPW jaja
function inicializarProductos() {
    console.log("inicializando productos...");
    const productosGuardados = obtenerProductos();
    console.log("productos guardados:", productosGuardados);

    if (productosGuardados.length === 0) {
        console.log("no habia productos, cargando ejemplos");
        guardarProductos(productos);
    }
}

function obtenerProductos() {
    console.log("leyendo productos desde ls");
    const productos = localStorage.getItem(productos_en_ls);

    if (!productos) {
        console.log("no existe la clave de productos todavia");
        return [];
    }

    try {
        const productosParseados = JSON.parse(productos);
        console.log("productos...", productosParseados);
        return Array.isArray(productosParseados) ? productosParseados : [];
    } catch (error) {
        console.error("No se pudieron leer los productos:", error);
        return [];
    }
}

function guardarProductos(productos) {
    console.log("guardando productos en ls:", productos);
    localStorage.setItem(productos_en_ls, JSON.stringify(productos));
}

function crearIdProducto() {
    const idNuevo = `p${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    console.log("id de nuevo producto:", idNuevo);
    return idNuevo;
}

function normalizarTexto(valor) {
    return valor.trim();
}

function normalizarNumero(valor) {
    return Number.parseFloat(valor);
}

function obtenerProductoPorId(idProducto) {
    console.log("buscando producto por id:", idProducto);
    return obtenerProductos().find(function (producto) {
        return producto.id === idProducto;
    });
}

function agregarProducto(productoNuevo) {
    console.log("agregando producto:", productoNuevo);
    const productos = obtenerProductos();
    productos.push(productoNuevo);
    guardarProductos(productos);
}

function actualizarProducto(productoActualizado) {
    console.log("actualizando producto:", productoActualizado);
    const productos = obtenerProductos();
    const indice = productos.findIndex(function (producto) {
        return producto.id === productoActualizado.id;
    });

    if (indice === -1) {
        console.log("no se encontro el producto para actualizar");
        return false;
    }

    productos[indice] = productoActualizado;
    guardarProductos(productos);
    console.log("producto actualizado ok");
    return true;
}

function eliminarProducto(idProducto) {
    console.log("eliminando producto:", idProducto);
    const productos = obtenerProductos();
    const productosFiltrados = productos.filter(function (producto) {
        return producto.id !== idProducto;
    });

    guardarProductos(productosFiltrados);
}

function conectarFormularioCreacion() {
    const formulario = document.getElementById("formularioProducto");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        console.log("submit de crear producto");

        const nombre = normalizarTexto(document.getElementById("inputNombreProducto").value);
        const descripcion = normalizarTexto(document.getElementById("inputDescripcionProducto").value);
        const stock = normalizarNumero(document.getElementById("inputStockProducto").value);
        const precio = normalizarNumero(document.getElementById("inputPrecioProducto").value);
        const imagen = normalizarTexto(document.getElementById("inputImagenProducto").value) || "imagenes/logo.png";
        const mensaje = document.getElementById("mensajeProductos");
        console.log("valores capturados:", { nombre, descripcion, stock, precio, imagen });

        if (!validarProducto(nombre, descripcion, stock, precio, mensaje)) {
            console.log("validacion de producto fallida");
            return;
        }

        agregarProducto({
            id: crearIdProducto(),
            nombre,
            descripcion,
            stock,
            precio,
            imagen,
        });

        formulario.reset();
        console.log("formulario de producto limpiado");
        mostrarMensaje(mensaje, "Producto creado correctamente.", "success");
        renderizarProductos();
    });
}

function conectarFormularioEdicion() {
    const formulario = document.getElementById("formularioEdicionProducto");

    if (!formulario) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const idProducto = parametros.get("id");
    console.log("parametro id de edicion:", idProducto);
    const producto = idProducto ? obtenerProductoPorId(idProducto) : obtenerProductos()[0];
    const mensaje = document.getElementById("mensajeEdicionProductos");

    if (!producto) {
        console.log("no hay producto para editar");
        mostrarMensaje(mensaje, "No hay productos cargados para editar.", "warning");
        return;
    }

    console.log("cargando producto en formulario de edicion:", producto);
    document.getElementById("inputIdProductoEditar").value = producto.id;
    document.getElementById("inputNombreProductoEditar").value = producto.nombre;
    document.getElementById("inputDescripcionProductoEditar").value = producto.descripcion;
    document.getElementById("inputStockProductoEditar").value = producto.stock;
    document.getElementById("inputPrecioProductoEditar").value = producto.precio;
    document.getElementById("inputImagenProductoEditar").value = producto.imagen;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        console.log("submit de editar producto");

        const productoActualizado = {
            id: document.getElementById("inputIdProductoEditar").value,
            nombre: normalizarTexto(document.getElementById("inputNombreProductoEditar").value),
            descripcion: normalizarTexto(document.getElementById("inputDescripcionProductoEditar").value),
            stock: normalizarNumero(document.getElementById("inputStockProductoEditar").value),
            precio: normalizarNumero(document.getElementById("inputPrecioProductoEditar").value),
            imagen: normalizarTexto(document.getElementById("inputImagenProductoEditar").value) || "imagenes/logo.png",
        };
        console.log("datos nuevos del producto:", productoActualizado);

        if (!validarProducto(productoActualizado.nombre, productoActualizado.descripcion, productoActualizado.stock, productoActualizado.precio, mensaje)) {
            console.log("validacion de edicion fallida");
            return;
        }

        const guardado = actualizarProducto(productoActualizado);

        if (!guardado) {
            console.log("no se pudo guardar la edicion");
            mostrarMensaje(mensaje, "No se encontró el producto para actualizar.", "danger");
            return;
        }

        console.log("edicion guardada con exito");
        mostrarMensaje(mensaje, "Producto actualizado correctamente.", "success");
        renderizarProductos();
    });
}

function validarProducto(nombre, descripcion, stock, precio, mensaje) {
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

function mostrarMensaje(elemento, texto, tipo) {
    if (!elemento) {
        return;
    }

    console.log("mostrando mensaje:", texto, tipo);
    elemento.className = `alert alert-${tipo} mt-3`;
    elemento.textContent = texto;
}

function renderizarProductos() {
    console.log("mostrando productos en tablas");
    const cuerposTabla = document.querySelectorAll("[data-productos-tabla]");
    const productos = obtenerProductos();
    console.log("productos que hay que  mostrar:", productos);

    cuerposTabla.forEach(function (cuerpoTabla) {
        cuerpoTabla.innerHTML = "";

        if (productos.length === 0) {
            const filaVacia = document.createElement("tr");
            const celdaVacia = document.createElement("td");

            celdaVacia.colSpan = 6;
            celdaVacia.className = "text-center py-4";
            celdaVacia.textContent = "No hay productos cargados todavía.";
            console.log("tabla vacia, mostrando estado inicial");

            filaVacia.appendChild(celdaVacia);
            cuerpoTabla.appendChild(filaVacia);
            return;
        }

        productos.forEach(function (producto) {
            const fila = document.createElement("tr");
            const celdaProducto = document.createElement("td");
            const celdaDescripcion = document.createElement("td");
            const celdaStock = document.createElement("td");
            const celdaPrecio = document.createElement("td");
            const celdaAcciones = document.createElement("td");

            celdaProducto.innerHTML = `
                <div class="d-flex align-items-center gap-2">
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="40" height="40" class="rounded object-fit-cover" />
                    <span>${producto.nombre}</span>
                </div>
            `;
            celdaDescripcion.textContent = producto.descripcion;
            celdaStock.innerHTML = `<span class="badge ${ponerClaseEnStock(producto.stock)}">${producto.stock}</span>`;
            celdaPrecio.textContent = formatearPrecio(producto.precio);
            celdaAcciones.innerHTML = `
                <div class="d-flex gap-2">
                    <a class="btn btn-warning btn-sm" href="editar_productos.html?id=${producto.id}">editar</a>
                    <button class="btn btn-danger btn-sm" type="button" data-eliminar-producto="${producto.id}">eliminar</button>
                </div>
            `;
            console.log("fila producto:", producto.id);

            fila.appendChild(celdaProducto);
            fila.appendChild(celdaDescripcion);
            fila.appendChild(celdaStock);
            fila.appendChild(celdaPrecio);
            fila.appendChild(celdaAcciones);
            cuerpoTabla.appendChild(fila);
        });
    });
    // probando, a ver si me fucniona
    document.querySelectorAll("[data-eliminar-producto]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const idProducto = boton.getAttribute("data-eliminar-producto");
            console.log("click en eliminar producto:", idProducto);

            if (window.confirm("¿Querés eliminar este producto?")) {
                eliminarProducto(idProducto);

                const formularioEdicion = document.getElementById("formularioEdicionProducto");
                const idEnEdicion = document.getElementById("inputIdProductoEditar");

                if (formularioEdicion && idEnEdicion && idEnEdicion.value === idProducto) {
                    const productosRestantes = obtenerProductos();

                    if (productosRestantes.length > 0) {
                        console.log("producto borrado era el editado, cargando otro");
                        window.location.href = `editar_productos.html?id=${productosRestantes[0].id}`;
                        return;
                    }

                    formularioEdicion.reset();
                    mostrarMensaje(document.getElementById("mensajeEdicionProductos"), "No quedan productos para editar.", "warning");
                }

                console.log("producto eliminado");
                renderizarProductos();
            }
        });
    });
}

function ponerClaseEnStock(stock) {
    if (stock <= 10) {
        return "text-bg-danger";
    }

    if (stock <= 30) {
        return "text-bg-warning";
    }

    return "text-bg-success";
}
// re afanadooo
function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(precio);
}
