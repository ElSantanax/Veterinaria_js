// Selectores
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');

// Event
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);

formulario.addEventListener('submit', submitCita)

const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
}

class Notificacion {
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

class AdminCitas {
    constructor() {
        this.citas = [];
    }

    agregar(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }
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
    citas.agregar(citaObj);
}