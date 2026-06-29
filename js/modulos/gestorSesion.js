import { eliminarValor, obtenerValor, setearValor } from "./gestorLocalstorage.js"
import { obtenerUsuarios } from "./gestorDeUsuarios.js"

const clave_sesion_ls = "sesion_activa"

export function iniciarSesion(email, password) {
    let seInicioSesion = false

    const usuarios = obtenerUsuarios()
    const usuario = usuarios.find(function (usuario) {
        return usuario.email === email && usuario.password === password;
    })

    // Si existe usuario con email y password
    if (usuario) {
        seInicioSesion = true
        setearInicioSesion(usuario)
    }

    return seInicioSesion
}

export function existeUsuarioLogueado() {
    const sesion_activa = obtenerValor(clave_sesion_ls)
    return sesion_activa
}

export function cerrarSesion() {
    eliminarValor(clave_sesion_ls)
    localStorage.setItem("usuario_logueado", "false")
    localStorage.removeItem("usuario_activo")
}

function setearInicioSesion(usuario) {
    let objetoSesion = {
        usuario: usuario,
        carrito: [],
    }
    setearValor(clave_sesion_ls, objetoSesion)
    localStorage.setItem("usuario_logueado", "true")
    localStorage.setItem("usuario_activo", JSON.stringify(usuario))
}

export function actualizarSesionActiva(usuario) {
    const sesionActiva = obtenerValor(clave_sesion_ls)

    if (!sesionActiva) {
        return
    }

    sesionActiva.usuario = usuario
    setearValor(clave_sesion_ls, sesionActiva)
    localStorage.setItem("usuario_activo", JSON.stringify(usuario))
}
