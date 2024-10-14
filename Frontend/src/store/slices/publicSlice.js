import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '../../lib/http/index.js';

// Definir el thunk para obtener datos públicos
export const getPublicData = createAsyncThunk('GET_PAGOS', async (payload, thunkAPI) => {
    const barrios = await http.GET('/barrios');
    const tiposPrediccion = await http.GET('/tipos-prediccion');
    const data = {
        barrios: barrios.body,
        tiposPrediccion: tiposPrediccion.body,
    };
    
    return data;
});

// Estado inicial
const initialState = {
    fetching: 0,
    error: null,
    message: null,
    data: {}
};

// Definir el slice con la nueva notación builder en extraReducers
const publicSlice = createSlice({
    name: 'public',
    initialState,
    reducers: {
        cleanError: (state) => ({ ...state, error: null }),
        cleanMessage: (state) => ({ ...state, message: null }),
        resetData: () => ({ ...initialState }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPublicData.pending, (state) => {
                state.fetching += 1;
                state.error = null;
                state.message = null;
            })
            .addCase(getPublicData.rejected, (state, action) => {
                state.fetching -= 1;
                state.error = action.error;
            })
            .addCase(getPublicData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.fetching -= 1;
            });
    },
});

// Exportar las acciones y el reducer
export const { cleanError, cleanMessage, resetData } = publicSlice.actions;
export default publicSlice.reducer;
