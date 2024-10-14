import CryptoJS from 'crypto-js';
const keyHex = CryptoJS.enc.Hex.parse(import.meta.env.VITE_CRYPTO_PRIVATE_KEY);
const ivHex = CryptoJS.enc.Hex.parse(import.meta.env.VITE_CRYPTO_IV);
// Función para desencriptar datos

export const decryptResponse = (encryptedData) => {
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
        console.log({jsonObject})
          return jsonObject; // Retorna el objeto JSON
    } catch (error) {
        console.error('Error al desencriptar los datos:', error);
        return null; // O maneja el error como prefieras
    }
};
