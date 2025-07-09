import Notificacion from "./classes/Notificacion.js";
import AdminCitas from "./classes/AdminCitas.js";

import { pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput, formulario, formularioInput, contenedorCitas } from "./selectores.js";

const btnEditar = document.querySelector('.btn-editar');

// Eventos
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);
formulario.addEventListener('submit', submitCita)


let editando = false;

const citaObj = {
    id: generarId(),
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

const citas = new AdminCitas();

function submitCita(e) {
    e.preventDefault();
    if (Object.values(citaObj).some(valor => valor.trim() === '')) {
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
        return;
    }

    if (editando) {
        citas.editar({ ...citaObj });
        new Notificacion({
            texto: 'Actualizado correctamente',
            tipo: 'exito'
        });
    } else {
        citas.agregar({ ...citaObj });
        new Notificacion({
            texto: 'Paciente registrado',
            tipo: 'exito'
        });
    }

    formulario.reset();
    reiniciarObjetoCita(); // Borrar datos del formulario
    formularioInput.value = "Registrar Paciente"
    editando = false;
}

function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

// Borrar datos del formulario
function reiniciarObjetoCita() {
    citaObj.id = generarId();
    citaObj.paciente = '';
    citaObj.propietario = '';
    citaObj.email = '';
    citaObj.fecha = '';
    citaObj.sintomas = '';
}

function cargarEdicion(cita) {
    Object.assign(citaObj, cita);

    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando = true;

    formularioInput.value = "Guardan cambios"
}