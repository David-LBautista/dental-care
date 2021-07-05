import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import { pacienteInput,
        servicioInput,
        telefonoInput,
        fechaInput,
        horaInput,
        observacionesInput,
        formulario} from './selectores.js';


export let DB;


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

        //Editar un registro de la BD
        const transaction = DB.transaction(['citas'], 'readwrite');
        const objectStore = transaction.objectStore('citas');
        objectStore.put(citaObj);

        transaction.oncomplete = () => {
        ui.imprimirAlerta('Guardado correctamente')

        //regresar el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //quitando modo edicion
        editando = false;

        // limpiamos el html del div
        ui.clearHtml();
        };

        transaction.onerror = () => {
            console.log('No se pudo editar el elemento');
        }
        


        

    }else{

        //Generar un id unico
        citaObj.id = Date.now();

        //Creamos la nueva cita
        adminCitas.agregarCita({...citaObj});

        //Insertamos el registro en indexDB
        const transaction = DB.transaction(['citas'], 'readwrite');

        //Habilitamos el objectStore
        const objectStore = transaction.objectStore('citas');

        //insertamos en indexDB
        objectStore.add(citaObj);

        transaction.oncomplete = () => {
            console.log('Cita agregada');
            ui.imprimirAlerta('Se agrego correctamente');
        };
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

    const transaction = DB.transaction(['citas'], 'readwrite');
    const objectStore = transaction.objectStore('citas');

    objectStore.delete(id);

    transaction.oncomplete = () => {

        ui.imprimirAlerta('La cita se elimino correctamente :)');

        ui.mostrarCita();
    }

    transaction.onerror = () => {
        console.log('Hubo un error al eliminar la cita');
    }

    //Eliminar cita
    adminCitas.eliminarCita(id);

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

export function crearDB(){

    //creamos la bd en indexedDB version 1.0
    const crearDB = window.indexedDB.open('citas', 1);

    //Si hay un error
    crearDB.onerror = () => {
        console.log('Hubo un error al crear la base de datos');
    }
    
    //si se crea correctamente
    crearDB.onsuccess = () => {
        
        DB = crearDB.result;

        //Mostramos las citas al cargar el DOM
        ui.mostrarCita();
    }

    //Definimos el schema
    crearDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        //definimos el objectStore
        const objectStore = db.createObjectStore('citas', {
            keyPath: 'id',
            autoIncrement: true
        });

        //Definimos las columnas
        objectStore.createIndex('paciente', 'paciente', { unique: false});
        objectStore.createIndex('servicio', 'servicio', { unique: false});
        objectStore.createIndex('telefono', 'telefono', { unique: false});
        objectStore.createIndex('fecha', 'fecha', { unique: false});
        objectStore.createIndex('hora', 'hora', { unique: false});
        objectStore.createIndex('observaciones', 'observaciones', { unique: false});
        objectStore.createIndex('id', 'id', { unique: true});

        console.log('Base de datos creada');
    }

}