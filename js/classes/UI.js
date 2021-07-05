import { eliminarCita, editarCita, DB } from '../funciones.js';
import { contenedorCitas, editCita } from '../selectores.js';


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

    mostrarCita(){

        this.limpiarHtml();

        //Leemos el contenido de indexDB
        const objectStore = DB.transaction('citas').objectStore('citas');

        objectStore.openCursor().onsuccess = function(e) {
            const cursor = e.target.result;
            if (cursor) {
                const { paciente , servicio, telefono, fecha, hora, observaciones, id} = cursor.value;

            const divCita = document.createElement('div');
            divCita.classList.add('card', 'p-3');
            divCita.dataset.id = id;

            const pacienteParrafo = document.createElement('h2');
            pacienteParrafo.classList.add('card-title', 'font-weight-bolder', 'fs-3');
            pacienteParrafo.textContent = paciente;

            const servicioParrafo = document.createElement('p', 'fs-6');
            servicioParrafo.style.color = "red";
            servicioParrafo.innerHTML = `
                <span class="fw-bolder">${servicio}</span>
            `;

            const telefonoParrafo = document.createElement('p', 'fs-6');
            telefonoParrafo.innerHTML = `
                <span class="fw-bolder">Telefono:</span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p', 'fs-6');
            fechaParrafo.innerHTML = `
                <span class="fw-bolder">Fecha:</span> ${fecha}
            `;

            const horaParrafo = document.createElement('p', 'fs-6');
            horaParrafo.innerHTML = `
                <span class="fw-bolder">Hora:</span> ${hora}
            `;
            const observacionesParrafo = document.createElement('p', 'fs-6');
            observacionesParrafo.innerHTML = `
                <span class="fw-bolder">Observaciones:</span> ${observaciones}
            `;




            const btnEditar = document.createElement('button');
            const btnEliminar = document.createElement('button');
            const botonesDiv = document.createElement('div');

            btnEditar.classList.add('btn', 'btn-outline-success');
            btnEditar.style.marginRight = '10px';

            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
            </svg>`;

            // btnEditar.onclick = () => editarCita(cita);

            btnEliminar.classList.add('btn', 'btn-outline-danger');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>`;
            btnEliminar.onclick = () => eliminarCita(id);


            botonesDiv.appendChild(btnEditar);
            botonesDiv.appendChild(btnEliminar);
            divCita.appendChild(pacienteParrafo);
            divCita.appendChild(servicioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(observacionesParrafo);
            divCita.appendChild(botonesDiv);
                
            const cita = cursor.value;
            btnEditar.onclick = () =>{
                editarCita(cita);
                editCita.appendChild(divCita);
            }


            contenedorCitas.appendChild(divCita);

            //Vaya al siguiente elemento
            cursor.continue();
            }
        }
    }

    limpiarHtml(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }

    clearHtml(){
        while (editCita.firstChild) {
            editCita.removeChild(editCita.firstChild)
        }
    }

}

export default UI;

