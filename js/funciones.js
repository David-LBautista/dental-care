import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import { pacienteInput,
        servicioInput,
        telefonoInput,
        fechaInput,
        horaInput,
        observacionesInput,
        formulario} from './selectores.js';


const ui = new UI();
const adminCitas = new Citas();

let editando = false;

const citaObj = {
    paciente: '',
    servicio: '',
    telefono: '',
    fecha: '',
    hora: '',
    observaciones: ''
};


export function datosCita(e){
    citaObj[e.target.name] = e.target.value;


}


export function nuevaCita(e){
    e.preventDefault();

    const { paciente , servicio, telefono, fecha, hora, observaciones} = citaObj;

    //Validamos
    if (paciente === '', servicio === '',telefono === '',fecha === '',hora === '',observaciones === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if (editando) {
        ui.imprimirAlerta('Se editó correctamente');

    
        //pasar el objeto de la cita a edicion
        adminCitas.edicionCita({...citaObj});
        


        //regresar el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //quitando modo edicion
        editando = false;

        // limpiamos el html del div
        ui.clearHtml();

    }else{

        //Generar un id unico
        citaObj.id = Date.now();

        //Creamos la nueva cita
        adminCitas.agregarCita({...citaObj});

        //Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente');
    }


    // Reiniciamos el formulario y el objeto
    reiniciarObj();
    formulario.reset();

    //Mostramos la cita en el DOM
    ui.mostrarCita(adminCitas);
}

export function reiniciarObj(){
    citaObj.paciente = '';
    citaObj.servicio = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.observaciones = '';
}

export function eliminarCita(id){

    //Eliminar cita
    adminCitas.eliminarCita(id);

    //Muestre el mensaje de eliminado
    ui.imprimirAlerta('La cita se elimino correctamente :)');

    // Refresque las citas del DOM
    ui.mostrarCita(adminCitas);

}

export function editarCita(cita){
    const { paciente, servicio, telefono, fecha, hora, observaciones, id } = cita;

    //llenamos los input
    pacienteInput.value = paciente;
    servicioInput.value = servicio;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    observacionesInput.value = observaciones;

    //Llenamos el objeto
    citaObj.paciente = paciente;
    citaObj.servicio = servicio;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.observaciones = observaciones;
    citaObj.id = id;


    ui.clearHtml(adminCitas);

    //Cambiamos el texto del boton de guardar
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}