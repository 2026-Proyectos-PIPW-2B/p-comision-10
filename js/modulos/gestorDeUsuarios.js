import { obtenerValor, setearValor } from "./gestorLocalstorage.js";

const clave_usuarios_ls = "usuarios";
const usuariosEjemplo = [
    {
        id: "u1",
        nombreCompleto: "Admin Burguer",
        direccion: "Casa central 123",
        telefono: "3410000000",
        email: "admin@piwp.com",
        password: "1234",
        rol: "admin",
    },
    {
        id: "u2",
        nombreCompleto: "Cliente Prueba",
        direccion: "Calle Falsa 123",
        telefono: "3411111111",
        email: "cliente@piwp.com",
        password: "1234",
        rol: "cliente",
    },
];

inicializarUsuariosDePrueba();

export function agregarUsuario(nombreCompleto, direccion, telefono, email, password, rol) {
    let usuarios = obtenerValor(clave_usuarios_ls);
    let usuario = crearUsuario(nombreCompleto, direccion, telefono, email, password, rol);
    usuarios.push(usuario);
    setearValor(clave_usuarios_ls, usuarios);
}

export function agregarUsuarioNuevaContraseña(password) {
    let usuarios = obtenerValor(clave_usuarios_ls);
    let usuario = crearUsuario(password);
    usuarios.push(usuario);
    setearValor(clave_usuarios_ls, usuarios);
}

export function buscarUsuarioPorEmail(email) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(function (usuario) {
        return usuario.email === email;
    });
}

export function editarUsuario(usuarioEditado) {
    let usuarios = obtenerValor(clave_usuarios_ls);
    let indice = usuarios.findIndex(function (usuario) {
        return String(usuario.id) === String(usuarioEditado.id);
    });

    if (indice === -1) {
        return false;
    }

    usuarios[indice] = usuarioEditado;
    setearValor(clave_usuarios_ls, usuarios);
    return true;
}

export function obtenerUsuarios() {
    return obtenerValor(clave_usuarios_ls);
}

export function obtenerUsuarioPorId(idUsuario) {
    let usuarios = obtenerValor(clave_usuarios_ls);
    return usuarios.find(function (usuario) {
        return String(usuario.id) === String(idUsuario);
    });
}

export function eliminarUsuario(idUsuario) {
    let usuarios = obtenerValor(clave_usuarios_ls);
    let usuariosFiltrados = usuarios.filter(function (usuario) {
        return String(usuario.id) !== String(idUsuario);
    });

    let usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo") || "null");
    if (usuarioActivo && String(usuarioActivo.id) === String(idUsuario)) {
        localStorage.removeItem("usuario_activo");
        localStorage.setItem("usuario_logueado", "false");
        localStorage.removeItem("sesion_activa");
    }

    setearValor(clave_usuarios_ls, usuariosFiltrados);
}

export function existeUsuario(email, idUsuario = null) {
    let usuarios = obtenerValor(clave_usuarios_ls);
    let existe = false;

    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i];

        if (usuario.email === email && String(usuario.id) !== String(idUsuario)) {
            existe = true;
        }
    }

    return existe;
}

function crearUsuario(nombreCompleto, direccion, telefono, email, password, rol) {
    let usuario = {
        id: generarID(),
        nombreCompleto: nombreCompleto,
        direccion: direccion,
        telefono: telefono,
        email: email,
        password: password,
        rol: rol,
    };
    return usuario;
}

function generarID() {
    return `u${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function inicializarUsuariosDePrueba() {
    let usuarios = obtenerValor(clave_usuarios_ls);

    if (usuarios.length === 0) {
        console.log("cargando usuarios de prueba");
        setearValor(clave_usuarios_ls, usuariosEjemplo);
    }
}

//function para verificar si es administrador o cliente
