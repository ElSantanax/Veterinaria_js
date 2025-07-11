import { pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput, formulario } from "./selectores.js";

import { datosCita, submitCita, eventListener, creaDB } from "./funciones.js";

// Eventos
pacienteInput.addEventListener('input', datosCita);
propietarioInput.addEventListener('input', datosCita);
emailInput.addEventListener('input', datosCita);
fechaInput.addEventListener('input', datosCita);
sintomasInput.addEventListener('input', datosCita);
formulario.addEventListener('submit', submitCita);

window.onload = () => {
    eventListener();
    creaDB();
}