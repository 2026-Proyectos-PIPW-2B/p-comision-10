import { obtenerArreglo, setearArreglo } from "./gestorLocalstorage.js";

const clave_productos_ls = "productos";
const clave_productos_carrito_ls = "productosCarrito";
const clave_productos_comprados_ls = "productosComprados";

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
    let productos = obtenerArreglo(clave_productos_ls);
    let productosCarrito = obtenerArreglo(clave_productos_carrito_ls);

    let producto = productos.find(function (producto) {
        return producto.id === idProducto;
    });

    let productoExiste = productosCarrito.find(function (producto) {
        return producto.id === idProducto;
    });

    if (producto && !productoExiste) {
        productosCarrito.push(producto);
        setearArreglo(clave_productos_carrito_ls, productosCarrito);
        return true;
    }

    return false;
}

export function obtenerElementosDelCarrito() {
    return obtenerArreglo(clave_productos_carrito_ls);
}

export function eliminarProductoCarrito(idProducto) {
    let productos = obtenerArreglo(clave_productos_carrito_ls);
    let productosFiltrados = productos.filter(function (producto) {
        return producto.id !== idProducto;
    });

    setearArreglo(clave_productos_carrito_ls, productosFiltrados);
}

export function agregarProductoHistorial(producto, cantidad) {
    let productosComprados = obtenerArreglo(clave_productos_comprados_ls)
    let productoComprado = {
        ...producto,
        cantidad: cantidad || 1,
        fecha: new Date().toLocaleDateString("es-AR"),
    }

    productosComprados.push(productoComprado)
    setearArreglo(clave_productos_comprados_ls, productosComprados)
}

export function obtenerElementosDelHistorial() {
    return obtenerArreglo(clave_productos_comprados_ls);
}

export function descontarStockProducto(idProducto, cantidad) {
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

