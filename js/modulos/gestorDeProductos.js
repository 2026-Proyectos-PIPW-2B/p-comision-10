import { obtenerArreglo, setearArreglo } from "./gestorLocalstorage.js";

const clave_productos_ls = "productos";
const clave_productos_comprados_base = "productosComprados";
const clave_carrito_base = "productosCarrito";

const productosEjemplo = [
    {
        id: "p1",
        nombre: "Hamburguesa Clásica",
        descripcion: "La hamburguesa de siempre, al estilo Burguer PIWP.",
        stock: 190,
        precio: 5000,
        imagen: "imagenes/OIP.webp",
    },
    {
        id: "p2",
        nombre: "Hamburguesa Doble",
        descripcion: "Más carne, más sabor y más ganas de repetir.",
        stock: 120,
        precio: 6800,
        imagen: "imagenes/OIP (1).webp",
    },
    {
        id: "p3",
        nombre: "Hamburguesa Vegana",
        descripcion: "Una opción más liviana sin perder el estilo.",
        stock: 75,
        precio: 6200,
        imagen: "imagenes/descarga.webp",
    },
];

export function inicializarProductos() {
    console.log("inicializando productos...");
    let productos = obtenerProductos();
    console.log("productos guardados:", productos);

    if (productos.length === 0) {
        console.log("no habia productos, cargando ejemplos");
        setearArreglo(clave_productos_ls, productosEjemplo);
    }
}

export function obtenerProductos() {
    console.log("leyendo productos desde ls");
    return obtenerArreglo(clave_productos_ls);
}

export function listarProductos() {
    return obtenerProductos();
}

export function obtenerProductoPorId(idProducto) {
    console.log("buscando producto por id:", idProducto);
    let productos = obtenerArreglo(clave_productos_ls);
    return productos.find(function (producto) {
        return producto.id === idProducto;
    });
}

export function agregarProducto(nombre, descripcion, stock, precio, imagen) {
    console.log("agregando producto...");
    let productos = obtenerArreglo(clave_productos_ls);
    let producto = crearProducto(nombre, descripcion, stock, precio, imagen);
    productos.push(producto);
    setearArreglo(clave_productos_ls, productos);
    return producto;
}

export function editarProducto(productoEditado) {
    console.log("actualizando producto:", productoEditado);
    let productos = obtenerArreglo(clave_productos_ls);
    let indice = productos.findIndex(function (producto) {
        return producto.id === productoEditado.id;
    });

    if (indice === -1) {
        console.log("no se encontro el producto para actualizar");
        return false;
    }

    productos[indice] = productoEditado;
    setearArreglo(clave_productos_ls, productos);
    console.log("producto actualizado ok");
    return true;
}

export function eliminarProducto(idProducto) {
    console.log("eliminando producto:", idProducto);
    let productos = obtenerArreglo(clave_productos_ls);
    let productosFiltrados = productos.filter(function (producto) {
        return producto.id !== idProducto;
    });

    setearArreglo(clave_productos_ls, productosFiltrados);
}

export function agregarElementoAlCarrito(idProducto) {
    console.log("agregando al carrito:", idProducto);
    const claveCarrito = obtenerClaveCarritoActiva();
    if (!claveCarrito) {
        console.log("carrito no disponible para este usuario");
        return false;
    }

    let productos = obtenerArreglo(clave_productos_ls);
    let productosCarrito = obtenerArreglo(claveCarrito);

    let producto = productos.find(function (producto) {
        return producto.id === idProducto;
    });

    let productoExiste = productosCarrito.find(function (producto) {
        return producto.id === idProducto;
    });

    if (!producto) {
        console.log("no se encontro el producto para agregar");
        return false;
    }

    if (producto.stock <= 0) {
        console.log("producto sin stock:", idProducto);
        return false;
    }

    if (!productoExiste) {
        console.log("producto agregado por primera vez:", idProducto);
        productosCarrito.push({
            ...producto,
            cantidad: 1,
        });
        setearArreglo(claveCarrito, productosCarrito);
        return true;
    }

    productoExiste.cantidad = obtenerCantidadNormalizada(productoExiste);

    if (productoExiste.cantidad >= producto.stock) {
        console.log("no se puede superar el stock:", idProducto);
        return false;
    }

    productoExiste.cantidad += 1;
    console.log("cantidad actualizada en carrito:", idProducto, productoExiste.cantidad);
    setearArreglo(claveCarrito, productosCarrito);
    return true;
}

export function obtenerElementosDelCarrito() {
    console.log("leyendo carrito");
    const claveCarrito = obtenerClaveCarritoActiva();

    if (!claveCarrito) {
        console.log("carrito no disponible para este usuario");
        return [];
    }

    return obtenerArreglo(claveCarrito);
}

export function eliminarProductoCarrito(idProducto) {
    console.log("eliminando del carrito:", idProducto);
    const claveCarrito = obtenerClaveCarritoActiva();

    if (!claveCarrito) {
        console.log("carrito no disponible para este usuario");
        return;
    }

    let productos = obtenerArreglo(claveCarrito);
    let productosFiltrados = productos.filter(function (producto) {
        return producto.id !== idProducto;
    });

    setearArreglo(claveCarrito, productosFiltrados);
}

export function aumentarCantidadProductoCarrito(idProducto) {
    console.log("aumentando cantidad del carrito:", idProducto);
    const claveCarrito = obtenerClaveCarritoActiva();

    if (!claveCarrito) {
        console.log("carrito no disponible para este usuario");
        return false;
    }

    const productos = obtenerArreglo(claveCarrito);
    const productoEnCarrito = productos.find(function (producto) {
        return producto.id === idProducto;
    });

    if (!productoEnCarrito) {
        console.log("no se encontro el producto en carrito");
        return false;
    }

    if (productoEnCarrito.stock <= 0) {
        console.log("no hay stock para aumentar:", idProducto);
        return false;
    }

    productoEnCarrito.cantidad = obtenerCantidadNormalizada(productoEnCarrito);

    if (productoEnCarrito.cantidad >= productoEnCarrito.stock) {
        console.log("ya llego al stock maximo:", idProducto);
        return false;
    }

    productoEnCarrito.cantidad += 1;
    console.log("cantidad aumentada:", idProducto, productoEnCarrito.cantidad);
    setearArreglo(claveCarrito, productos);
    return true;
}

export function disminuirCantidadProductoCarrito(idProducto) {
    console.log("disminuyendo cantidad del carrito:", idProducto);
    const claveCarrito = obtenerClaveCarritoActiva();

    if (!claveCarrito) {
        console.log("carrito no disponible para este usuario");
        return false;
    }

    const productos = obtenerArreglo(claveCarrito);
    const productoEnCarrito = productos.find(function (producto) {
        return producto.id === idProducto;
    });

    if (!productoEnCarrito) {
        console.log("no se encontro el producto en carrito");
        return false;
    }

    if (productoEnCarrito.cantidad <= 1) {
        console.log("cantidad minima alcanzada, se elimina:", idProducto);
        eliminarProductoCarrito(idProducto);
        return true;
    }

    productoEnCarrito.cantidad -= 1;
    console.log("cantidad disminuida:", idProducto, productoEnCarrito.cantidad);
    setearArreglo(claveCarrito, productos);
    return true;
}

export function actualizarCantidadProductoCarrito(idProducto, cantidad) {
    console.log("actualizando cantidad del carrito:", idProducto, cantidad);
    const claveCarrito = obtenerClaveCarritoActiva();

    if (!claveCarrito) {
        console.log("carrito no disponible para este usuario");
        return false;
    }

    const productos = obtenerArreglo(claveCarrito);
    const productoEnCarrito = productos.find(function (producto) {
        return producto.id === idProducto;
    });

    if (!productoEnCarrito) {
        console.log("no se encontro el producto en carrito");
        return false;
    }

    if (productoEnCarrito.stock <= 0) {
        console.log("producto sin stock, se elimina del carrito:", idProducto);
        eliminarProductoCarrito(idProducto);
        return true;
    }

    productoEnCarrito.cantidad = obtenerCantidadNormalizada(productoEnCarrito);

    const cantidadNumerica = Number(cantidad);

    if (Number.isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
        console.log("cantidad invalida, se elimina del carrito:", idProducto);
        eliminarProductoCarrito(idProducto);
        return true;
    }

    productoEnCarrito.cantidad = Math.min(cantidadNumerica, productoEnCarrito.stock);
    console.log("cantidad actualizada:", idProducto, productoEnCarrito.cantidad);
    setearArreglo(claveCarrito, productos);
    return true;
}

export function vaciarCarrito() {
    console.log("vaciar carrito");
    const claveCarrito = obtenerClaveCarritoActiva();

    if (!claveCarrito) {
        console.log("carrito no disponible para este usuario");
        return;
    }

    setearArreglo(claveCarrito, []);
}

export function obtenerCantidadTotalCarrito() {
    console.log("calculando cantidad total del carrito");
    const productos = obtenerElementosDelCarrito();
    let total = 0;

    for (let i = 0; i < productos.length; i++) {
        total += Number(productos[i].cantidad || 1);
    }

    return total;
}

export function obtenerTotalCarrito() {
    console.log("calculando total del carrito");
    const productos = obtenerElementosDelCarrito();
    let total = 0;

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        total += Number(producto.precio || 0) * Number(producto.cantidad || 1);
    }

    return total;
}

export function agregarProductoHistorial(producto, cantidad) {
    console.log("agregando al historial:", producto.id, cantidad);
    const claveHistorial = obtenerClaveHistorialActiva();

    if (!claveHistorial) {
        console.log("historial no disponible para este usuario");
        return;
    }

    let productosComprados = obtenerArreglo(claveHistorial)
    let productoComprado = {
        ...producto,
        cantidad: cantidad || 1,
        fecha: new Date().toLocaleDateString("es-AR"),
    }

    productosComprados.push(productoComprado)
    setearArreglo(claveHistorial, productosComprados)
}

export function obtenerElementosDelHistorial() {
    console.log("leyendo historial");
    const claveHistorial = obtenerClaveHistorialActiva();

    if (!claveHistorial) {
        console.log("historial no disponible para este usuario");
        return [];
    }

    return obtenerArreglo(claveHistorial);
}

export function descontarStockProducto(idProducto, cantidad) {
    console.log("descontando stock:", idProducto, cantidad);
    let producto = obtenerProductoPorId(idProducto)

    if (!producto) {
        console.log("no se encontro el producto para descontar stock:", idProducto)
        return
    }

    producto.stock = producto.stock - cantidad

    if (producto.stock < 0) {
        producto.stock = 0
    }

    console.log("descntando stock del prodcto:", idProducto, "cantidad:", cantidad, "stock restante:", producto.stock)
    editarProducto(producto)
}

function crearProducto(nombre, descripcion, stock, precio, imagen) {
    return {
        id: generarID(),
        nombre: nombre,
        descripcion: descripcion,
        stock: stock,
        precio: precio,
        imagen: imagen,
    };
}

function generarID() {
    return `p${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function obtenerCantidadNormalizada(producto) {
    const cantidad = Number(producto.cantidad);

    if (Number.isNaN(cantidad) || cantidad <= 0) {
        return 1;
    }

    return cantidad;
}

function obtenerClaveCarritoActiva() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo") || "null");

    if (!usuarioActivo || usuarioActivo.rol !== "cliente") {
        return null;
    }

    return `${clave_carrito_base}_${usuarioActivo.id}`;
}

function obtenerClaveHistorialActiva() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo") || "null");

    if (!usuarioActivo || usuarioActivo.rol !== "cliente") {
        return null;
    }

    return `${clave_productos_comprados_base}_${usuarioActivo.id}`;
}
