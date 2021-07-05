
class Citas {
    constructor(){
        this.citas = []; //arreglo de citas
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];

        const citasString = JSON.stringify(this.citas);
        localStorage.setItem('citas', citasString);
    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id);
        console.log(this.citas);
    }

    edicionCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }

}

export default Citas;