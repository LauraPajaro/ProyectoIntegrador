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
        const data3 = await fs.readFile('./comunaTrimestre3.json', 'utf8');
        comunaAmb3 = JSON.parse(data3);
        let comunasTriAmb3 = [...comunaAmb3].map(c => {
            let comuna = c.Comuna === "Total" ? 0 : parseInt(c.Comuna);
            let t1a2018 = parseFloat((c["1er. trim.2018"] === "///" ? comunaAmb3[0]["1er. trim.2018"] : c["1er. trim.2018"]).replace('.', ''))
            let t2a2018 = parseFloat((c["2do. trim.2018"] === "///" ? comunaAmb3[0]["2do. trim.2018"] : c["2do. trim.2018"]).replace('.', ''))
            let t3a2018 = parseFloat((c["3er. trim.2018"] === "///" ? comunaAmb3[0]["3er. trim.2018"] : c["3er. trim.2018"]).replace('.', ''))
            let t4a2018 = parseFloat((c["4to. trim.2018"] === "///" ? comunaAmb3[0]["4to. trim.2018"] : c["4to. trim.2018"]).replace('.', ''))
            let t1a2019 = parseFloat((c["1er. trim.2019"] === "///" ? comunaAmb3[0]["1er. trim.2019"] : c["1er. trim.2019"]).replace('.', ''))
            let t2a2019 = parseFloat((c["2do. trim.2019"] === "///" ? comunaAmb3[0]["2do. trim.2019"] : c["2do. trim.2019"]).replace('.', ''))
            let t3a2019 = parseFloat((c["3er. trim.2019"] === "///" ? comunaAmb3[0]["3er. trim.2019"] : c["3er. trim.2019"]).replace('.', ''))
            let t4a2019 = parseFloat((c["4to. trim.2019"] === "///" ? comunaAmb3[0]["4to. trim.2019"] : c["4to. trim.2019"]).replace('.', ''))
            let t1a2020 = parseFloat((c["1er. trim.2020"] === "///" ? comunaAmb3[0]["1er. trim.2020"] : c["1er. trim.2020"]).replace('.', ''))
            let t2a2020 = parseFloat((c["2do. trim.2020"] === "///" ? comunaAmb3[0]["2do. trim.2020"] : c["2do. trim.2020"]).replace('.', ''))
            let t3a2020 = parseFloat((c["3er. trim.2020"] === "///" ? comunaAmb3[0]["3er. trim.2020"] : c["3er. trim.2020"]).replace('.', ''))
            let t4a2020 = parseFloat((c["4to. trim.2020"] === "///" ? comunaAmb3[0]["4to. trim.2020"] : c["4to. trim.2020"]).replace('.', ''))
            let t1a2021 = parseFloat((c["1er. trim.2021"] === "///" ? comunaAmb3[0]["1er. trim.2021"] : c["1er. trim.2021"]).replace('.', ''))
            let t2a2021 = parseFloat((c["2do. trim.2021"] === "///" ? comunaAmb3[0]["2do. trim.2021"] : c["2do. trim.2021"]).replace('.', ''))
            let t3a2021 = parseFloat((c["3er. trim.2021"] === "///" ? comunaAmb3[0]["3er. trim.2021"] : c["3er. trim.2021"]).replace('.', ''))
            let t4a2021 = parseFloat((c["4to. trim.2021"] === "///" ? comunaAmb3[0]["4to. trim.2021"] : c["4to. trim.2021"]).replace('.', ''))
            let t1a2022 = parseFloat((c["1er. trim.2022"] === "///" ? comunaAmb3[0]["1er. trim.2022"] : c["1er. trim.2022"]).replace('.', ''))
            let t2a2022 = parseFloat((c["2do. trim.2022"] === "///" ? comunaAmb3[0]["2do. trim.2022"] : c["2do. trim.2022"]).replace('.', ''))
            let t3a2022 = parseFloat((c["3er. trim.2022"] === "///" ? comunaAmb3[0]["3er. trim.2022"] : c["3er. trim.2022"]).replace('.', ''))
            let t4a2022 = parseFloat((c["4to. trim.2022"] === "///" ? comunaAmb3[0]["4to. trim.2022"] : c["4to. trim.2022"]).replace('.', ''))
            let t1a2023 = parseFloat((c["1er. trim.2023"] === "///" ? comunaAmb3[0]["1er. trim.2023"] : c["1er. trim.2023"]).replace('.', ''))
            let t2a2023 = parseFloat((c["2do. trim.2023"] === "///" ? comunaAmb3[0]["2do. trim.2023"] : c["2do. trim.2023"]).replace('.', ''))
            let t3a2023 = parseFloat((c["3er. trim.2023"] === "///" ? comunaAmb3[0]["3er. trim.2023"] : c["3er. trim.2023"]).replace('.', ''))
            let t4a2023 = parseFloat((c["4to. trim.2023"] === "///" ? comunaAmb3[0]["4to. trim.2023"] : c["4to. trim.2023"]).replace('.', ''))
            let t1a2024 = parseFloat((c["1er. trim.2024"] === "///" ? comunaAmb3[0]["1er. trim.2024"] : c["1er. trim.2024"]).replace('.', ''))
            let t2a2024 = parseFloat((c["2do. trim.2024"] === "///" ? comunaAmb3[0]["2do. trim.2024"] : c["2do. trim.2024"]).replace('.', ''))
            return ({
            comuna,
            t1a2018,
            t2a2018,
            t3a2018,
            t4a2018,
            t1a2019,
            t2a2019,
            t3a2019,
            t4a2019,
            t1a2020,
            t2a2020,
            t3a2020,
            t4a2020,
            t1a2021,
            t2a2021,
            t3a2021,
            t4a2021,
            t1a2022,
            t2a2022,
            t3a2022,
            t4a2022,
            t1a2023,
            t2a2023,
            t3a2023,
            t4a2023,
            t1a2024,
            t2a2024,
            })
        });
        const data2 = await fs.readFile('./comunaTrimestre2.json', 'utf8');
        comunaAmb2 = JSON.parse(data2);
        let comunasTriAmb2 = [...comunaAmb2].map(c => {
            let comuna = c.Comuna === "Total" ? 0 : parseInt(c.Comuna);
            let t1a2018 = parseFloat((c["1er. trim.2018"] === "///" ? comunaAmb2[0]["1er. trim.2018"] : c["1er. trim.2018"]).replace('.', ''))
            let t2a2018 = parseFloat((c["2do. trim.2018"] === "///" ? comunaAmb2[0]["2do. trim.2018"] : c["2do. trim.2018"]).replace('.', ''))
            let t3a2018 = parseFloat((c["3er. trim.2018"] === "///" ? comunaAmb2[0]["3er. trim.2018"] : c["3er. trim.2018"]).replace('.', ''))
            let t4a2018 = parseFloat((c["4to. trim.2018"] === "///" ? comunaAmb2[0]["4to. trim.2018"] : c["4to. trim.2018"]).replace('.', ''))
            let t1a2019 = parseFloat((c["1er. trim.2019"] === "///" ? comunaAmb2[0]["1er. trim.2019"] : c["1er. trim.2019"]).replace('.', ''))
            let t2a2019 = parseFloat((c["2do. trim.2019"] === "///" ? comunaAmb2[0]["2do. trim.2019"] : c["2do. trim.2019"]).replace('.', ''))
            let t3a2019 = parseFloat((c["3er. trim.2019"] === "///" ? comunaAmb2[0]["3er. trim.2019"] : c["3er. trim.2019"]).replace('.', ''))
            let t4a2019 = parseFloat((c["4to. trim.2019"] === "///" ? comunaAmb2[0]["4to. trim.2019"] : c["4to. trim.2019"]).replace('.', ''))
            let t1a2020 = parseFloat((c["1er. trim.2020"] === "///" ? comunaAmb2[0]["1er. trim.2020"] : c["1er. trim.2020"]).replace('.', ''))
            let t2a2020 = parseFloat((c["2do. trim.2020"] === "///" ? comunaAmb2[0]["2do. trim.2020"] : c["2do. trim.2020"]).replace('.', ''))
            let t3a2020 = parseFloat((c["3er. trim.2020"] === "///" ? comunaAmb2[0]["3er. trim.2020"] : c["3er. trim.2020"]).replace('.', ''))
            let t4a2020 = parseFloat((c["4to. trim.2020"] === "///" ? comunaAmb2[0]["4to. trim.2020"] : c["4to. trim.2020"]).replace('.', ''))
            let t1a2021 = parseFloat((c["1er. trim.2021"] === "///" ? comunaAmb2[0]["1er. trim.2021"] : c["1er. trim.2021"]).replace('.', ''))
            let t2a2021 = parseFloat((c["2do. trim.2021"] === "///" ? comunaAmb2[0]["2do. trim.2021"] : c["2do. trim.2021"]).replace('.', ''))
            let t3a2021 = parseFloat((c["3er. trim.2021"] === "///" ? comunaAmb2[0]["3er. trim.2021"] : c["3er. trim.2021"]).replace('.', ''))
            let t4a2021 = parseFloat((c["4to. trim.2021"] === "///" ? comunaAmb2[0]["4to. trim.2021"] : c["4to. trim.2021"]).replace('.', ''))
            let t1a2022 = parseFloat((c["1er. trim.2022"] === "///" ? comunaAmb2[0]["1er. trim.2022"] : c["1er. trim.2022"]).replace('.', ''))
            let t2a2022 = parseFloat((c["2do. trim.2022"] === "///" ? comunaAmb2[0]["2do. trim.2022"] : c["2do. trim.2022"]).replace('.', ''))
            let t3a2022 = parseFloat((c["3er. trim.2022"] === "///" ? comunaAmb2[0]["3er. trim.2022"] : c["3er. trim.2022"]).replace('.', ''))
            let t4a2022 = parseFloat((c["4to. trim.2022"] === "///" ? comunaAmb2[0]["4to. trim.2022"] : c["4to. trim.2022"]).replace('.', ''))
            let t1a2023 = parseFloat((c["1er. trim.2023"] === "///" ? comunaAmb2[0]["1er. trim.2023"] : c["1er. trim.2023"]).replace('.', ''))
            let t2a2023 = parseFloat((c["2do. trim.2023"] === "///" ? comunaAmb2[0]["2do. trim.2023"] : c["2do. trim.2023"]).replace('.', ''))
            let t3a2023 = parseFloat((c["3er. trim.2023"] === "///" ? comunaAmb2[0]["3er. trim.2023"] : c["3er. trim.2023"]).replace('.', ''))
            let t4a2023 = parseFloat((c["4to. trim.2023"] === "///" ? comunaAmb2[0]["4to. trim.2023"] : c["4to. trim.2023"]).replace('.', ''))
            let t1a2024 = parseFloat((c["1er. trim.2024"] === "///" ? comunaAmb2[0]["1er. trim.2024"] : c["1er. trim.2024"]).replace('.', ''))
            let t2a2024 = parseFloat((c["2do. trim.2024"] === "///" ? comunaAmb2[0]["2do. trim.2024"] : c["2do. trim.2024"]).replace('.', ''))
            return ({
            comuna,
            t1a2018,
            t2a2018,
            t3a2018,
            t4a2018,
            t1a2019,
            t2a2019,
            t3a2019,
            t4a2019,
            t1a2020,
            t2a2020,
            t3a2020,
            t4a2020,
            t1a2021,
            t2a2021,
            t3a2021,
            t4a2021,
            t1a2022,
            t2a2022,
            t3a2022,
            t4a2022,
            t1a2023,
            t2a2023,
            t3a2023,
            t4a2023,
            t1a2024,
            t2a2024,
            })
        });
        const data1 = await fs.readFile('./comunaTrimestre1.json', 'utf8');
        comunaAmb1 = JSON.parse(data1);
        let comunasTriAmb1 = [...comunaAmb1].map(c => {
            let comuna = c.Comuna === "Total" ? 0 : parseInt(c.Comuna);
            let t1a2018 = parseFloat((c["1er. trim.2018"] === "///" ? comunaAmb1[0]["1er. trim.2018"] : c["1er. trim.2018"]).replace('.',''))
            let t2a2018 = parseFloat((c["2do. trim.2018"] === "///" ? comunaAmb1[0]["2do. trim.2018"] : c["2do. trim.2018"]).replace('.',''))
            let t3a2018 = parseFloat((c["3er. trim.2018"] === "///" ? comunaAmb1[0]["3er. trim.2018"] : c["3er. trim.2018"]).replace('.',''))
            let t4a2018 = parseFloat((c["4to. trim.2018"] === "///" ? comunaAmb1[0]["4to. trim.2018"] : c["4to. trim.2018"]).replace('.',''))
            let t1a2019 = parseFloat((c["1er. trim.2019"] === "///" ? comunaAmb1[0]["1er. trim.2019"] : c["1er. trim.2019"]).replace('.',''))
            let t2a2019 = parseFloat((c["2do. trim.2019"] === "///" ? comunaAmb1[0]["2do. trim.2019"] : c["2do. trim.2019"]).replace('.',''))
            let t3a2019 = parseFloat((c["3er. trim.2019"] === "///" ? comunaAmb1[0]["3er. trim.2019"] : c["3er. trim.2019"]).replace('.',''))
            let t4a2019 = parseFloat((c["4to. trim.2019"] === "///" ? comunaAmb1[0]["4to. trim.2019"] : c["4to. trim.2019"]).replace('.',''))
            let t1a2020 = parseFloat((c["1er. trim.2020"] === "///" ? comunaAmb1[0]["1er. trim.2020"] : c["1er. trim.2020"]).replace('.',''))
            let t2a2020 = parseFloat((c["2do. trim.2020"] === "///" ? comunaAmb1[0]["2do. trim.2020"] : c["2do. trim.2020"]).replace('.',''))
            let t3a2020 = parseFloat((c["3er. trim.2020"] === "///" ? comunaAmb1[0]["3er. trim.2020"] : c["3er. trim.2020"]).replace('.',''))
            let t4a2020 = parseFloat((c["4to. trim.2020"] === "///" ? comunaAmb1[0]["4to. trim.2020"] : c["4to. trim.2020"]).replace('.',''))
            let t1a2021 = parseFloat((c["1er. trim.2021"] === "///" ? comunaAmb1[0]["1er. trim.2021"] : c["1er. trim.2021"]).replace('.',''))
            let t2a2021 = parseFloat((c["2do. trim.2021"] === "///" ? comunaAmb1[0]["2do. trim.2021"] : c["2do. trim.2021"]).replace('.',''))
            let t3a2021 = parseFloat((c["3er. trim.2021"] === "///" ? comunaAmb1[0]["3er. trim.2021"] : c["3er. trim.2021"]).replace('.',''))
            let t4a2021 = parseFloat((c["4to. trim.2021"] === "///" ? comunaAmb1[0]["4to. trim.2021"] : c["4to. trim.2021"]).replace('.',''))
            let t1a2022 = parseFloat((c["1er. trim.2022"] === "///" ? comunaAmb1[0]["1er. trim.2022"] : c["1er. trim.2022"]).replace('.',''))
            let t2a2022 = parseFloat((c["2do. trim.2022"] === "///" ? comunaAmb1[0]["2do. trim.2022"] : c["2do. trim.2022"]).replace('.',''))
            let t3a2022 = parseFloat((c["3er. trim.2022"] === "///" ? comunaAmb1[0]["3er. trim.2022"] : c["3er. trim.2022"]).replace('.',''))
            let t4a2022 = parseFloat((c["4to. trim.2022"] === "///" ? comunaAmb1[0]["4to. trim.2022"] : c["4to. trim.2022"]).replace('.',''))
            let t1a2023 = parseFloat((c["1er. trim.2023"] === "///" ? comunaAmb1[0]["1er. trim.2023"] : c["1er. trim.2023"]).replace('.',''))
            let t2a2023 = parseFloat((c["2do. trim.2023"] === "///" ? comunaAmb1[0]["2do. trim.2023"] : c["2do. trim.2023"]).replace('.',''))
            let t3a2023 = parseFloat((c["3er. trim.2023"] === "///" ? comunaAmb1[0]["3er. trim.2023"] : c["3er. trim.2023"]).replace('.',''))
            let t4a2023 = parseFloat((c["4to. trim.2023"] === "///" ? comunaAmb1[0]["4to. trim.2023"] : c["4to. trim.2023"]).replace('.',''))
            let t1a2024 = parseFloat((c["1er. trim.2024"] === "///" ? comunaAmb1[0]["1er. trim.2024"] : c["1er. trim.2024"]).replace('.',''))
            let t2a2024 = parseFloat((c["2do. trim.2024"] === "///" ? comunaAmb1[0]["2do. trim.2024"] : c["2do. trim.2024"]).replace('.',''))
            return ({ 
            comuna,
            t1a2018,
            t2a2018,
            t3a2018,
            t4a2018,
            t1a2019,
            t2a2019,
            t3a2019,
            t4a2019,
            t1a2020,
            t2a2020,
            t3a2020,
            t4a2020,
            t1a2021,
            t2a2021,
            t3a2021,
            t4a2021,
            t1a2022,
            t2a2022,
            t3a2022,
            t4a2022,
            t1a2023,
            t2a2023,
            t3a2023,
            t4a2023,
            t1a2024,
            t2a2024,
            })
        });
        let comunasTriAmb = {comunasTriAmb3, comunasTriAmb2, comunasTriAmb1};
        writeData(comunasTriAmb, 'comunasTriAmb.json');
        //Barios
        barriosComuna = await fs.readFile('./barriosComuna.json', 'utf8');
        let barriosXComuna = JSON.parse(barriosComuna);
        barriosXComuna =  barriosXComuna?.map(b=> {
            let comuna = parseInt((b.Comuna).replace("COMUNA ", ''));
            let barrios = b.BARRIOS.split(/, | y /);
            return({comuna, barrios})
        })
        writeData(barriosXComuna, 'barriosXComuna.json');
    } catch (err) {
        console.error('Error al leer o procesar los archivos:', err);
    }
}

main();