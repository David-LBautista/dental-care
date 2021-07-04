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

    mostrarCita({citas}){

        this.limpiarHtml();

        citas.forEach( cita => {

            const { paciente , servicio, telefono, fecha, hora, observaciones, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('card');
            divCita.dataset.id = id;
            divCita.innerHTML = `
            <div class="card-body col-sm-12 col-md-12">
                <h5 class="card-title fs-2">${paciente}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${servicio}</h6>
                <p><span class"font-weight-bolder">Telefono:</span> ${telefono}</p> 
                <p><span class"font-weight-bolder">Fecha:</span> ${fecha}</p> 
                <p><span class"font-weight-bolder">Hora:</span> ${hora}</p> 
                <p><span class"font-weight-bolder">Observaciones:</span> ${observaciones}</p> 
            
                
                </div>
            `;


            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHtml(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
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
};





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

    //Generamos un id unico
    citaObj.id = Date.now();

    // Creamos la nueva cita
    adminCitas.agregarCita({...citaObj});

    // Mensaje de agregado correctamente
    ui.imprimirAlerta('Se agrego la cita correctamente');

    // Reiniciamos el formulario y el objeto
    reiniciarObj();
    formulario.reset();

    //Mostramos la cita en el DOM
    ui.mostrarCita(adminCitas);
}

function reiniciarObj(){
    citaObj.paciente = '';
    citaObj.servicio = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.observaciones = '';
}

function eliminarCita(id){

    //Eliminar cita
    adminCitas.eliminarCita(id);

    //Muestre el mensaje de eliminado
    ui.imprimirAlerta('La cita se elimino correctamente :)');

    // Refresque las citas del DOM
    ui.mostrarCita(adminCitas);

}












