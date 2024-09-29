import { promises as fs } from 'fs';
import path from 'path';
const getMesAnio = (fecha) => {
    let fechaArray = fecha.split('-')
    let mes = parseInt((fechaArray)[0])
    let anio = parseInt((fechaArray)[1])
    return { mes, anio }
};
const getTrimAnio = (fecha) => {
    let fechaArray = fecha.split(/t | a /)
    let trim = parseInt((fechaArray)[0])
    let anio = parseInt((fechaArray)[1])
    return { trim, anio }
};
const getPromediosBarrios = (tiempo, barrios, values) => {
    let valuesBarrios = values?.filter(v => barrios?.includes(v.Barrio) && v[tiempo] !== '');
    let precios = valuesBarrios?.map(v => parseFloat(v[tiempo]));
    let suma = precios?.reduce((acc, x, arr) => acc += x, 0);
    //if ("12-2023" === tiempo && barrios?.includes('Villa del Parque')) console.log({ precios, suma, tiempo, barrios })
    if (precios?.legth === 0) { return 0 } else { return suma / precios?.length }
};
const getPromedioComuna = (tiempo, comunaId, comunas) => {
    let comuna = comunas?.find(c => c.comuna === comunaId);
    let valor
    switch (tiempo?.mes) {
        case 1:
        case 2:
        case 3:
            valor = comuna[`t1a${tiempo?.anio}`]
            break
        case 4:
        case 5:
        case 6:
            valor = comuna[`t2a${tiempo?.anio}`]
            break
        case 7:
        case 8:
        case 9:
            valor = comuna[`t3a${tiempo?.anio}`]
            break
        case 10:
        case 11:
        case 12:
            valor = comuna[`t4a${tiempo?.anio}`]
            break
    }
    // console.log({valor})
    return valor
}
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

        console.log('Archivo ' + name + 'escrito exitosamente en:', filePath);
    } catch (error) {
        console.error('Error al escribir el archivo' + name + ':', error);
    }
}
async function main() {
    let dolares, icl, ipc, amb1, amb2, amb3, amb4, comunasTriAmb, barriosXComuna, amb3Mensual, amb2Mensual, amb1Mensual
    try {
        const dataComunasTriAmb = await fs.readFile('./datosLimpios/comunasTriAmb.json', 'utf8');
        comunasTriAmb = JSON.parse(dataComunasTriAmb);
        const dataBarrios = await fs.readFile('./datosLimpios/barriosXComuna.json', 'utf8');
        barriosXComuna = JSON.parse(dataBarrios);

        const data3 = await fs.readFile('./ambientes3.json', 'utf8');
        amb3 = JSON.parse(data3);
        amb3Mensual = [...amb3].map((b, i, arr) => {
            let barrio = b.Barrio;
            let serie = { ...b }
            delete serie.Barrio
            // Recorrer las propiedades del objeto `serie` usando Object.keys()
            Object.keys(serie).forEach(key => {
                if (serie[key] === '') {
                    //      "03-2022": "55000",
                    let comuna = barriosXComuna?.find(b => b.barrios?.includes(barrio))
                    if (comuna) {
                        let tiempo = getMesAnio(key);
                        let promedioBarrios = getPromediosBarrios(key, comuna?.barrios, amb3)
                        if (promedioBarrios > 0) {
                            serie[key] = promedioBarrios;
                        } else {
                            let promedioComuna = getPromedioComuna(tiempo, comuna?.comuna, comunasTriAmb?.comunasTriAmb3);
                            serie[key] = promedioComuna;
                        }
                    }
                } else { serie[key] = parseFloat(serie[key]) }
            });
            return ({
                ...serie,
                barrio
            })
        });
        const data2 = await fs.readFile('./ambientes2.json', 'utf8');
        amb2 = JSON.parse(data2);
        amb2Mensual = [...amb2].map((b, i, arr) => {
            let barrio = b.Barrio;
            let serie = { ...b }
            delete serie.Barrio
            // Recorrer las propiedades del objeto `serie` usando Object.keys()
            Object.keys(serie).forEach(key => {
                if (serie[key] === '') {
                    //      "03-2022": "55000",
                    let comuna = barriosXComuna?.find(b => b.barrios?.includes(barrio))
                    if (comuna) {
                        let tiempo = getMesAnio(key);
                        let promedioBarrios = getPromediosBarrios(key, comuna?.barrios, amb2)
                        if (promedioBarrios > 0) {
                            serie[key] = promedioBarrios;
                        } else {
                            let promedioComuna = getPromedioComuna(tiempo, comuna?.comuna, comunasTriAmb?.comunasTriAmb2);
                            serie[key] = promedioComuna;
                        }
                    }
                } else { serie[key] = parseFloat(serie[key]) }
            });
            return ({
                ...serie,
                barrio
            })
        });

        const data1 = await fs.readFile('./ambientes1.json', 'utf8');
        amb1 = JSON.parse(data1);
        amb1Mensual = [...amb1].map((b, i, arr) => {
            let barrio = b.Barrio;
            let serie = { ...b }
            delete serie.Barrio
            // Recorrer las propiedades del objeto `serie` usando Object.keys()
            Object.keys(serie).forEach(key => {
                if (serie[key] === '') {
                    //      "03-2022": "55000",
                    let comuna = barriosXComuna?.find(b => b.barrios?.includes(barrio))
                    if (comuna) {
                        let tiempo = getMesAnio(key);
                        let promedioBarrios = getPromediosBarrios(key, comuna?.barrios, amb1)
                        if (promedioBarrios > 0) {
                            serie[key] = promedioBarrios;
                        } else {
                            let promedioComuna = getPromedioComuna(tiempo, comuna?.comuna, comunasTriAmb?.comunasTriAmb1);
                            serie[key] = promedioComuna;
                        }
                    }
                } else { serie[key] = parseFloat(serie[key]) }
            });
            return ({
                ...serie,
                barrio
            })
        });
        await writeData(amb1Mensual, 'amb1Mensual.json');
        await writeData(amb2Mensual, 'amb2Mensual.json');
        await writeData(amb3Mensual, 'amb3Mensual.json');
        //     const data2 = await fs.readFile('./comunaTrimestre2.json', 'utf8');
        //     amb2 = JSON.parse(data2);
        //     let comunaTriAmb2 = [...comunaAmb2].map(c => {
        //         let comuna = c.Comuna === "Total" ? 0 : parseInt(c.Comuna);
        //         let t1a2018 = parseFloat(c["1er. trim.2018"] === "///" ? comunaAmb2[0]["1er. trim.2018"] : c["1er. trim.2018"])
        //         let t2a2018 = parseFloat(c["2do. trim.2018"] === "///" ? comunaAmb2[0]["2do. trim.2018"] : c["2do. trim.2018"])
        //         let t3a2018 = parseFloat(c["3er. trim.2018"] === "///" ? comunaAmb2[0]["3er. trim.2018"] : c["3er. trim.2018"])
        //         let t4a2018 = parseFloat(c["4to. trim.2018"] === "///" ? comunaAmb2[0]["4to. trim.2018"] : c["4to. trim.2018"])
        //         let t1a2019 = parseFloat(c["1er. trim.2019"] === "///" ? comunaAmb2[0]["1er. trim.2019"] : c["1er. trim.2019"])
        //         let t2a2019 = parseFloat(c["2do. trim.2019"] === "///" ? comunaAmb2[0]["2do. trim.2019"] : c["2do. trim.2019"])
        //         let t3a2019 = parseFloat(c["3er. trim.2019"] === "///" ? comunaAmb2[0]["3er. trim.2019"] : c["3er. trim.2019"])
        //         let t4a2019 = parseFloat(c["4to. trim.2019"] === "///" ? comunaAmb2[0]["4to. trim.2019"] : c["4to. trim.2019"])
        //         let t1a2020 = parseFloat(c["1er. trim.2020"] === "///" ? comunaAmb2[0]["1er. trim.2020"] : c["1er. trim.2020"])
        //         let t2a2020 = parseFloat(c["2do. trim.2020"] === "///" ? comunaAmb2[0]["2do. trim.2020"] : c["2do. trim.2020"])
        //         let t3a2020 = parseFloat(c["3er. trim.2020"] === "///" ? comunaAmb2[0]["3er. trim.2020"] : c["3er. trim.2020"])
        //         let t4a2020 = parseFloat(c["4to. trim.2020"] === "///" ? comunaAmb2[0]["4to. trim.2020"] : c["4to. trim.2020"])
        //         let t1a2021 = parseFloat(c["1er. trim.2021"] === "///" ? comunaAmb2[0]["1er. trim.2021"] : c["1er. trim.2021"])
        //         let t2a2021 = parseFloat(c["2do. trim.2021"] === "///" ? comunaAmb2[0]["2do. trim.2021"] : c["2do. trim.2021"])
        //         let t3a2021 = parseFloat(c["3er. trim.2021"] === "///" ? comunaAmb2[0]["3er. trim.2021"] : c["3er. trim.2021"])
        //         let t4a2021 = parseFloat(c["4to. trim.2021"] === "///" ? comunaAmb2[0]["4to. trim.2021"] : c["4to. trim.2021"])
        //         let t1a2022 = parseFloat(c["1er. trim.2022"] === "///" ? comunaAmb2[0]["1er. trim.2022"] : c["1er. trim.2022"])
        //         let t2a2022 = parseFloat(c["2do. trim.2022"] === "///" ? comunaAmb2[0]["2do. trim.2022"] : c["2do. trim.2022"])
        //         let t3a2022 = parseFloat(c["3er. trim.2022"] === "///" ? comunaAmb2[0]["3er. trim.2022"] : c["3er. trim.2022"])
        //         let t4a2022 = parseFloat(c["4to. trim.2022"] === "///" ? comunaAmb2[0]["4to. trim.2022"] : c["4to. trim.2022"])
        //         let t1a2023 = parseFloat(c["1er. trim.2023"] === "///" ? comunaAmb2[0]["1er. trim.2023"] : c["1er. trim.2023"])
        //         let t2a2023 = parseFloat(c["2do. trim.2023"] === "///" ? comunaAmb2[0]["2do. trim.2023"] : c["2do. trim.2023"])
        //         let t3a2023 = parseFloat(c["3er. trim.2023"] === "///" ? comunaAmb2[0]["3er. trim.2023"] : c["3er. trim.2023"])
        //         let t4a2023 = parseFloat(c["4to. trim.2023"] === "///" ? comunaAmb2[0]["4to. trim.2023"] : c["4to. trim.2023"])
        //         let t1a2024 = parseFloat(c["1er. trim.2024"] === "///" ? comunaAmb2[0]["1er. trim.2024"] : c["1er. trim.2024"])
        //         let t2a2024 = parseFloat(c["2do. trim.2024"] === "///" ? comunaAmb2[0]["2do. trim.2024"] : c["2do. trim.2024"])
        //         return ({
        //         comuna,
        //         t1a2018,
        //         t2a2018,
        //         t3a2018,
        //         t4a2018,
        //         t1a2019,
        //         t2a2019,
        //         t3a2019,
        //         t4a2019,
        //         t1a2020,
        //         t2a2020,
        //         t3a2020,
        //         t4a2020,
        //         t1a2021,
        //         t2a2021,
        //         t3a2021,
        //         t4a2021,
        //         t1a2022,
        //         t2a2022,
        //         t3a2022,
        //         t4a2022,
        //         t1a2023,
        //         t2a2023,
        //         t3a2023,
        //         t4a2023,
        //         t1a2024,
        //         t2a2024,
        //         })
        //     });
        //     const data1 = await fs.readFile('./comunaTrimestre1.json', 'utf8');
        //     amb1 = JSON.parse(data1);
        //     let comunaTriAmb1 = [...comunaAmb1].map(c => {
        //         let comuna = c.Comuna === "Total" ? 0 : parseInt(c.Comuna);
        //         let t1a2018 = parseFloat(c["1er. trim.2018"] === "///" ? comunaAmb1[0]["1er. trim.2018"] : c["1er. trim.2018"])
        //         let t2a2018 = parseFloat(c["2do. trim.2018"] === "///" ? comunaAmb1[0]["2do. trim.2018"] : c["2do. trim.2018"])
        //         let t3a2018 = parseFloat(c["3er. trim.2018"] === "///" ? comunaAmb1[0]["3er. trim.2018"] : c["3er. trim.2018"])
        //         let t4a2018 = parseFloat(c["4to. trim.2018"] === "///" ? comunaAmb1[0]["4to. trim.2018"] : c["4to. trim.2018"])
        //         let t1a2019 = parseFloat(c["1er. trim.2019"] === "///" ? comunaAmb1[0]["1er. trim.2019"] : c["1er. trim.2019"])
        //         let t2a2019 = parseFloat(c["2do. trim.2019"] === "///" ? comunaAmb1[0]["2do. trim.2019"] : c["2do. trim.2019"])
        //         let t3a2019 = parseFloat(c["3er. trim.2019"] === "///" ? comunaAmb1[0]["3er. trim.2019"] : c["3er. trim.2019"])
        //         let t4a2019 = parseFloat(c["4to. trim.2019"] === "///" ? comunaAmb1[0]["4to. trim.2019"] : c["4to. trim.2019"])
        //         let t1a2020 = parseFloat(c["1er. trim.2020"] === "///" ? comunaAmb1[0]["1er. trim.2020"] : c["1er. trim.2020"])
        //         let t2a2020 = parseFloat(c["2do. trim.2020"] === "///" ? comunaAmb1[0]["2do. trim.2020"] : c["2do. trim.2020"])
        //         let t3a2020 = parseFloat(c["3er. trim.2020"] === "///" ? comunaAmb1[0]["3er. trim.2020"] : c["3er. trim.2020"])
        //         let t4a2020 = parseFloat(c["4to. trim.2020"] === "///" ? comunaAmb1[0]["4to. trim.2020"] : c["4to. trim.2020"])
        //         let t1a2021 = parseFloat(c["1er. trim.2021"] === "///" ? comunaAmb1[0]["1er. trim.2021"] : c["1er. trim.2021"])
        //         let t2a2021 = parseFloat(c["2do. trim.2021"] === "///" ? comunaAmb1[0]["2do. trim.2021"] : c["2do. trim.2021"])
        //         let t3a2021 = parseFloat(c["3er. trim.2021"] === "///" ? comunaAmb1[0]["3er. trim.2021"] : c["3er. trim.2021"])
        //         let t4a2021 = parseFloat(c["4to. trim.2021"] === "///" ? comunaAmb1[0]["4to. trim.2021"] : c["4to. trim.2021"])
        //         let t1a2022 = parseFloat(c["1er. trim.2022"] === "///" ? comunaAmb1[0]["1er. trim.2022"] : c["1er. trim.2022"])
        //         let t2a2022 = parseFloat(c["2do. trim.2022"] === "///" ? comunaAmb1[0]["2do. trim.2022"] : c["2do. trim.2022"])
        //         let t3a2022 = parseFloat(c["3er. trim.2022"] === "///" ? comunaAmb1[0]["3er. trim.2022"] : c["3er. trim.2022"])
        //         let t4a2022 = parseFloat(c["4to. trim.2022"] === "///" ? comunaAmb1[0]["4to. trim.2022"] : c["4to. trim.2022"])
        //         let t1a2023 = parseFloat(c["1er. trim.2023"] === "///" ? comunaAmb1[0]["1er. trim.2023"] : c["1er. trim.2023"])
        //         let t2a2023 = parseFloat(c["2do. trim.2023"] === "///" ? comunaAmb1[0]["2do. trim.2023"] : c["2do. trim.2023"])
        //         let t3a2023 = parseFloat(c["3er. trim.2023"] === "///" ? comunaAmb1[0]["3er. trim.2023"] : c["3er. trim.2023"])
        //         let t4a2023 = parseFloat(c["4to. trim.2023"] === "///" ? comunaAmb1[0]["4to. trim.2023"] : c["4to. trim.2023"])
        //         let t1a2024 = parseFloat(c["1er. trim.2024"] === "///" ? comunaAmb1[0]["1er. trim.2024"] : c["1er. trim.2024"])
        //         let t2a2024 = parseFloat(c["2do. trim.2024"] === "///" ? comunaAmb1[0]["2do. trim.2024"] : c["2do. trim.2024"])
        //         return ({ 
        //         comuna,
        //         t1a2018,
        //         t2a2018,
        //         t3a2018,
        //         t4a2018,
        //         t1a2019,
        //         t2a2019,
        //         t3a2019,
        //         t4a2019,
        //         t1a2020,
        //         t2a2020,
        //         t3a2020,
        //         t4a2020,
        //         t1a2021,
        //         t2a2021,
        //         t3a2021,
        //         t4a2021,
        //         t1a2022,
        //         t2a2022,
        //         t3a2022,
        //         t4a2022,
        //         t1a2023,
        //         t2a2023,
        //         t3a2023,
        //         t4a2023,
        //         t1a2024,
        //         t2a2024,
        //         })
        //     });
        //     let comunasTriAmb = {comunaTriAmb3, comunaTriAmb2, comunaTriAmb1};
        //    // writeData(comunasTriAmb, 'comunasTriAmb');
        //     //Barios
        //     barriosComuna = await fs.readFile('./barriosComuna.json', 'utf8');
        //     let barriosXComuna = JSON.parse(barriosComuna);
        //     barriosXComuna =  barriosXComuna?.map(b=> {
        //         let comuna = parseInt((b.Comuna).replace("COMUNA ", ''));
        //         let barrios = b.BARRIOS.split(/, | y /);
        //         return({comuna, barrios})
        //     })
        //writeData(barriosXComuna, 'barriosXComuna.json');
    } catch (err) {
        console.error('Error al leer o procesar los archivos:', err);
    }
}

main();

