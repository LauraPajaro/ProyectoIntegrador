import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DAY_IN_MILLI = 1000 * 3600 * 24;
dotenv.config({ path: path.join(__dirname, '.env') })
function formatToISO(dateString) {
  // Dividimos la fecha en día, mes y año
  const [day, month, year] = dateString.split('/');

  // Devolvemos la fecha en el formato ISO estándar YYYY-MM-DD
  return `${year}-${month}-${day}`;
};
function transformarPropiedades(obj) {
  const nuevoObj = {};

  // Recorrer las propiedades del objeto
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Si la primera letra es mayúscula, convertirla en minúscula
      if (key.charAt(0) === key.charAt(0).toUpperCase()) {
        const nuevaKey = key.charAt(0).toLowerCase() + key.slice(1);
        nuevoObj[nuevaKey] = obj[key];
      } else {
        // Si no está en mayúscula, mantenerla igual
        nuevoObj[key] = obj[key];
      }
    }
  }

  return nuevoObj;
}
let barrios
let ipc
let icl
let alquileres1Amb
let alquileres2Amb
let alquileres3Amb
let modelos
let tiposPrediccion
let registrosBarrios
let prediccionesIPC
let prediccionesICL
let prediccionesAlquileres1Amb
let prediccionesAlquileres2Amb
let prediccionesAlquileres3Amb
const insertMany = async (table, arr) => {
  let res = [];
  const chunkSize = 50;
  for (let i = 0; i < arr?.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    await table.insert(chunk)
    //res = [...res, ...await table.insert(chunk).returning(['*'])];
  }
  return res;
};

const crearBarrios = async (knex) => {
  let registrosBarrios = [];
  console.log('AAAAAAAAAA',barrios[0])
  barrios?.forEach(b => {
    let comuna = b?.comuna;
    registrosBarrios = [...registrosBarrios].concat(b.barrios?.filter(x => ['Microcentro', 'Congreso', 'Once', 'BarrioNorte',]).map(x => ({ comuna, nombre: x })))
  })
  await knex('barrios').insert(registrosBarrios).returning(['*']);
}
const crearIpc = async (knex) => {
  let registrosIpc = ipc?.map(i => (transformarPropiedades(i)))
  await knex('ipc').insert(registrosIpc?.map(r => ({ fecha: formatToISO(r.fecha), valor: parseFloat(r.valor) }))).returning(['*']);
}
const crearIcl = async (knex) => {
  let registrosIcl = icl?.map(i => (transformarPropiedades(i)))
  await knex('icl').insert(registrosIcl?.map(r => ({ fecha: formatToISO(r.fecha), valor: parseFloat(r.valor) }))).returning(['*']);
}
const crearAlquileres1Amb = async (knex, barrios) => {
  let registrosBarrios = [];

  for (let alquileres of alquileres1Amb) {
    let barrioId = barrios?.find(b => b.nombre === alquileres?.barrio)?.barrioId;  // Obtener el barrioId

    // Recorre las propiedades del objeto para extraer fechas y valores
    for (let [fecha, valor] of Object.entries(alquileres)) {
      if (fecha !== 'barrio') {  // Ignora la propiedad 'barrio'
        // Formatear la fecha a YYYY-MM-DD
        let [mes, año] = fecha.split('-');
        let fechaFormateada = new Date(`${año}-${mes}-01`).toISOString().split('T')[0]; // Obtiene el formato ISO
        // Agregar registro al array
        registrosBarrios.push({
          fecha: fechaFormateada,
          valor: parseFloat(valor), // Asegúrate de que el valor sea un número
          barrioId: barrioId // Agregar el barrioId
        });
      }
    }
  }
  await knex('alquileres1Amb').insert(registrosBarrios).returning(['*']);
};
const crearAlquileres2Amb = async (knex, barrios) => {
  let registrosBarrios = [];

  for (let alquileres of alquileres2Amb) {
    let barrioId = barrios?.find(b => b.nombre === alquileres?.barrio)?.barrioId;  // Obtener el barrioId

    // Recorre las propiedades del objeto para extraer fechas y valores
    for (let [fecha, valor] of Object.entries(alquileres)) {
      if (fecha !== 'barrio') {  // Ignora la propiedad 'barrio'
        // Formatear la fecha a YYYY-MM-DD
        let [mes, año] = fecha.split('-');
        let fechaFormateada = new Date(`${año}-${mes}-01`).toISOString().split('T')[0]; // Obtiene el formato ISO
        // Agregar registro al array
        registrosBarrios.push({
          fecha: fechaFormateada,
          valor: parseFloat(valor), // Asegúrate de que el valor sea un número
          barrioId: barrioId // Agregar el barrioId
        });
      }
    }
  }
  await knex('alquileres2Amb').insert(registrosBarrios).returning(['*']);
};
const crearAlquileres3Amb = async (knex, barrios) => {
  let registrosBarrios = [];

  for (let alquileres of alquileres3Amb) {
    let barrioId = barrios?.find(b => b.nombre === alquileres?.barrio)?.barrioId;  // Obtener el barrioId

    // Recorre las propiedades del objeto para extraer fechas y valores
    for (let [fecha, valor] of Object.entries(alquileres)) {
      if (fecha !== 'barrio') {  // Ignora la propiedad 'barrio'
        // Formatear la fecha a YYYY-MM-DD
        let [mes, año] = fecha.split('-');
        let fechaFormateada = new Date(`${año}-${mes}-01`).toISOString().split('T')[0]; // Obtiene el formato ISO
        // Agregar registro al array
        registrosBarrios.push({
          fecha: fechaFormateada,
          valor: parseFloat(valor), // Asegúrate de que el valor sea un número
          barrioId: barrioId // Agregar el barrioId
        });
      }
    }
  }
  await knex('alquileres3Amb').insert(registrosBarrios).returning(['*']);
};
const crearModelosIpc = async (knex, tiposPrediccion) => {
  let tipoPrediccionId = tiposPrediccion?.find(t => t.nombre === 'ipc')?.tipoPrdiccionIpcId;

  // 2. Insertar el modelo en la tabla modelos
  const { mae, ultimaFechaEntrenamiento, nombreModelo, steps } = prediccionesIPC;
  const [modeloId] = await knex('modelos').insert({
    mae: mae,
    ultimaFechaEntrenamiento: ultimaFechaEntrenamiento,
    nombreModelo: nombreModelo,
    steps: steps,
    tipoPrediccionId: tipoPrediccionId
  }).returning('modeloId');  // Obtiene el modeloId generado
  // 3. Preparar y cargar las predicciones en la tabla predicciones
  const registrosPredicciones = prediccionesIPC.predicciones.map(prediccion => ({
    fecha: prediccion.fecha,
    valor: prediccion.valor,
    valorMin: prediccion.valorMin,
    valorMax: prediccion.valorMax,
    modeloId: modeloId?.modeloId   // Relaciona la predicción con el modelo
  }));

  // 4. Insertar las predicciones en la tabla
  await knex('predicciones').insert(registrosPredicciones);
};
const crearModelosIcl = async (knex, tiposPrediccion) => {
  let tipoPrediccionId = tiposPrediccion?.find(t => t.nombre === 'icl')?.tipoPrdiccionIpcId;

  // 2. Insertar el modelo en la tabla modelos
  const { mae, ultimaFechaEntrenamiento, nombreModelo, steps } = prediccionesICL;
  const [modeloId] = await knex('modelos').insert({
    mae: mae,
    ultimaFechaEntrenamiento: ultimaFechaEntrenamiento,
    nombreModelo: nombreModelo,
    steps: steps,
    tipoPrediccionId: tipoPrediccionId
  }).returning('modeloId');  // Obtiene el modeloId generado
  // 3. Preparar y cargar las predicciones en la tabla predicciones
  const registrosPredicciones = prediccionesIPC.predicciones.map(prediccion => ({
    fecha: prediccion.fecha,
    valor: prediccion.valor,
    valorMin: prediccion.valorMin,
    valorMax: prediccion.valorMax,
    modeloId: modeloId?.modeloId  // Relaciona la predicción con el modelo
  }));

  // 4. Insertar las predicciones en la tabla
  await knex('predicciones').insert(registrosPredicciones);
};
const crearModelos1Amb = async (knex, tiposPrediccion, barrios) => {
  let  tipoPrediccionId = tiposPrediccion?.find(t => t.nombre === 'alquileres1Amb')?.tipoPrdiccionIpcId;

  // Iterar sobre cada modelo de predicciones para 1 ambiente
  for (const prediccionData of prediccionesAlquileres1Amb) {
    // Buscar el ID del barrio correspondiente
    const barrioId = barrios?.find(b => b.nombre === prediccionData.barrio)?.barrioId;

    // Si no se encuentra el barrioId, se salta el modelo
    if (!barrioId) {
      continue;
    }

    // Crear el registro del modelo
    const modeloData = {
      mae: prediccionData.mae,
      steps: prediccionData.steps,
      ultimaFechaEntrenamiento: prediccionData.ultimaFechaEntrenamiento,
      nombreModelo: prediccionData.nombreModelo,
      tipoPrediccionId: tipoPrediccionId,
      barrioId: barrioId // ID del barrio correspondiente
    };

    const [modeloId] = await knex('modelos').insert(modeloData).returning('modeloId');

    // Preparar los registros de predicciones
    const predicciones = prediccionData.predicciones.map(prediccion => ({
      valor: prediccion.valor,
      valorMin: prediccion.valorMin,
      valorMax: prediccion.valorMax,
      fecha: prediccion.fecha, // Ya está en el formato correcto
      modeloId: modeloId?.modeloId
    }));

    // Insertar las predicciones en la base de datos
    await knex('predicciones').insert(predicciones);
  }
};
const crearModelos2Amb = async (knex, tiposPrediccion, barrios) => {
  let tipoPrediccionId = tiposPrediccion?.find(t => t.nombre === 'alquileres2Amb')?.tipoPrdiccionIpcId;

  // Iterar sobre cada modelo de predicciones para 1 ambiente
  for (const prediccionData of prediccionesAlquileres2Amb) {
    // Buscar el ID del barrio correspondiente
    const barrioId = barrios?.find(b => b.nombre === prediccionData.barrio)?.barrioId;

    // Si no se encuentra el barrioId, se salta el modelo
    if (!barrioId) {
      continue;
    }

    // Crear el registro del modelo
    const modeloData = {
      mae: prediccionData.mae,
      steps: prediccionData.steps,
      ultimaFechaEntrenamiento: prediccionData.ultimaFechaEntrenamiento,
      nombreModelo: prediccionData.nombreModelo,
      tipoPrediccionId: tipoPrediccionId,
      barrioId: barrioId // ID del barrio correspondiente
    };

    const [modeloId] = await knex('modelos').insert(modeloData).returning('modeloId');

    // Preparar los registros de predicciones
    const predicciones = prediccionData.predicciones.map(prediccion => ({
      valor: prediccion.valor,
      valorMin: prediccion.valorMin,
      valorMax: prediccion.valorMax,
      fecha: prediccion.fecha, // Ya está en el formato correcto
      modeloId: modeloId?.modeloId
    }));

    // Insertar las predicciones en la base de datos
    await knex('predicciones').insert(predicciones);
  }
};
const crearModelos3Amb = async (knex, tiposPrediccion, barrios) => {
  let tipoPrediccionId = tiposPrediccion?.find(t => t.nombre === 'alquileres3Amb')?.tipoPrdiccionIpcId;

  // Iterar sobre cada modelo de predicciones para 1 ambiente
  for (const prediccionData of prediccionesAlquileres3Amb) {
    // Buscar el ID del barrio correspondiente
    const barrioId = barrios?.find(b => b.nombre === prediccionData.barrio)?.barrioId;

    // Si no se encuentra el barrioId, se salta el modelo
    if (!barrioId) {
      continue;
    }

    // Crear el registro del modelo
    const modeloData = {
      mae: prediccionData.mae,
      steps: prediccionData.steps,
      ultimaFechaEntrenamiento: prediccionData.ultimaFechaEntrenamiento,
      nombreModelo: prediccionData.nombreModelo,
      tipoPrediccionId: tipoPrediccionId,
      barrioId: barrioId // ID del barrio correspondiente
    };

    const [modeloId] = await knex('modelos').insert(modeloData).returning('modeloId');

    // Preparar los registros de predicciones
    const predicciones = prediccionData.predicciones.map(prediccion => ({
      valor: prediccion.valor,
      valorMin: prediccion.valorMin,
      valorMax: prediccion.valorMax,
      fecha: prediccion.fecha, // Ya está en el formato correcto
      modeloId: modeloId?.modeloId
    }));

    // Insertar las predicciones en la base de datos
    await knex('predicciones').insert(predicciones);
  }
};
export const seed = function (knex) {
  console.log('corriendo archivo seed')
  return (async () => {
    barrios = JSON.parse(fs.readFileSync(path.join(__dirname, './datos/barriosXComuna.json')));
    ipc = JSON.parse(fs.readFileSync(path.join(__dirname, './datos/indiceIPC.json')));
    icl = JSON.parse(fs.readFileSync(path.join(__dirname, './datos/indiceICL.json')));
    alquileres1Amb = JSON.parse(fs.readFileSync(path.join(__dirname, './datos/amb1Mensual.json')));
    alquileres2Amb = JSON.parse(fs.readFileSync(path.join(__dirname, './datos/amb2Mensual.json')));
    alquileres3Amb = JSON.parse(fs.readFileSync(path.join(__dirname, './datos/amb3Mensual.json')));

    prediccionesIPC = JSON.parse(fs.readFileSync(path.join(__dirname, './datos/prediccionesICL.json')));
    prediccionesICL = JSON.parse(fs.readFileSync(path.join(__dirname, './datos/prediccionesICL.json')));
    prediccionesAlquileres1Amb = JSON.parse(fs.readFileSync(path.join(__dirname, './datos/predicciones1amb.json')));
    prediccionesAlquileres2Amb = JSON.parse(fs.readFileSync(path.join(__dirname, './datos/predicciones2amb.json')));
    prediccionesAlquileres3Amb = JSON.parse(fs.readFileSync(path.join(__dirname, './datos/predicciones3amb.json')));
  })()
    //Creates
    .then(() => knex('tiposPrediccion')
      .select('*')
      .then(rows => {
        tiposPrediccion = (rows);  // Aquí puedes manejar los resultados, por ejemplo, mostrándolos en la consola
        console.log(`Se obtubieron ${rows?.length} tipos de predicción.`)
      })
      .catch(error => {
        console.error('Error obteniendo registros:', error);  // Manejo de errores
      })
      .finally(() => {
        knex.destroy();  // Cierra la conexión después de la consulta
      }))
    .then(() => crearBarrios(knex))
    .then(() => console.log('se cargaron barrios'))
    .then(() => knex('barrios')
      .select('*')
      .then(rows => {
        registrosBarrios = (rows);  // Aquí puedes manejar los resultados, por ejemplo, mostrándolos en la consola
        console.log(`Se obtubieron ${rows?.length} barrios.`)
      })
      .catch(error => {
        console.error('Error obteniendo registros barrios:', error);  // Manejo de errores
      })
      .finally(() => {
        knex.destroy();  // Cierra la conexión después de la consulta
      })
  )

  .then(() => crearIpc(knex))
  .then(() => console.log('se cargaron índices ipc'))
  .then(() => crearIcl(knex))
  .then(() => console.log('se cargaron índices icl'))
  .then(() => crearAlquileres1Amb(knex, registrosBarrios))
  .then(() => console.log('se cargaron los datos de alquileres 1 amb'))
  .then(() => crearAlquileres2Amb(knex, registrosBarrios))
  .then(() => console.log('se cargaron los datos de alquileres 2 amb'))
  .then(() => crearAlquileres3Amb(knex, registrosBarrios))
  .then(() => console.log('se cargaron los datos de alquileres 3 amb'))
  .then(() => crearModelosIpc(knex, tiposPrediccion))
  .then(() => console.log('se cargaron modelos y predicciones ipc'))
  .then(() => crearModelosIcl(knex, tiposPrediccion))
  .then(() => console.log('se cargaron modelos y predicciones de icl'))
  .then(() => crearModelos1Amb(knex, tiposPrediccion, registrosBarrios))
  .then(() => console.log('se cargaron modelos y predicciones de 1 amb'))
  .then(() => crearModelos2Amb(knex, tiposPrediccion, registrosBarrios))
  .then(() => console.log('se cargaron modelos y predicciones de 2 amb'))
  .then(() => crearModelos3Amb(knex, tiposPrediccion, registrosBarrios))
  .then(() => console.log('se cargaron modelos y predicciones de 3 amb'))
  .then(async () => {
    const tables = [
      { tableName: 'ipc', idColumn: 'ipcId' },
      { tableName: 'icl', idColumn: 'iclId' },
      { tableName: 'barrios', idColumn: 'barrioId' },
      { tableName: 'modelos', idColumn: 'modeloId' },
      { tableName: 'predicciones', idColumn: 'prediccionId' },
      { tableName: 'tiposPrediccion', idColumn: 'tipoPrediccionId' },
      { tableName: 'alquileres2Amb', idColumn: 'alquiler2AmbId' },
      { tableName: 'alquileres1Amb', idColumn: 'alquiler1AmbId' },
      { tableName: 'alquileres3Amb', idColumn: 'alquiler3AmbId' },
    ];

    for (let table of tables) {
      const maxIdResult = await knex(table.tableName).max(table.idColumn);
      console.log(table, maxIdResult)
      const maxValue = (maxIdResult[0].max + 1) || 1;

      await knex.raw(`ALTER SEQUENCE "${table.tableName}_${table.idColumn}_seq" RESTART WITH ${maxValue};`);
    }
  })
  .catch(console.log)
  };