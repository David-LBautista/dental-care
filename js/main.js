//*Campos del formulario
const pacienteInput = document.querySelector('#paciente');
const servicioInput = document.querySelector('#servicio');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const observacionesInput = document.querySelector('#observaciones');


//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');








//! CLASES

class Citas {

    constructor(){
        this.citas = []; //arreglo de citas
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }

}

class UI {

    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert','d-block', 'col-12')

        //Agregar clase en base al tipo de mensaje
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje error
        divMensaje.textContent = mensaje;

        // agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

}


//Instanciando
const ui = new UI();
const adminCitas = new Citas();











//! Registro de eventos
eventListeners();
function eventListeners() {
    pacienteInput.addEventListener('input', datosCita);
    servicioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    observacionesInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita );

}


//! OBJETO PRINCIPAL DE LA CITA
const citaObj = {
    paciente: '',
    servicio: '',
    telefono: '',
    fecha: '',
    hora: '',
    observaciones: ''
}





//! FUNCIONES
function datosCita(e){
    citaObj[e.target.name] = e.target.value;

    console.log(citaObj);
}


function nuevaCita(e){
    e.preventDefault();

    const { paciente , servicio, telefono, fecha, hora, observaciones} = citaObj;

    //Validamos
    if (paciente === '', servicio === '',telefono === '',fecha === '',hora === '',observaciones === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
}












