// Selectores
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

// Event
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);

const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
}

// Funciones
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}
