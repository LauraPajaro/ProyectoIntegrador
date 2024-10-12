import { createAsyncThunk, createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import http from '../../../lib/http/index.js';


export const getPublicData = createAsyncThunk('GET_PAGOS', async (payload, thunkAPI) => {
    const barrios = await http.GET('/barrios');
    const tiposPrediccion = await http.GET('/tipos-prediccion')
    const data ={
        barrios: barrios.body,
        tiposPrediccion: tiposPrediccion.body,
    };
    return data 
});

const initialState = {
    fetching: 0,
    error: null,
    message: null,
    data: {}
};

const publicSlice = createSlice({
    name: 'public',
    initialState,
    reducers: {
        cleanError: (state, action) => ({ ...state, error: null }),
        cleanMessage: (state, action) => ({ ...state, message: null }),
        resetData: (state, action) => ({ ...initialState }),
    },
    extraReducers: {
        [getPublicData.pending]: (state, action) => ({ ...state, fetching: state.fetching + 1, error: null, message: null }),
        [getPublicData.rejected]: (state, action) => ({ ...state, fetching: state.fetching - 1, error: action }),
        [getPublicData.fulfilled]: (state, action) => ({ ...state, data: action.payload, fetching: state.fetching - 1 }),

    },
})

export const { cleanError, cleanMessage, resetData } = publicSlice.actions
export default publicSlice.reducer;