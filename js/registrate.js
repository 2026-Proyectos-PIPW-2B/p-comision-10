const usaurios_en_ls = "usuarios";

const usuariosDeEjemplo = [
    {
        id: "u1",
        nombreCompleto: "admin",
        direccion: "calle falsa 123",
        telefono: "2914395390",
        email: "admin@piwp.com",
        password: "1234",
        rol: "admin",
    },
    {
        id: "u2",
        nombreCompleto: "cliente",
        direccion: "inglaterra 634",
        telefono: "291439530",
        email: "cliente@piwp.com",
        password: "1234",
        rol: "cliente",
    },
];

window.addEventListener("DOMContentLoaded", function () {
    console.log("ding dom dom dom - registrate");
    inicializarUsuarios();

    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            console.log("submit de registrate");

            const nombreCompleto = document.getElementById("floatingNombreCompleto").value.trim();
            const direccion = document.getElementById("floatingDireccion").value.trim();
            const telefono = document.getElementById("floatingTelefono").value.trim();
            const email = document.getElementById("floatingEmail").value.trim();
            const password = document.getElementById("floatingPassword").value.trim();
            const inputNombreCompleto = document.getElementById("floatingNombreCompleto");
            const inputDireccion = document.getElementById("floatingDireccion");
            const inputTelefono = document.getElementById("floatingTelefono");
            const inputEmail = document.getElementById("floatingEmail");
            const inputPassword = document.getElementById("floatingPassword");

            limpiarEstados();

            const resultadoValidacion = validarDatos(
                nombreCompleto,
                direccion,
                telefono,
                email,
                password,
                inputNombreCompleto,
                inputDireccion,
                inputTelefono,
                inputEmail,
                inputPassword
            );

            if (resultadoValidacion.resultado === true) {
                const usuarios = obtenerUsuarios();
                const existeUsuario = usuarios.find(function (usuario) {
                    return usuario.email === email;
                });

                if (existeUsuario) {
                    console.log("ya existe un usuario con ese email");
                    alert("Ya existe un usuario con ese email");
                    inputEmail.classList.add("is-invalid");
                    return;
                }

                const nuevoUsuario = {
                    id: crearIdUsuario(),
                    nombreCompleto,
                    direccion,
                    telefono,
                    email,
                    password,
                    rol: "cliente",
                };

                console.log("guardando usuario nuevo:", nuevoUsuario);
                usuarios.push(nuevoUsuario);
                guardarUsuarios(usuarios);

                limpiarEstados();
                alert(`${nombreCompleto}, has sido Registrado!!`);

                if (document.referrer) {
                    window.history.back();
                } else {
                    window.location.href = "login.html";
                }
            }
        });
    }
});

function inicializarUsuarios() {
    console.log("inicializando usuarios...");
    const usuariosGuardados = obtenerUsuarios();
    console.log("usuarios guardados:", usuariosGuardados);

    if (usuariosGuardados.length === 0) {
        console.log("no habia usuarios, cargando ejemplos");
        guardarUsuarios(usuariosDeEjemplo);
    }
}

function obtenerUsuarios() {
    console.log("leyendo usuarios desde ls");
    const usuarios = localStorage.getItem(usaurios_en_ls);

    if (!usuarios) {
        console.log("no existe la clave de usuarios todavia");
        return [];
    }

    try {
        const usuariosParseados = JSON.parse(usuarios);
        console.log("usuarios parseados:", usuariosParseados);
        return Array.isArray(usuariosParseados) ? usuariosParseados : [];
    } catch (error) {
        console.error("No se pudieron leer los usuarios:", error);
        return [];
    }
}

function guardarUsuarios(usuarios) {
    console.log("guardando usuarios en ls:", usuarios);
    localStorage.setItem(usaurios_en_ls, JSON.stringify(usuarios));
}

function crearIdUsuario() {
    const idNuevo = `u${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    console.log("id nuevo de usuario:", idNuevo);
    return idNuevo;
}

function limpiarEstados() {
    const inputs = document.querySelectorAll(".form-check-input, .form-select, .form-control");

    for (const input of inputs) {
        input.classList.remove("is-invalid");
        input.classList.remove("is-valid");
    }
}

function validarDatos(nombreCompleto, direccion, telefono, email, password, inputNombreCompleto, inputDireccion, inputTelefono, inputEmail, inputPassword) {
    const resultadoValidacion = {
        resultado: true,
    };

    validarNombreCompleto(inputNombreCompleto, nombreCompleto, resultadoValidacion);
    validarDireccion(inputDireccion, direccion, resultadoValidacion);
    validarTelefono(inputTelefono, telefono, resultadoValidacion);
    validarEmail(inputEmail, email, resultadoValidacion);
    validarPassword(inputPassword, password, resultadoValidacion);

    return resultadoValidacion;
}

function validarNombreCompleto(inputNombreCompleto, nombreCompleto, resultadoValidacion) {
    if (nombreCompleto.length <= 0) {
        resultadoValidacion.resultado = false;
        inputNombreCompleto.classList.add("is-invalid");
    } else {
        inputNombreCompleto.classList.add("is-valid");
    }
}

function validarDireccion(inputDireccion, direccion, resultadoValidacion) {
    if (direccion.length <= 5) {
        resultadoValidacion.resultado = false;
        inputDireccion.classList.add("is-invalid");
    } else {
        inputDireccion.classList.add("is-valid");
    }
}

function validarTelefono(inputTelefono, telefono, resultadoValidacion) {
    if (telefono.length <= 9) {
        resultadoValidacion.resultado = false;
        inputTelefono.classList.add("is-invalid");
    } else {
        inputTelefono.classList.add("is-valid");
    }
}

function validarEmail(inputEmail, email, resultadoValidacion) {
    if (email.length <= 5) {
        resultadoValidacion.resultado = false;
        inputEmail.classList.add("is-invalid");
    } else {
        inputEmail.classList.add("is-valid");
    }
}

function validarPassword(inputPassword, password, resultadoValidacion) {
    if (password.length <= 3) {
        resultadoValidacion.resultado = false;
        inputPassword.classList.add("is-invalid");
    } else {
        inputPassword.classList.add("is-valid");
    }
}
