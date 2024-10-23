import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '../../lib/http/index.js';

// Definir los thunks
export const addProspecto = createAsyncThunk('POST_PROSPECTOS', async (payload, thunkAPI) => {
    let res = (await http.POST('/consulta', payload));
    return res;
});

// Estado inicial
const initialState = {
    fetching: 0,
    error: null,
    message: null,
    data: {},
    form: {
        "indice": "ipc",
        "barrio": null,
        "precio": 0,
        "cadencia": 3,
        "cantidadAmb": 1,
        "mes": new Date().getMonth(),
        "anio": new Date().getFullYear()
    }
};

// Definir el slice con builder callback en extraReducers
const prospectosSlice = createSlice({
    name: 'prospectos',
    initialState,
    reducers: {
        cleanError: (state) => ({ ...state, error: null }),
        cleanMessage: (state) => ({ ...state, message: null }),
        resetData: () => ({ ...initialState }),
        changeForm: (state, action) => {
            const { property, value } = action.payload; // Desestructurar el payload
            return {
                ...state,
                form: {
                    ...state.form,
                    [property]: value // Actualizar la propiedad específica
                }
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProspecto.pending, (state) => {
                state.fetching += 1;
            })
            .addCase(addProspecto.rejected, (state) => {
                state.fetching -= 1;
                state.error = "No se pudo procesar la consulta!";
            })
            .addCase(addProspecto.fulfilled, (state, action) => {
                state.data = action.payload.body;
                state.fetching -= 1;
                state.message = action.payload.status === 200 ? "Consulta realizada" : null;
                state.error = action.payload.status !== 200 ? "No se pudo crear la consulta!" : null;
            });
    },
});

// Exportar las acciones y el reducer
export const { cleanError, cleanMessage, resetData, changeForm } = prospectosSlice.actions;
export default prospectosSlice.reducer;
