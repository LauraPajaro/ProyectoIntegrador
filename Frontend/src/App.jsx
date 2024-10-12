import { useState } from 'react'
import themeParams from './theme.js';
import './App.css'
import { Provider } from "react-redux";
import store from "./store/index.js";
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IpcCat from './components/Dashboard/Categories/IpcCat.jsx';

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={createTheme(themeParams)}>
        <CssBaseline />
        <IpcCat />
      </ThemeProvider>
    </Provider>
  )
}

export default App
