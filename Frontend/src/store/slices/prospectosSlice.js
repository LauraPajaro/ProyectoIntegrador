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
    data: {}
};

// Definir el slice con builder callback en extraReducers
const prospectosSlice = createSlice({
    name: 'prospectos',
    initialState,
    reducers: {
        cleanError: (state) => ({ ...state, error: null }),
        cleanMessage: (state) => ({ ...state, message: null }),
        resetData: () => ({ ...initialState }),
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
export const { cleanError, cleanMessage, resetData } = prospectosSlice.actions;
export default prospectosSlice.reducer;
