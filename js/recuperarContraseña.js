window.addEventListener("DOMContentLoaded", function () {
    const botonConfirmarEmail = document.getElementById("botonConfirmarEmail")

    botonConfirmarEmail.addEventListener("click", function () {
        const email = document.getElementById("floatingInput").value;
        const divDelInputContraseña = document.getElementById("divDelInputContraseña");
        const botonRecuperarContraseña = document.getElementById("botonRecuperarContraseña");
        const floatingPassword = document.getElementById("floatingPassword").value;

        if (email === localStorage.getItem("email")) {
            botonConfirmarEmail.classList.add("d-none")
            divDelInputContraseña.classList.remove("d-none")
            botonRecuperarContraseña.classList.remove("d-none")
            if (password.length <= 3) {
                resultadoValidacion.resultado = false
                inputPassword.classList.add("is-invalid")
            } else {
                resultadoValidacion.resultado = true
                inputPassword.classList.add("is-valid")
                if (document.referrer) {
                    window.history.back();
                } else {
                    window.location.href = "login.html";
                }
            }
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
