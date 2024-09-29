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
    let comunaAmb1, comunaAmb2, comunaAmb3, barriosComuna;

    try {
        const data3 = await fs.readFile('./dolares1.json', 'utf8');
        let dolares = JSON.parse(data3);
        let dolaresInfo = Object.keys(dolares).map(fecha => ({
            Fecha: fecha,
            oficialCompra: dolares[fecha]?.oficial?.compra,
            oficialVenta: dolares[fecha]?.oficial?.venta,
            informalCompra: dolares[fecha]?.informal?.compra,
            informalVenta: dolares[fecha]?.informal?.venta,
            mayoristaCompra: dolares[fecha]?.mayorista?.compra,
            mayoristaVenta: dolares[fecha]?.mayorista?.venta,
            cclCompra: dolares[fecha]?.ccl?.compra,
            cclVenta: dolares[fecha]?.ccl?.venta,
            bancosCompra: dolares[fecha]?.bancos?.compra,
            bancosVenta: dolares[fecha]?.bancos?.venta
        }));
        
        writeData(dolaresInfo, 'dolares.json');
    } catch (err) {
        console.error('Error al leer o procesar los archivos:', err);
    }
}

main();