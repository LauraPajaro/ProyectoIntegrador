import { useState } from 'react'
import themeParams from './theme.js';
import './App.css'
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IpcCat from './components/Dashboard/Categories/IpcCat.jsx';
import FormProspecto from './components/Dashboard/FormProspecto/FormProspecto.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { esES } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './fonts/fonts.css'; // Import the font styles
function App() {

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs} localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
        <ThemeProvider theme={createTheme(themeParams)}>
          <CssBaseline />
          <Dashboard />
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  )
}

export default App
