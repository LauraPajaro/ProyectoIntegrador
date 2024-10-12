import { configureStore } from '@reduxjs/toolkit'
import prospectosSlice from './prospectos/slice.js'
export const store = configureStore({
    reducer: { 
        prospectos: prospectosSlice
    }
})