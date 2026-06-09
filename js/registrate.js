
// simulacion de un login exitoso y volvemos apra atras
window.addEventListener("DOMContentLoaded", function () {
    // Buscamos el formulario de login en el HTML
    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            const nombreCompleto = document.getElementById("floatingNombreCompleto").value;
            const direccion = document.getElementById("floatingDireccion").value 
            console.log(nombreCompleto, direccion)
            const telefono = document.getElementById("floatingTelefono").value
            const email = document.getElementById("floatingEmail").value;
            const password = document.getElementById("floatingPassword").value;
            localStorage.setItem("nombreCompleto", nombreCompleto);
            localStorage.setItem("direccion", direccion);
            localStorage.setItem("telefono", telefono);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            
            alert(`${nombreCompleto}, has sido Registrado!!`);

            if (document.referrer) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        });
    }
});