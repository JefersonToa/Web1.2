const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const inputMensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("botonEnviar");
const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorMensaje = document.getElementById("errorMensaje");
const formulario = document.getElementById("formulario");
const validarNombre = () => {
    if (inputNombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        inputNombre.classList.add("invalido");
        inputNombre.classList.remove("valido");
        return false;
    } else {
        errorNombre.textContent = "";
        inputNombre.classList.add("valido");
        inputNombre.classList.remove("invalido");
        return true;
    }
}

const validarEmail = () => {
    const regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(inputEmail.value)) {
        errorEmail.textContent = "Ingresa un correo válido";
        inputEmail.classList.add("invalido");
        inputEmail.classList.remove("valido");
        return false;
    } else {
        errorEmail.textContent = "";
        inputEmail.classList.add("valido");
        inputEmail.classList.remove("invalido");
        return true;
    }
}

const validarMensaje = () => {
    if (inputMensaje.value.trim().length < 10) {
        errorMensaje.textContent = "El mensaje debe tener mínimo diez caracteres.";
        inputMensaje.classList.add("invalido");
        inputMensaje.classList.remove("valido");
        return false;
    } else {
        errorMensaje.textContent = "";
        inputMensaje.classList.add("valido");
        inputMensaje.classList.remove("invalido");
        return true;
    }
}

const validarFormulario = () => {
    if (validarNombre() && validarEmail() && validarMensaje()) {
        btnEnviar.disabled = false;
    } else {
        btnEnviar.disabled = true;
    }
}

inputNombre.addEventListener("input", () => {
    validarNombre();
    validarFormulario();
});

inputEmail.addEventListener("input", () => {
    validarEmail();
    validarFormulario();
});

inputMensaje.addEventListener("input", () => {
    validarMensaje();
    validarFormulario();
});

const mensajeExitoso = document.getElementById("registroExitoso");

const enviarFormulario = async () => {
    mensajeExitoso.textContent = "Enviando...";
    await new Promise(resolve => setTimeout(resolve, 1500));
    mensajeExitoso.textContent = "Envio exitoso!";
    formulario.reset();
    inputNombre.classList.remove("valido");
    inputEmail.classList.remove("valido");
    inputMensaje.classList.remove("valido");
    btnEnviar.disabled = true;
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    enviarFormulario();
});
