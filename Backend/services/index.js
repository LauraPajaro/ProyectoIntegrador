import * as sql from '../models/sql.js';
const ipc ='ipc';
const icl ='icl';
const alquileres1Amb ='alquileres1Amb';
const alquileres2Amb ='alquileres2Amb';
const alquileres3Amb ='alquileres3Amb';
const alquileresAmb = 'alquileres{{cantidad}}Amb'
const modelos ='modelos';
const predicciones ='predicciones';
const tiposPrediccion ='tiposPrediccion';
const barrios ='barrios';
function formatToISO(dateString) {
    // Dividimos la fecha en día, mes y año
    const [day, month, year] = dateString.split('/');
  
    // Devolvemos la fecha en el formato ISO estándar YYYY-MM-DD
    return `${year}-${month}-${day}`;
  };
export default {
    //IPC
    getHistoricoIPC: async () => {
        let res = await sql.get(ipc);
        return res
    },
    getConsulta: async (consulta) => {
        let { precio, barrio, indice, cadencia, cantidadAmb, fechaInicioContrato } = consulta;
        let tipoPrediccionIndice = await sql.find(tiposPrediccion,t => t.nombre === indice);
        // let modelosIndice = 
        // let prediccionesIndice =   
        let res = await sql.get(datosIPC);
        return res
    },
}