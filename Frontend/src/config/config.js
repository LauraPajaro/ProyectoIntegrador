
export default {
    backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api',
    //backendUrl: import.meta.env.VITE_BACKEND_URL || 'https://api.gu-dea.com',
    //backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://77.37.43.73:8080',
    crypto: {
        privateKey: import.meta.env.VITE_CRYPTO_PRIVATE_KEY, iv: import.meta.env.VITE_CRYPTO_IV
    }
   
}