// Constantes
const BODY = document.querySelector("body")
const TOGGLE = document.querySelector(".toggle");
const TOGGLE__P = document.querySelector(".toggle__p");
const TOGGLE__IMG = document.querySelector(".toggle__img");
const LECTURA = document.querySelector("#lectura");
const ENCRIPTAR = document.querySelector("#encriptar");
const DEFAULT = document.querySelector(".default");
const DATOS = document.querySelector(".datos");
const DESENCRIPTAR = document.querySelector("#desencriptar");
const ESCRITURA = document.querySelector("#escritura");
const COPIAR = document.querySelector("#copiar");


// Eventos
TOGGLE.addEventListener("click", darkMode);
ENCRIPTAR.addEventListener("click", encriptar);
DESENCRIPTAR.addEventListener("click", desencriptar);
COPIAR.addEventListener("click", copiar);


// Funciones
function darkMode(e) {
    BODY.classList.toggle("dark");

    if (BODY.classList.contains("dark")) {
        TOGGLE__P.textContent = "Claro";
        TOGGLE__IMG.src = "img/sol.png";
    } else {
        TOGGLE__P.textContent = "Oscuro";
        TOGGLE__IMG.src = "img/luna.png";
    }
}

function ocultar() {
    DATOS.classList.remove("ocultar");
    DEFAULT.classList.add("ocultar");
}

function encriptar(e) {
    if (LECTURA.value.trim() === "") { 
        LECTURA.value = "";
        
        LECTURA.placeholder = "Tienes que escribir algo para encriptar";
        
        setTimeout(() => {
            LECTURA.placeholder = "Ingrese el texto aquí";
        }, 1500);
        
        return;

    } else {
        ocultar();

        // Este código puede ser escrito es una sola linea, pero de la siguiente forma es más entendible
        let minus = LECTURA.value.toLowerCase(); // Pasa el valor a minúscula

        let sinAcentos = minus.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina la acentuación
        
        ESCRITURA.innerHTML = sinAcentos.trimStart().replace(/e/g, "enter")
                                                    .replace(/i/g, "imes")
                                                    .replace(/a/g, "ai")
                                                    .replace(/o/g, "ober")
                                                    .replace(/u/g, "ufat"); // Reemplaza los valores y elimina los espacios vacíos al comienzo del texto

        // El código anterior en una sola linea quedaría de la siguiente manera
        // ESCRITURA.innerHTML = LECTURA.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/e/g, "enter").replace(/i/g, "imes").replace(/a/g, "ai").replace(/o/g, "ober").replace(/u/g, "ufat");

        LECTURA.value = "";
    }
};

function desencriptar(e) {
    if (LECTURA.value.trim() === "") {
        LECTURA.value = "";
        
        LECTURA.placeholder = "Tienes que escribir algo para desencriptar";
        
        setTimeout(() => {
            LECTURA.placeholder = "Ingrese el texto aquí";
        }, 1500);
        
        return

    } else {
        ocultar();

        ESCRITURA.innerHTML = LECTURA.value.trimStart().replace(/enter/g, "e")
                                                        .replace(/imes/g, "i")
                                                        .replace(/ai/g, "a")
                                                        .replace(/ober/g, "o")
                                                        .replace(/ufat/g, "u");

        LECTURA.value = "";
    }

};

function copiar(e) {
    navigator.clipboard.writeText(ESCRITURA.value);
    COPIAR.textContent = "Copiado!!";
    COPIAR.classList.add("copiado");
    ESCRITURA.textContent = "";

    setTimeout(() => {
        COPIAR.classList.remove("copiado");
        COPIAR.textContent = "Copiar";
        
        DATOS.classList.add("ocultar");
        DEFAULT.classList.remove("ocultar");
    }, 1500);

};
