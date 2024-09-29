import puppeteer from 'puppeteer';
import fs from 'fs';
import proxyChain from 'proxy-chain';

async function getDataFromPage() {
    const browser = await puppeteer.launch({ headless: 'new'});
let results = [];
    const page = await browser.newPage();
    for (let i = 1; i <= 1; i++) {
        // Navega a la página correspondiente
        await page.goto(
            i === 1
                ? 'https://www.zonaprop.com.ar/inmuebles-alquiler-capital-federal-orden-publicado-descendente.html'
                : `https://www.zonaprop.com.ar/inmuebles-alquiler-capital-federal-orden-publicado-descendente-pagina-${i}.html`,
            { waitUntil: 'networkidle0', timeout: 60000 }
        );
        await page.evaluate(() => {
            const acceptButton = document.querySelector('button[data-qa="cookies-policy-banner"]');
            if (acceptButton) {
                console.log('Botón encontrado');
                acceptButton.click();
            } else {
                console.log('Botón no encontrado');
            }
        });
        const content = await page.content();
        fs.writeFile(`pageContent_page_${i}.html`, content, (err) => {
            if (err) {
                console.error(`Error al guardar el contenido de la página ${i}:`, err);
            } else {
                console.log(`Contenido de la página ${i} guardado en pageContent_page_${i}.html`);
            }
        });
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
        const pageResults = await page.evaluate(() => {
            const propiedades = document.querySelectorAll('.card__details-box');
            const data = [...propiedades].map((propiedad) => {
                const tipoMoneda = propiedad?.querySelector('.card__currency')?.textContent?.trim() || null;
                const precioElement = propiedad?.querySelector('.card__price');
                let precioText = null;

                if (precioElement) {
                    const noprice = precioElement.querySelector('.card__noprice');
                    if (noprice) {
                        precioText = null;
                    } else {
                        const priceNode = Array.from(precioElement.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
                        precioText = priceNode ? priceNode.nodeValue.trim() : null;
                    }
                }

                const precio = precioText ? parseFloat(precioText.replace(/[^0-9]/g, '')) : null;
                const expensasText = propiedad?.querySelector('.card__expenses')?.textContent?.trim() || null;
                const expensas = expensasText ? parseFloat(expensasText.replace(/[^0-9]/g, '')) : null;
                const direccion = propiedad?.querySelector('.card__address')?.textContent?.trim() || null;
                const titulo = propiedad?.querySelector('.card__title--primary')?.textContent?.trim() || null;
                const superficieText = propiedad?.querySelector('.icono-superficie_cubierta + span')?.textContent?.trim() || null;
                const superficie = superficieText ? parseFloat(superficieText.replace(/[^0-9]/g, '')) : null;
                const dormitoriosText = propiedad?.querySelector('.icono-cantidad_dormitorios + span')?.textContent?.trim() || null;
                const dormitorios = dormitoriosText ? parseInt(dormitoriosText.replace(/[^0-9]/g, '')) : null;
                const banosText = propiedad?.querySelector('.icono-cantidad_banos + span')?.textContent?.trim() || null;
                const banos = banosText ? parseInt(banosText.replace(/[^0-9]/g, '')) : null;
                const descripcion = propiedad?.querySelector('.card__info')?.textContent?.trim() || null;
                const contacto = propiedad?.querySelector('.card-contact-group span[data-whatsapp-target]')?.getAttribute('data-href') || null;
                const barrioText = propiedad?.querySelector('.card__title--primary')?.textContent?.trim().replace('Departamento en Alquiler en ', '').trim() || null;
                const barrio = barrioText ? barrioText.split(',')[0] : null;
                const antiguedadText = propiedad?.querySelector('.icono-antiguedad + span')?.textContent?.trim() || null;
                const antiguedad = antiguedadText || null;

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
            console.error('Error al guardar el contenido de todas las páginas:', err);
        } else {
            console.log('Contenido de todas las páginas guardado en result.json');
        }
    });

    await browser.close();
}

getDataFromPage();