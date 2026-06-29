import { obtenerArreglo, setearArreglo } from "./gestorLocalstorage.js";

const clave_productos_ls = "productos";
const clave_productosCarrito_ls = "productosCarrito";
const clave_productosComprados_ls = "productosComprados"

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
    let productos = obtenerArreglo(clave_productos_ls) || [];
    let productosFiltrados = productos.filter(function (producto) {
        return producto.id !== idProducto;
    });

    setearArreglo(clave_productos_ls, productosFiltrados);
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

export function listarProductos() {
    const productos = obtenerValor(clave_productos_ls)
    return productos || []
}

export function agregarElementoAlCarrito(idCard) {
    let productos = obtenerValor(clave_productos_ls) || [];
    let productosCarrito = obtenerValor(clave_productosCarrito_ls) || [];

    let producto = productos.find(function (producto) {
        return producto.id === idCard;
    })

    let productoExiste = productosCarrito.find(function (producto) {
        return producto.id === idCard;
    })

    if (producto && !productoExiste) {
        productosCarrito.push(producto);
        setearValor(clave_productosCarrito_ls, productosCarrito);
    }
}

export function obtenerElementosDelCarrito() {
    return obtenerValor(clave_productosCarrito_ls) || [];;
}

export function eliminarProductoCarrito(idProducto) {
    let productos = obtenerValor(clave_productosCarrito_ls) || [];
    let productosFiltrados = productos.filter(function (producto) {
        return producto.id !== idProducto;
    });

    setearValor(clave_productosCarrito_ls, productosFiltrados);
}

export function agregarProductoHistorial(producto) {
    let productosComprados = obtenerValor(clave_productosComprados_ls) || [];

    producto.fecha =  new Date().toLocaleString()
    
    productosComprados.push(producto);

    setearValor(clave_productosComprados_ls, productosComprados);
}

export function obtenerElementosDelHistorial() {
    return obtenerValor(clave_productosComprados_ls) || [];;
}

