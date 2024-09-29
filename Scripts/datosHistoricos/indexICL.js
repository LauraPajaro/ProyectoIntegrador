import { promises as fs } from 'fs';
import path from 'path';
async function writeData(data, name) {
    try {
        // Asegurarse de que el directorio './datosLimpios' exista
        const directoryPath = './datosLimpios';
       // await fs.mkdir(directoryPath, { recursive: true }); // Crea el directorio si no existe

        // Ruta del archivo donde se escribirá la data
        const filePath = path.join(directoryPath, name);

        // Convertir el objeto a una cadena JSON
        data = JSON.stringify(data, null, 2); // null, 2 para un formato legible

        // Escribir el archivo
        await fs.writeFile(filePath, data, 'utf8');

        console.log('Archivo '+ name +'escrito exitosamente en:', filePath);
    } catch (error) {
        console.error('Error al escribir el archivo'+ name +':', error);
    }
}
async function main() {

    try {
        const data = await fs.readFile('./indiceICL.json', 'utf8');
        const dataIPC = await fs.readFile('./indiceIPC.json', 'utf8');
        let ipc = JSON.parse(dataIPC);
        let icl = JSON.parse(data);
        let iclInfo = ipc.map(m => ({
            Fecha: m.Fecha,
            Valor: icl.find(x=>  x.Fecha === m.Fecha)?.Valor
        }));
        
        writeData(iclInfo, 'iclMensual.json');
    } catch (err) {
        console.error('Error al leer o procesar los archivos:', err);
    }
}

main();