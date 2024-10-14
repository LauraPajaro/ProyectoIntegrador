import {store }from '../../store/index.js';
import env from '../../config/config.js';
//import { decryptResponse } from '../cryptoUtils/index.js';
import CryptoJS from 'crypto-js';
// Función para desencriptar datos
//console.log(import.meta.env.VITE_CRYPTO_PRIVATE_KEY,import.meta.env.VITE_CRYPTO_IV)

const decryptResponse = (encryptedData) => {
    try {
        // Convierte el string hexadecimal a un array de bytes
        const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedData);

        // Desencripta los datos
        const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: encryptedBytes }, 
            CryptoJS.enc.Hex.parse(import.meta.env.VITE_CRYPTO_PRIVATE_KEY), // La clave debe ser la misma que en el backend
            { iv: CryptoJS.enc.Hex.parse(import.meta.env.VITE_CRYPTO_IV) } // Asegúrate de que el IV sea el correcto
        );

        // Convierte los datos desencriptados de un WordArray a UTF-8
        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

        // Si el texto desencriptado está vacío, significa que la desencriptación falló
        if (!decryptedText) {
            throw new Error('Desencriptación fallida: resultado vacío.');
        }
          // Primero convierte a objeto
          const jsonString = JSON.parse(decryptedText); // Convierte a objeto JSON

          // Si jsonString es una cadena, conviértelo de nuevo a objeto
          const jsonObject = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
          return jsonObject; // Retorna el objeto JSON
    } catch (error) {
        console.error('Error al desencriptar los datos:', error);
        return null; // O maneja el error como prefieras
    }
};

const isJson = (str) => {
    if (str == null) return false;
    if (str.toLowerCase === 'true' || str.toLowerCase === 'false') return false; // JSON.parse accepts booleans strings, but they are not JSONs
    if (!isNaN(parseInt(str))) return false; // JSON.parse accepts single numbers, but they are not JSONs

    try { JSON.parse(str) }
    catch (e) { return false }
    return true;
};

const getHeaders = (url, method, body, headers = {}) => {
    const jwt = store.getState()?.auth?.token;
    //console.log(store.getState())
   // console.log(jwt)
    let dfltHeaders = {};
    dfltHeaders = (typeof body === 'object' || isJson(body)) ? { ...dfltHeaders, "Content-Type": "application/json" } : dfltHeaders;
    return ({ ...dfltHeaders, ...headers });
};

const _fetch = async (url, method, body, headers) => {
    url = env.backendUrl +  url;
    headers = getHeaders(url, method, body, headers);
    let reqBody = typeof body === 'object' ? JSON.stringify(body) : (body == null ? body : body.toString());
    let rawRes = await fetch(url, { headers, method, body: reqBody });
    let resBody = await rawRes.text();
    //resBody = resBody != "" ? resBody : null;
    resBody = isJson(resBody) ? JSON.parse(resBody) : resBody;
    let res = decryptResponse(resBody?.data);
    return {
        body: res,
        bodyUsed: rawRes.bodyUsed,
        headers: Array.from(rawRes.headers).reduce((p, x) => ({ ...p, ...{ [x[0]]: x[1] } }), {}),
        ok: rawRes.ok,
        redirected: rawRes.redirected,
        status: rawRes.status,
        statusText: rawRes.statusText,
        type: rawRes.status.type,
        url,
    };
};
export const GET = async (url, body, headers) => await _fetch(url, "GET", body, headers);
export const POST = async (url, body, headers) => await _fetch(url, "POST", body, headers);
export const PUT = async (url, body, headers) => await _fetch(url, "PUT", body, headers);
export const DELETE = async (url, body, headers) => await _fetch(url, "DELETE", body, headers);
export const PATCH = async (url, body, headers) => await _fetch(url, "PATCH", body, headers);
export const TABLE = async (url, body, headers) => await _fetch(url, "GET", body, headers);

export default { GET, POST, PUT, DELETE, PATCH, TABLE };