import {obtenerArreglo, setearArreglo} from './gestorLocalstorage.js'

const clave_usuarios_ls = "usuariosGuardados"

export function agregarUsuario(nombre, direccion, telefono, email, password, rol){
    let usuarios = obtenerArreglo(clave_usuarios_ls)
    let usuario = crearUsuario(nombre, direccion, telefono, email, password, rol)
    usuarios.push(usuario)
    setearArreglo(clave_usuarios_ls, usuarios)
}

export function editarUsuario(){

}

export function obtenerUsuarios(){

}

export function existeUsuario(email){
    let usuarios = obtenerArreglo(clave_usuarios_ls)
    let existe = false
    for(let i=0; i<usuarios.length; i++){
        let usuario = usuarios[i]
        if (usuario.email === email){
            existe = true
        }
    }
    return existe
}

function crearUsuario(nombre, direccion, telefono, email, password, rol){
    let usuario = {
        id: generarID(),
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        email: email,
        password: password,
        rol: rol
    }
    return usuario
}

function generarID() {
    return `u${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
}