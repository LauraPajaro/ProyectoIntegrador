import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
let now = new Date()
async function writeData(data, name) {
    try {
        // Asegurarse de que el directorio './datosLimpios' exista
        const directoryPath = './datosAlquiler';
        // await fs.mkdir(directoryPath, { recursive: true }); // Crea el directorio si no existe

        // Ruta del archivo donde se escribirá la data
        const filePath = path.join(directoryPath, name);

        // Convertir el objeto a una cadena JSON
        data = JSON.stringify(data, null, 2); // null, 2 para un formato legible

        // Escribir el archivo
        await fs.writeFile(filePath, data, 'utf8');

        console.log('Archivo ' + name + 'escrito exitosamente en:', filePath);
    } catch (error) {
        await fs.writeFile(filePath, data, 'utf8');
        console.error('Error al escribir el archivo' + name + ':', error);
    }
}
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
    str = str.toLowerCase();
    return str
};
const cantAmb = [1, 2, 3]
//navigateToNextPage();
async function getDataFromPage(amb, barrio) {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    let results = [];
    amb = amb === 1 ? 'monoambiente' : amb;
    barrio = handleString(barrio)?.toLowerCase().replaceAll(' ','-');
    for (let i = 1; i <= 10; i++) {
        console.log(`Página ${i}`)
        // Navega a la página correspondiente
        await page.goto(`https://www.argenprop.com/casas-o-departamentos-o-ph/alquiler/${barrio}/${amb}?orden-masnuevos&pagina-${i}`, {
            waitUntil: 'networkidle0',
            timeout: 60000 // Aumentar el timeout a 60 segundos
        });

        const pageResults = await page.evaluate(() => {
            const propiedades = document.querySelectorAll('.card__details-box');
            const data = [...propiedades].map((propiedad) => {
                const tipoMoneda = propiedad?.querySelector('.card__currency')?.textContent?.trim() || null;

                // Extraer el precio del alquiler (sin las expensas)
                const precioElement = propiedad?.querySelector('.card__price');
                let precioText = null;

                if (precioElement) {
                    // El precio suele ser el primer nodo de texto, o después del span de la moneda
                    const priceNode = Array.from(precioElement.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
                    precioText = priceNode ? priceNode.nodeValue.trim() : null;
                }

                const precio = precioText ? parseFloat(precioText.replace(/[^0-9]/g, '')) : null;

                // Extraer las expensas
                const expensasText = propiedad?.querySelector('.card__expenses')?.textContent?.trim() || null;
                const expensas = expensasText ? parseFloat(expensasText.replace(/[^0-9]/g, '')) : null;

                const direccion = propiedad?.querySelector('.card__address')?.textContent?.trim() || null;
                const titulo = propiedad?.querySelector('.card__title--primary')?.textContent?.trim() || null;
                const superficieText = propiedad?.querySelector('.icono-superficie_cubierta + span')?.textContent?.trim() || null;
                const superficie = superficieText ? parseFloat(superficieText.replace(/[^\d,.-]/g, '')) : null;
                const dormitoriosText = propiedad?.querySelector('.icono-cantidad_dormitorios + span')?.textContent?.trim() || null;
                const dormitorios = dormitoriosText ? parseInt(dormitoriosText.replace(/[^\d]/g, '')) : null;
                const banosText = propiedad?.querySelector('.icono-cantidad_banos + span')?.textContent?.trim() || null;
                const banos = banosText ? parseInt(banosText.replace(/[^\d]/g, '')) : null;
                const descripcion = propiedad?.querySelector('.card__info')?.textContent?.trim() || null;
                const contacto = propiedad?.querySelector('.card-contact-group span[data-whatsapp-target]')?.getAttribute('data-href') || null;
                const barrioText = propiedad?.querySelector('.card__title--primary')?.textContent?.trim().replace('Departamento en Alquiler en ', '').trim() || null;
                const barrio = barrioText ? barrioText.split(',')[0] : null;
                const antiguedad = propiedad?.querySelector('.icono-antiguedad + span')?.textContent?.trim() || null;

                return {
                    tipoMoneda,
                    precio,
                    expensas,
                    direccion,
                    titulo,
                    superficie,
                    dormitorios,
                    banos,
                    descripcion,
                    contacto,
                    barrio,
                    antiguedad
                };
            });
            return data;
        });

        results = results.concat(pageResults);
        console.log(`Datos extraídos de la página ${i}`);
    }
    await browser.close();
    return results
}
async function main() {
    let barriosXComuna
    const dataBarrios = await fs.readFile('./barriosXComuna.json', 'utf8');
    barriosXComuna = JSON.parse(dataBarrios);
    const barrios = barriosXComuna?.reduce((acc, x) => [...acc, ...x.barrios], [])
    let results = { 
        amb1: [],
        amb2:[],
        amb3: []
    };
    for (let amb of cantAmb) {
        let ambResults = []
        for (let barrio of barrios) {
            console.log(`Consiguiendo los datos de ${amb} Ambiente${amb > 1 ? '' : 's ' } para el barrio ${barrio?.toUpperCase()}:`)
            try {
                let datos  = await getDataFromPage(amb, barrio);
                if (datos?.length === 0) {
                    console.log(`Datos vacios.`)
                }
                results[`amb${amb}`].push(({barrio, datos}))
                ambResults.push({ barrio, datos, amb });
            } catch (error) {
                console.log(`Falló la recolección de datos.`)
            }
        }
           // Crear el archivo por cada ambiente al finalizar el ciclo
           await writeData(ambResults, `amb${amb}_Mes_${meses[now?.getMonth()]}.json`);
    }
    await writeData(results, `ambYbarrios_Mes_${meses[now?.getMonth()]}.json`);
}
main()