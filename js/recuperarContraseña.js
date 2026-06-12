window.addEventListener("DOMContentLoaded", function () {
    const botonConfirmarEmail = document.getElementById("botonConfirmarEmail")

    botonConfirmarEmail.addEventListener("click", function () {
        const email = document.getElementById("floatingInput").value;
        const divDelInputContraseña = document.getElementById("divDelInputContraseña");
        const botonRecuperarContraseña = document.getElementById("botonRecuperarContraseña");
        //const floatingPassword = document.getElementById("floatingPassword").value;

        let resultadoValidacion = {
            resultado: true,
        }

        //aparece el input contraseña y el boton recuperar contraseña y desaparece el boton confirmar email
        if (email === localStorage.getItem("email")) {
            botonConfirmarEmail.classList.add("d-none")
            divDelInputContraseña.classList.remove("d-none")
            botonRecuperarContraseña.classList.remove("d-none")

            //ve si la contraseña es valida o no
            if (password.length <= 3) {
                resultadoValidacion.resultado = false
                inputPassword.classList.add("is-invalid")
            } else {
                resultadoValidacion.resultado = true
                inputPassword.classList.add("is-valid")

                //si la contraseña es valida te lleva al login
                if (resultadoValidacion.resultado === true) {
                    botonRecuperarContraseña.addEventListener("submit", function () {
                        if (document.referrer) {
                            window.history.back();
                        } else {
                            window.location.href = "login.html";
                        }
                    })
                }
            }

            //si el email no existe te dice que tu usuario no existe y te manda a registrate
        } else if (email !== localStorage.getItem("email")) {
            alert("¡tu usuario no exite!");

            if (document.referrer) {
                window.history.back();
            } else {
                window.location.href = "registrate.html";
            }
        }
    });
})
