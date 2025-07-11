let DB;

import Notificacion from "./classes/Notificacion.js";
import { citaObj, editando } from "./variables.js";
import AdminCitas from "./classes/AdminCitas.js";
import { formulario, formularioInput, pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput } from "./selectores.js";

const citas = new AdminCitas();

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

export function submitCita(e) {
    e.preventDefault();
    if (Object.values(citaObj).some(valor => valor.trim() === '')) {
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
        return;
    }

    if (editando.value) {
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
    editando.value = false;
}

export function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

// Borrar datos del formulario
export function reiniciarObjetoCita() {
    citaObj.id = generarId();
    citaObj.paciente = '';
    citaObj.propietario = '';
    citaObj.email = '';
    citaObj.fecha = '';
    citaObj.sintomas = '';
}

export function cargarEdicion(cita) {
    Object.assign(citaObj, cita);

    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando.value = true;

    formularioInput.value = "Guardan cambios"
}

export function creaDB() {
    // Crear base de datos en una versión 1.0
    const crearDB = window.indexedDB.open('citas', 1);

    // 404
    crearDB.oneerror = function () {
        console.log('Hubo un error');
    }

    // 200
    crearDB.onsuccess = function () {
        console.log('Base de datos creada');

        DB = crearDB.result;

        console.log(DB);
    }

    // Crear schema
    crearDB.onupgradeneeded = function (e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('citas', {
            KeyPath: 'id',
            autoIncrement: true,
        });

        objectStore.createIndex('paciente', 'paciente', { unique: false });
        objectStore.createIndex('propietario', 'propietario', { unique: false });
        objectStore.createIndex('email', 'email', { unique: false });
        objectStore.createIndex('fecha', 'fecha', { unique: false });
        objectStore.createIndex('sintomas', 'sintomas', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });

        console.log('Db creada y lista');
    }
}

export function eventListener() {

}