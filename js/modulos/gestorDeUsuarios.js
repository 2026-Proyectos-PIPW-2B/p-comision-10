import {obtenerArreglo, setearArreglo} from "./gestorLocalstorage.js";

const clave_usuarios_ls = "usuarios";

export function agregarUsuario(nombreCompleto, direccion, telefono, email, password, rol) {
    let usuarios = obtenerArreglo(clave_usuarios_ls);
    let usuario = crearUsuario(nombreCompleto, direccion, telefono, email, password, rol);
    usuarios.push(usuario);
    setearArreglo(clave_usuarios_ls, usuarios);
}

export function editarUsuario(usuarioEditado) {
    let usuarios = obtenerArreglo(clave_usuarios_ls);
    let indice = usuarios.findIndex(function (usuario) {
        return usuario.id === usuarioEditado.id;
    });

    if (indice === -1) {
        return false;
    }

    usuarios[indice] = usuarioEditado;
    setearArreglo(clave_usuarios_ls, usuarios);
    return true;
}

export function obtenerUsuarios() {
    return obtenerArreglo(clave_usuarios_ls);
}

export function obtenerUsuarioPorId(idUsuario) {
    let usuarios = obtenerArreglo(clave_usuarios_ls);
    return usuarios.find(function (usuario) {
        return usuario.id === idUsuario;
    });
}

export function eliminarUsuario(idUsuario) {
    let usuarios = obtenerArreglo(clave_usuarios_ls);
    let usuariosFiltrados = usuarios.filter(function (usuario) {
        return usuario.id !== idUsuario;
    });

    let usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo") || "null");
    if (usuarioActivo && usuarioActivo.id === idUsuario) {
        localStorage.removeItem("usuario_activo");
        localStorage.setItem("usuario_logueado", "false");
    }

    setearArreglo(clave_usuarios_ls, usuariosFiltrados);
}

export function existeUsuario(email, idUsuario = null) {
    let usuarios = obtenerArreglo(clave_usuarios_ls);
    let existe = false;

    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i];

        if (usuario.email === email && usuario.id !== idUsuario) {
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
