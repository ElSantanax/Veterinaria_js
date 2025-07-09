import { formulario } from "../selectores.js";

export default class Notificacion {
    constructor({ texto, tipo }) {
        this.texto = texto;
        this.tipo = tipo;
        this.mostrar();
    }

    mostrar() {
        // Crear notificiación
        const alerta = document.createElement('DIV');
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');

        const alertaPrevia = document.querySelector('.alert'); // Eliminar repetición de la alerta
        alertaPrevia?.remove();

        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500'); // Si es de tipo error o no
        alerta.textContent = this.texto; // Agregar el texto de la alerta
        formulario.parentElement.insertBefore(alerta, formulario); // Insertar en el DOM

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}