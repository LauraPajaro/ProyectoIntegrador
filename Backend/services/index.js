import * as sql from '../models/sql.js';
import _ from 'lodash';
import env from '../config/env.js';
import crypto from 'crypto';

const ipc = 'ipc';
const icl = 'icl';
const alquileres1Amb = 'alquileres1Amb';
const alquileres2Amb = 'alquileres2Amb';
const alquileres3Amb = 'alquileres3Amb';
const alquileresAmb = 'alquileres{{cantidad}}Amb'
const modelos = 'modelos';
const predicciones = 'predicciones';
const tiposPrediccion = 'tiposPrediccion';
const barrios = 'barrios';
function formatToISO(dateString) {
    // Dividimos la fecha en día, mes y año
    const [day, month, year] = dateString.split('/');

    // Devolvemos la fecha en el formato ISO estándar YYYY-MM-DD
    return `${year}-${month}-${day}`;
};
function compararFechasPorMesYAnio(fecha1, fecha2, operadorLogico) {
    // Convertir las fechas a objetos Date
    const date1 = new Date(fecha1);
    const date2 = new Date(fecha2);

    // Extraer año y mes de ambas fechas
    const year1 = date1.getUTCFullYear();
    const month1 = date1.getUTCMonth();
    const year2 = date2.getUTCFullYear();
    const month2 = date2.getUTCMonth();

    // Crear un valor de comparación, sumando mes y año para simplificar la comparación
    const valorFecha1 = year1 * 12 + month1; // Convierte el año y mes en un solo valor
    const valorFecha2 = year2 * 12 + month2;

    // Evaluar el operador lógico entre los dos valores de fecha
    switch (operadorLogico) {
        case '===':
            return valorFecha1 === valorFecha2;
        case '>':
            return valorFecha1 > valorFecha2;
        case '<':
            return valorFecha1 < valorFecha2;
        case '>=':
            return valorFecha1 >= valorFecha2;
        case '<=':
            return valorFecha1 <= valorFecha2;
        default:
            throw new Error(`Operador lógico no soportado: ${operadorLogico}`);
    }
};
function ajustarFechaPorMes(fecha, mesesOffset) {
    // Convertir la fecha en un objeto Date
    const date = new Date(fecha);

    // Obtener el mes actual y sumar el offset de meses
    const nuevoMes = date.getUTCMonth() + (mesesOffset);

    // Ajustar la fecha con el nuevo mes
    date.setUTCMonth(nuevoMes);

    // Devolver la fecha en formato ISO (que incluye la hora)
    return date.toISOString();
};
const encryptResponse = (data) => {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(env.crypto.publicKey, 'hex');  // Carga de la clave pública desde las variables de entorno
    const iv = Buffer.from(env.crypto.iv, 'hex');  // Carga del IV desde las variables de entorno
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
};
export default {
    //IPC
    getHistoricoIPC: async () => {
        let data = await sql.get(ipc);
        const responseBody = JSON.stringify(data);
        const encryptedBody = encryptResponse(responseBody);
        return { data: encryptedBody };
    },
    //Barrios
    getBarrios: async () => {
        let data = await sql.get(barrios);
        const responseBody = JSON.stringify(data);
        const encryptedBody = encryptResponse(responseBody);
        return { data: encryptedBody };
    },
    //TiposPrediccion
    getTiposPrediccion: async () => {
        let data = await sql.get(tiposPrediccion);
        const responseBody = JSON.stringify(data);
        const encryptedBody = encryptResponse(responseBody);
        return { data: encryptedBody };
    },
    //Consulta
    getConsulta: async (prospecto) => {
        let { precio, barrio, indice, cadencia, cantidadAmb, fechaInicioContrato } = prospecto;
        let tipoPrediccionIndice = await sql.find(tiposPrediccion, t => t.nombre === indice);
        let historicoIndice = await sql.get(indice, i => compararFechasPorMesYAnio(i.fecha, fechaInicioContrato, '>='));
        historicoIndice.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        let allModelos = await sql.get(modelos);
        //----------------------------------- DATOS INCICE
        let modeloIndice = allModelos?.filter(m => m.tipoPrediccionId === tipoPrediccionIndice?.tipoPrediccionId)
            ?.reduce((max, curr) => compararFechasPorMesYAnio(curr.ultimaFechaEntrenamiento, max.ultimaFechaEntrenamiento, '>') ? curr : max);
        let allPredicciones = await sql.get(predicciones);
        let prediccionesIndice = allPredicciones?.filter(p => p.modeloId === modeloIndice?.modeloId);
        prediccionesIndice.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        let dataIndice = historicoIndice.map(historico => {
            let prediccion = prediccionesIndice.find(p => compararFechasPorMesYAnio(p.fecha, historico.fecha, '==='));
            return prediccion ? historico : { ...historico, prediccion: null };
        });
        // Añadir predicciones que no se encuentran en el histórico
        prediccionesIndice.forEach(prediccion => {
            if (!dataIndice.some(d => compararFechasPorMesYAnio(d.fecha, prediccion.fecha, '==='))) {
                dataIndice.push(prediccion);
            }
        });
        // 6. Ordenar el array combinado por fecha
        dataIndice.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        //----------------------------------- DATOS PROMEDIO ALQUILER
        let tipoPrediccionAlquiler = await sql.find(tiposPrediccion, t => t.nombre === `alquileres${cantidadAmb}Amb`);
        let barrioId = await sql.find(barrios, b => b.nombre === barrio)
        console.log({barrioId})
        let historicoAlquiler = await sql.get(`alquileres${cantidadAmb}Amb`, i => compararFechasPorMesYAnio(i.fecha, fechaInicioContrato, '>=') && i.barrioId === barrioId?.barrioId);
        historicoAlquiler.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        let modeloAlquiler = allModelos?.filter(m => m.tipoPrediccionId === tipoPrediccionAlquiler?.tipoPrediccionId && barrioId?.barrioId === m.barrioId)
            ?.reduce((max, curr) => compararFechasPorMesYAnio(curr.ultimaFechaEntrenamiento, max.ultimaFechaEntrenamiento, '>') ? curr : max);
        let prediccionesAlquiler = allPredicciones?.filter(p => p.modeloId === modeloAlquiler?.modeloId);
        prediccionesAlquiler.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        let dataAlquiler = historicoAlquiler.map(historico => {
            let prediccion = prediccionesAlquiler.find(p => compararFechasPorMesYAnio(p.fecha, historico.fecha, '==='));
            return prediccion ? historico : { ...historico, prediccion: null };
        });
        // Añadir predicciones que no se encuentran en el histórico
        prediccionesAlquiler.forEach(prediccion => {
            if (!dataAlquiler.some(d => compararFechasPorMesYAnio(d.fecha, prediccion.fecha, '==='))) {
                dataAlquiler.push(prediccion);
            }
        });
        //----------------------------------- DATOS PROSPECTO ACTUALIZADO
        const getActualizacion = (datosIndice, cadencia, fechaInicio, precioOriginal, tipoIndice) => {
            let fechaUltimoIndiceActualizacion = ajustarFechaPorMes(fechaInicio, cadencia - 1);
            
            let valorPrimeraActualizacion = null
            switch (tipoIndice) {
                case 'ipc':
                    let rangoInidice = datosIndice?.filter(i => compararFechasPorMesYAnio(i.fecha, fechaInicio, '>=') && compararFechasPorMesYAnio(i.fecha, fechaUltimoIndiceActualizacion, '<='))
                    valorPrimeraActualizacion = rangoInidice?.reduce((acc, x) => acc * (x.valor / 100 + 1), precioOriginal)
                    return {valorPrimeraActualizacion,fechaUltimoIndiceActualizacion}
                case 'icl':
                    let indiceInicio = datosIndice?.find(d => compararFechasPorMesYAnio(d.fecha, fechaInicio, '==='))
                    let indiceActualizacion = datosIndice?.find(d => compararFechasPorMesYAnio(d.fecha, fechaUltimoIndiceActualizacion, '==='));
                    valorPrimeraActualizacion = precioOriginal / indiceInicio?.valor * indiceActualizacion?.valor;
                    return {valorPrimeraActualizacion,fechaUltimoIndiceActualizacion}
                default:
                    break;
            }

            return {valorPrimeraActualizacion, fechaUltimoIndiceActualizacion}
        };
        let {valorPrimeraActualizacion, fechaUltimoIndiceActualizacion} = getActualizacion(dataIndice, cadencia, fechaInicioContrato, precio, indice);
        let fechaPagoActualizacion =  ajustarFechaPorMes(fechaInicioContrato, cadencia)
        let data = { valorPrimeraActualizacion, fechaUltimoIndiceActualizacion, fechaPagoActualizacion,  dataIndice, dataAlquiler, ...prospecto }
        const responseBody = JSON.stringify(data);
        const encryptedBody = encryptResponse(responseBody);
        return { data: encryptedBody };
    },

}