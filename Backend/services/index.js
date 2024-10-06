import * as sql from '../models/sql.js';
const datosIPC ='datosIPC'
export default {
    //IPC
    getHistoricoIPC: async () => {
        let res = await sql.get(datosIPC);
        return res
    },
}