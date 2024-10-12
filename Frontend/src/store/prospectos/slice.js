import { createAsyncThunk, createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import http from '../../../lib/http/index.js';

export const getIpc = createAsyncThunk('GET_IPC', async (payload, thunkAPI) => {
        const res = (await http.TABLE('/indices')).body;
        return res
});
export const addProspecto = createAsyncThunk('POST_PROSPECTOS', async (payload, thunkAPI) => {
    let res = (await http.POST('/consulta', payload));
    //await thunkAPI.dispatch(getIpc()).unwrap();
    return res;
});
const initialState = {
    //pendingRequests: 0,
    fetching: 0,
    error: null,
    message: null,
    data: {}
};

const prospectosSlice = createSlice({
    name: 'prospectos',
    initialState,
    reducers: {
        cleanError: (state, action) => ({ ...state, error: null }),
        cleanMessage: (state, action) => ({ ...state, message: null }),
        resetData: (state, action) => ({ ...initialState }),
    },
    extraReducers: {
        [getIpc.pending]: (state, action) => ({ ...state, fetching: state.fetching + 1, error: null, message: null }),
        [getIpc.rejected]: (state, action) => ({ ...state, fetching: state.fetching - 1, error: action }),
        [getIpc.fulfilled]: (state, action) => ({ ...state, data: action.payload, fetching: state.fetching - 1 }),

        [addProspecto.pending]: (state, action) => ({ ...state, fetching: state.fetching + 1 }),
        [addProspecto.rejected]: (state, action) => ({ ...state, fetching: state.fetching - 1, error: "No se pudo procesar la creación!" }),
        [addProspecto.fulfilled]: (state, action) => ({
            ...state,
            data: action.payload.bady,
            fetching: state.fetching - 1,
            message: action.payload.status === 200 ? "Índice creado!" : null,
            error: action.payload.status != 200 ? "No se pudo crear el Índice!" : null,
        }),
    },
})

export const { cleanError, cleanMessage, resetData } = prospectosSlice.actions
export default prospectosSlice.reducer;