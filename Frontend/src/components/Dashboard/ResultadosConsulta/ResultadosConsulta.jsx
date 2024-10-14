import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import {
    Avatar, Badge, Breadcrumbs, CardActions, CardContent, CardMedia, Collapse, CircularProgress, Dialog, DialogActions, DialogContent, Divider, IconButton, DialogContentText,
    DialogTitle, Stack, Tab, Tabs, TextField, Typography, Tooltip, Popper, Fade, Link, List, ListItem, ListItemButton, ListSubheader,
    ListItemIcon, ListItemText, ListItemAvatar
} from '@mui/material';
import { Autocomplete, Box, Button, ButtonGroup, Card, Chip, FormControl, Input, InputAdornment, MenuItem, Select, Slider, OutlinedInput, Paper, } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DateCalendar, DatePicker } from '@mui/x-date-pickers';
import dayjs from "dayjs";
import Grid from '@mui/material/Grid2';
import {
    Send,Add, AttachFile, Check, Close, Circle, CreditCard, Comment, DataObject, Delete, Event, ExpandLess, ExpandMore, FormatListBulleted,
    History, Notifications as NotificationIcon, LocalActivity, Person, RadioButtonUnchecked, Receipt, Refresh, Timeline, Edit, Note, MoreVert, Visibility
} from '@mui/icons-material';
import { getPublicData } from '../../../store/slices/publicSlice';
import { addProspecto } from '../../../store/slices/prospectosSlice'
import { esES } from "@mui/x-date-pickers/locales";
import 'dayjs/locale/es';
const ResultadosConsulta = () => {
    const mesActual = new Date().getMonth()
    const anioActual = new Date().getFullYear()
    const dispatch = useDispatch();
    const { barrios, tiposPrediccion } = useSelector(state => state.public.data);
    const { fetching, error, message, data } = useSelector(state => state.prospectos);
    console.log({data})
    const [errors, setErrors] = useState([])
    let formDflt = {
        "indice": "ipc",
        "barrio": null,
        "precio": 0,
        "cadencia": 3,
        "cantidadAmb": 1,
        "fechaInicioContrato": dayjs(),
        "mes": mesActual,
        "anio": anioActual
    }
    const [form, setForm] = useState({...formDflt})
    console.log({ form })
    const isFetched = useRef(false); // Esta bandera asegura que se llame solo una vez
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const anios = [2024, 2025];
    const cadencias = [{ value: 3, label: 'trimestral' }, { value: 4, label: 'cuatrimestral' }, { value: 6, label: 'semestral' }]
    const indices = ['ipc', 'icl'];
    const cantidadAmb = [1, 2, 3]
    useEffect(() => {
        if (!isFetched.current || !(barrios?.length !== 0)) {
            dispatch(getPublicData());
            isFetched.current = true; // Marca que ya se hizo la llamada
        }
    }, [dispatch])
    //console.log({ barrios })
    return <Box sx={{ height: '100vh', width: '100vh', padding: 0 }}>
        <Paper square={false} variant="outlined" sx={{ height: '100%', width: '100%', p: 5, borderRadius: '1rem' }}>
            <Grid container spacing={2} justifyContent={'space-between'}>
                <Typography gutterBottom variant="h5" textAlign='left' component="div" children={'Consulta'} />
            </Grid>
            <Grid container spacing={2}>
               
            </Grid>
        </Paper>
    </Box>

};


export default ResultadosConsulta;