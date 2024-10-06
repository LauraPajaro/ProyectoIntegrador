import puppeteer from 'puppeteer';
import fs from 'fs';

let now = new Date()
async function openWebPage() {
    const browser = await puppeteer.launch({ headless: 'new', slowMo: 200 });
    const page = await browser.newPage();

    await page.goto('https://www.argenprop.com/departamentos/alquiler/capital-federal?orden-masnuevos', {
        waitUntil: 'networkidle0'
    });
    // Guarda el contenido de la página en un archivo para inspección
    const content = await page.content();
    fs.writeFile('pageContent.txt', content, (err) => {
        if (err) {
            console.error('Error al guardar el contenido de la página:', err);
        } else {
            console.log('Contenido de la página guardado en pageContent.txt');
        }
    });

    await browser.close();
};
async function captureScreenshot() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto('https://www.argenprop.com/departamentos/alquiler/capital-federal?orden-masnuevos', {
        waitUntil: 'networkidle0'
    });
    await page.screenshot({ path: 'example.png' })
    await browser.close();
};
//openWebPage();
//captureScreenshot()

async function navigateToNextPage() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto('https://www.argenprop.com/departamentos/alquiler/capital-federal?orden-masnuevos', {
        waitUntil: 'networkidle0',
        timeout: 60000 // Aumentar el timeout a 60 segundos
    });
    await page.screenshot({ path: 'nextPage1.png' });
    // Guarda el contenido de la página en un archivo para inspección
    const content = await page.content();
    fs.writeFile('pageContent.txt', content, (err) => {
        if (err) {
            console.error('Error al guardar el contenido de la página:', err);
        } else {
            console.log('Contenido de la página guardado en pageContent.txt');
        }
    });

    // Selector para el botón "Siguiente"
    const nextButtonSelector = 'li.pagination__page-next.pagination__page > a[aria-label="Siguiente"]';

    // Espera a que el botón "Siguiente" esté disponible
    await page.waitForSelector(nextButtonSelector, { timeout: 10000 });

    // Haz clic en el botón "Siguiente"
    await page.click(nextButtonSelector);

    // Espera a que la URL cambie y a que el contenido de la página se actualice
    await page.waitForFunction('document.querySelector("li.pagination__page--current").innerText !== "1"', { timeout: 60000 });

    // Guarda una captura de pantalla de la página siguiente
    await page.screenshot({ path: 'nextPage2.png' });

    await browser.close();
};

//navigateToNextPage();
async function getDataFromPage() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    let results = [];

    for (let i = 1; i <= 20; i++) {
        // Navega a la página correspondiente
        await page.goto(`https://www.argenprop.com/departamentos/alquiler/capital-federal?orden-masnuevos&pagina-${i}`, {
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

    fs.writeFile('result.json', JSON.stringify(results, null, 2), (err) => {
        if (err) {
            console.error('Error al guardar el contenido de la página:', err);
        } else {
            console.log('Contenido de todas las páginas guardado en result.json');
        }
    });

    await browser.close();
}


openWebPage()
getDataFromPage();