
const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
function handleString(str) {
    str = str.replaceAll('á', 'a')
    str = str.replaceAll('Á', 'A')
    str = str.replaceAll('é', 'e')
    str = str.replaceAll('É', 'E')
    str = str.replaceAll('í', 'i')
    str = str.replaceAll('Í', 'I')
    str = str.replaceAll('ó', 'o')
    str = str.replaceAll('Ó', 'O')
    str = str.replaceAll('ú', 'u')
    str = str.replaceAll('Ú', 'U')
    str = str.replaceAll('Ü', 'U')
    str = str.replaceAll('ü', 'u')
    str = str.replaceAll("'", '')
    str = str.replaceAll('`', '');
    str = str.replaceAll('´', '');
    str = str.toUpperCase();
    return str
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
    let nuevoMes = date.getMonth() + mesesOffset;

    // Ajustar el año si el nuevoMes excede los 11 (diciembre)
    const nuevoAño = date.getFullYear() + Math.floor(nuevoMes / 12);
    nuevoMes = nuevoMes % 12; // Ajustar el mes para que quede en el rango de 0-11

    // Establecer la nueva fecha (el día ya está seteado en 1)
    date.setFullYear(nuevoAño);
    date.setMonth(nuevoMes);
    // Devolver la fecha en formato ISO (que incluye la hora)
    return date?.toISOString();
}
const moneyFormat = (v) => "$" + new Intl.NumberFormat("de-DE", { style: "currency", currency: "ARS" }).format(parseFloat(v)).replace("ARS", "");
function formatoFechaMesAnio(fecha) {
    const date = new Date(fecha);

    // Extraer año y mes de ambas fechas
    const year = date.getUTCFullYear();
    const month = meses[date.getMonth()];

    return `${month}-${year % 2000}`
}
function generateMonthlyDates(startDate, endDate) {
    const result = [];

    let currentDate = new Date(startDate);
    currentDate.setDate(1);  // Asegurar que el día sea 1

    const finalDate = new Date(endDate);
    finalDate.setDate(1);

    // Generar las fechas en el formato 'mes-año'
    while (currentDate <= finalDate) {
        const month = meses[currentDate.getMonth()];
        const year = currentDate.getFullYear();

        result.push(`${month}-${year % 2000}`);

        // Sumar un mes
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return result;
}
function createDataset(data) {
    const { precio, cadencia, valorPrimeraActualizacion, fechaInicioContrato, dataAlquiler, dataIndice } = data;

    // Obtener las fechas del rango (del mes de inicio hasta cadencia * 2 meses posteriores)
    const startDate = new Date(fechaInicioContrato);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + cadencia * 2 - 1);

    const mesesArray = generateMonthlyDates(startDate, endDate);  // Generamos las fechas en formato 'Ene-25'

    // Crear el dataset
    const dataset = mesesArray.map((mes, index) => {
        // Determinar el precioAlquiler (primeros cadencia meses precio, luego valorPrimeraActualizacion)
        const precioAlquiler = index < cadencia ? precio : valorPrimeraActualizacion;

        // Buscar el promedioAlquiler en el array de dataAlquiler, si no existe para la fecha, asignar 0
        const alquilerData = dataAlquiler.find(item => formatoFechaMesAnio(item.fecha) === mes);
        const promedioAlquiler = alquilerData ? alquilerData.valor : 0;

        // Buscar el indice en el array de dataIndice, si no existe para la fecha, asignar 0
        const indiceData = dataIndice.find(item => formatoFechaMesAnio(item.fecha) === mes);
        const indice = indiceData ? indiceData.valor : 0;

        return {
            precioAlquiler,
            promedioAlquiler,
            indice,
            mes
        };
    });

    return dataset;
};

export { handleString, compararFechasPorMesYAnio, ajustarFechaPorMes, moneyFormat, formatoFechaMesAnio, generateMonthlyDates, createDataset }