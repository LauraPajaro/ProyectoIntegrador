import { configureStore } from '@reduxjs/toolkit';
import prospectosSlice from './slices/prospectosSlice.js';
import publicSlice from './slices/publicSlice.js'

export const store = configureStore({
    reducer: { 
        prospectos: prospectosSlice,
        public: publicSlice
    }
})