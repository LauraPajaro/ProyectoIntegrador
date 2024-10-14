//https://mui.com/material-ui/customization/default-theme           Default theme
//https://bareynol.github.io/mui-theme-creator/#BottomNavigation    Try styles here (MUI V4, migth not work exactly like V5)

//XML to JSON to JS script from paletton.com
//raw.palette.colorset.reduce((p, x) => ({ ...p, [x._id]: x.color.reduce((pc, xc) => ({ ...pc, [xc._id.split(x._id + '-')[1]]: '#' + xc._rgb}), {})}), {});

import { createTheme } from '@mui/material/styles';
import { esES } from "@mui/x-date-pickers/locales";
const defaultTheme = createTheme();

export default {
    ...esES,
    ...{
        typography: {
            fontFamily: 'Geist Sans, Arial, sans-serif',
            "fontSize": 14,
            "fontWeightLight": 300,
            "fontWeightRegular": 400,
            "fontWeightMedium": 500
        },
        palette: {
            ...defaultTheme.palette,
            primary: {
                main: '#672C5F',
                light: '#FFBB3B',
                dark: '#B37800',
                contrastText: '#FFFFFF',
            },
            secondary: {
                main: '#17263c',
                light: '#CA75C0',
                dark: '#672C5F',
                contrastText: '#FFFFFF',
            },
            info: {
                main: '#0E99DF',
                light: '#6AC0FF',
                dark: '#0073AC',
                contrastText: '#FFFFFF',
            },
            success: {
                main: '#DF8A0E',
                light: '#80E27E',
                dark: '#087F23',
                contrastText: '#FFFFFF',
            },
            error: {
                main: '#F44336',
                light: '#FF7961',
                dark: '#BA000D',
                contrastText: '#FFFFFF',
            },
            warning: {
                main: '#FF9800',
                light: '#FFC947',
                dark: '#C66900',
                contrastText: '#000000',
            },
            ochre: {
                main: '#E3D026',
                light: '#E9DB5D',
                dark: '#A29415',
                contrastText: '#242105',
            },
        },
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    columnHeader: {
                        fontWeight: 'bold' // Cambia a 'bold', 700, 600, etc., según prefieras
                    }
                }
            }
        }
    }
}; 