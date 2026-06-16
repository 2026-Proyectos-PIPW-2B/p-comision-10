const usaurios_en_ls = "usuarios";

window.addEventListener("DOMContentLoaded", function () {
    console.log("ding dom dom dom - recuperar contraseña");
    inicializarUsuarios();

    const form = document.querySelector("form");
    const botonConfirmarEmail = document.getElementById("botonConfirmarEmail");
    const botonRecuperarContraseña = document.getElementById("botonRecuperarContraseña");
    const divDelInputContraseña = document.getElementById("divDelInputContraseña");

    if (!form) {
        return;
    }

    let usuarioEncontrado = null;

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();
        console.log("submit de recuperar contraseña");

        const email = document.getElementById("floatingInput").value.trim();
        const password = document.getElementById("floatingPassword").value.trim();

        if (!usuarioEncontrado) {
            usuarioEncontrado = buscarUsuarioPorEmail(email);
            console.log("usuario buscado por email:", usuarioEncontrado);

            if (usuarioEncontrado) {
                botonConfirmarEmail.classList.add("d-none");
                divDelInputContraseña.classList.remove("d-none");
                botonRecuperarContraseña.classList.remove("d-none");
            } else {
                alert("¡tu usuario no exite!");

                if (document.referrer) {
                    window.history.back();
                } else {
                    window.location.href = "registrate.html";
                }
            }
            return;
        }

        if (password.length <= 3) {
            alert("La contraseña tiene que tener mas de 3 caracteres");
            return;
        }

        usuarioEncontrado.password = password;
        const usuarios = obtenerUsuarios().map(function (usuario) {
            if (usuario.id === usuarioEncontrado.id) {
                return usuarioEncontrado;
            }

            return usuario;
        });

        guardarUsuarios(usuarios);
        console.log("contraseña actualizada");
        alert("Contraseña actualizada!");

        if (document.referrer) {
            window.history.back();
        } else {
            window.location.href = "login.html";
        }
    });
});

function inicializarUsuarios() {
    console.log("inicializando usuarios para recuperar contraseña...");
    const usuariosGuardados = obtenerUsuarios();

    if (usuariosGuardados.length === 0) {
        guardarUsuarios([
            {
                id: "u1",
                nombreCompleto: "Admin Burguer",
                direccion: "Casa central 123",
                telefono: "3410000000",
                email: "admin@piwp.com",
                password: "1234",
                rol: "admin",
            },
        ]);
    }
}

function obtenerUsuarios() {
    const usuarios = localStorage.getItem(usaurios_en_ls);

    if (!usuarios) {
        return [];
    }

    try {
        const usuariosParseados = JSON.parse(usuarios);
        return Array.isArray(usuariosParseados) ? usuariosParseados : [];
    } catch (error) {
        console.error("No se pudieron leer los usuarios:", error);
        return [];
    }
}

function guardarUsuarios(usuarios) {
    localStorage.setItem(usaurios_en_ls, JSON.stringify(usuarios));
}

function buscarUsuarioPorEmail(email) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(function (usuario) {
        return usuario.email === email;
    });
}
