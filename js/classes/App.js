import { datosCita, nuevaCita} from '../funciones.js';

import { pacienteInput,
        servicioInput,
        fechaInput,
        telefonoInput,
        horaInput,
        observacionesInput,
        formulario} from '../selectores.js';


class App {
    constructor(){
        this.initApp();
    }

    initApp(){
    pacienteInput.addEventListener('input', datosCita);
    servicioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    observacionesInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita );

    }
}

export default App;