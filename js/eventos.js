document.addEventListener("DOMContentLoaded", function() {

    // Obtengo los elementos principales del DOM
    let menu = document.getElementById("mainNav");
    let botonMenu = document.querySelector(".navbar-toggler");

    let ultimaPosicion = window.scrollY;
    let haciendoScroll = false;
    let tiempoScroll;

    // Evento para cuando el usuario scrollea
    window.addEventListener("scroll", function() {
        let posicionActual = window.scrollY;

        // Si el scroll es ínfimo (en este caso 10px) no hago nada, para evitar que se cierre el menu con un scroll minimo
        if (Math.abs(posicionActual - ultimaPosicion) < 10) {
            return;
        }

        haciendoScroll = true;

        // Si el menu esta abierto y el usuario hace scroll, lo cierro
        if (menu.classList.contains("show")) {
            let collapseMenu = new bootstrap.Collapse(menu);
            collapseMenu.hide();
        }

        ultimaPosicion = posicionActual;

        // Uso un timeout para detectar cuando el usuario deja de scrollear
        clearTimeout(tiempoScroll);
        tiempoScroll = setTimeout(function() {
            haciendoScroll = false;
        }, 250);
    });

    // Si esta scrolleando, no dejo que abra el menu
    botonMenu.addEventListener("click", function(e) {
        if (haciendoScroll) {
            e.preventDefault();
        }
    });

    // Sección de los tooltips, para pantallas chicas y medianas
    let elementosTooltip = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    // Recorro los elementos con un for
    for (let i = 0; i < elementosTooltip.length; i++) {
        let elemento = elementosTooltip[i];

        let tooltip = new bootstrap.Tooltip(elemento, {
            trigger: "click"
        });

        elemento.addEventListener("click", function() {
            tooltip.show();

            // Oculto el mensaje del tooltip automaticamente despues de 1.5 segundos
            setTimeout(function() {
                tooltip.hide();
            }, 1500);
        });
    }

    // Valido el formulario de contacto
    let formulario = document.getElementById("formularioContacto");

    if (formulario != null) {

        formulario.addEventListener("submit", function(e) {
            e.preventDefault();

            // Saco los valores de cada input y les saco los espacios con trim()
            let nombre = document.getElementById("formularioNombre").value.trim();
            let email = document.getElementById("formularioEmail").value.trim();
            let telefono = document.getElementById("formularioTelefono").value.trim();
            let empresa = document.getElementById("formularioEmpresa").value.trim();
            let servicio = document.getElementById("formularioServicio").value;
            let mensaje = document.getElementById("formularioMensaje").value.trim();

            // Expresiones regulares para validar
            let regexLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
            let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let regexNumeros = /^[0-9]+$/;

            // Variable para ir guardando los errores
            let errores = "";

            // Validaciones de los campos
            if (nombre == "") {
                errores += "Debe ingresar su nombre.<br>";
            } else if (!regexLetras.test(nombre)) {
                errores += "El nombre solo puede contener letras.<br>";
            }

            if (email == "") {
                errores += "Debe ingresar un email.<br>";
            } else if (!regexEmail.test(email)) {
                errores += "Debe ingresar un email valido.<br>";
            }

            if (telefono == "") {
                errores += "Debe ingresar un telefono.<br>";
            } else if (!regexNumeros.test(telefono)) {
                errores += "El telefono solo puede contener numeros.<br>";
            }

            if (servicio == "Seleccioná un servicio") {
                errores += "Debe seleccionar un servicio.<br>";
            }

            if (mensaje == "") {
                errores += "Debe ingresar un mensaje.<br>";
            } else if (mensaje.length < 10) {
                errores += "El mensaje debe tener al menos 10 caracteres.<br>";
            }

            // Si hay errores, muestro el toast y corto la ejecucion
            if (errores != "") {

                let toastErrorElemento = document.getElementById("toastError");
                let mensajeError = document.getElementById("toastErrorMensaje");

                mensajeError.innerHTML = errores;

                let toastError = new bootstrap.Toast(toastErrorElemento);
                toastError.show();

                return;
            }

            // Si llego aca es que todo esta bien, muestro el toast
            let toastElemento = document.getElementById("toastExito");

            if (toastElemento != null) {
                let toast = new bootstrap.Toast(toastElemento);
                toast.show();
            }

            console.log("Mensaje enviado correctamente");

            // Limpio el formulario para que quede vacio de nuevo
            formulario.reset();
        });
    }

});