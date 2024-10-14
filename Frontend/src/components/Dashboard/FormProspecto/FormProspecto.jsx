import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import {
    Avatar, Badge, Breadcrumbs, CardActions, CardContent, CardMedia, Collapse, CircularProgress, Dialog, DialogActions, DialogContent, Divider, IconButton, DialogContentText,
    DialogTitle,  Tab, Tabs, TextField, Typography, Tooltip, Popper, Fade, Link, List, ListItem, ListItemButton, ListSubheader,
    ListItemIcon, ListItemText, ListItemAvatar
} from '@mui/material';
import { Autocomplete, Box, Button, ButtonGroup, Card, Chip, FormControl, Input, InputAdornment, MenuItem, Select,Stack,  Slider, OutlinedInput, Paper, } from '@mui/material';
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
const FormProspecto = () => {
    const mesActual = new Date().getMonth()
    const anioActual = new Date().getFullYear()
    const dispatch = useDispatch();
    const { barrios, tiposPrediccion } = useSelector(state => state.public.data);
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
    const handleConsulta = () => {
        const fecha = new Date(Date.UTC(form?.anio, form?.mes, 1, 12, 0, 0, 0)); // "2024-09-01T03:00:00.000Z"
        const fechaInicioContrato = fecha.toISOString();
        let aux = { ...form, fechaInicioContrato };
        let huboError = false
        setErrors([])
        if (aux?.barrio === null) {huboError=true; setErrors([...errors, {code:'barrio', message: "* Campo obligatorio"}])}
        if (aux?.precio <= 0) {huboError=true; setErrors([...errors, {code:'precio', message: "* Valor inválido"}])}
        if (huboError) return
        delete aux.mes
        delete aux.anio
        
        dispatch(addProspecto(aux))
    }
    //console.log({ barrios })
    return <Box sx={{ height: '100vh', width: '100vh', padding: 0 }}>
        <Paper square={false} variant="outlined" sx={{ height: '100%', width: '100%', p: 5, borderRadius: '1rem' }}>
            <Grid container spacing={2} justifyContent={'space-between'}>
                <Typography gutterBottom variant="h5" textAlign='left' component="div" children={'Consulta'} />
                <Button onClick={() => handleConsulta()} children={'Enviar'} endIcon={<Send />} />
            </Grid>
            <Grid container spacing={2}>
                <Grid size={12} id='barrio'>
                    <Typography gutterBottom variant="h7" color={errors?.find(e=> e.code === 'barrio') && form?.barrio === null ? "error" : 'textPrimary'} textAlign='left' component="div" children={'Barrio *'} />
                    <Autocomplete
                        options={barrios?.map(b => b.nombre) || []}
                        value={form?.barrio}
                        onChange={(event, newValue) => {
                            setForm({ ...form, barrio: newValue });
                        }}
                        renderInput={(params) => <TextField color={errors?.find(e=> e.code === 'barrio') && form?.barrio === null? "error" : 'textPrimary'} focused {...params} />}
                    />
                    
                </Grid>

                <Grid conteiner size={6} >
                <Stack spacing={2}>
                    <Grid id='cadencia' item size={12} >
                        <Grid size={12} container alignItems="flex-end" spacing={1}>
                            <Typography gutterBottom variant="h7" textAlign='left' component="div" children={`Actualización `} />
                            <FormControl variant="standard" >
                                <Select
                                    value={form?.cadencia}
                                    onChange={(e) => setForm({ ...form, cadencia: e.target.value })}
                                    label=""
                                >
                                    {cadencias?.map((a, i) => { return <MenuItem disabled={a.value === 6} key={`anio-selector-${i}`} value={a?.value}>{a?.label}</MenuItem> })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid id='indice' item  size={12} >
                        <Typography gutterBottom variant="h7" textAlign='left' component="div" children={'Índice'} />
                        <Grid size={12} container justifyContent="flex-start" spacing={1}>
                            {indices?.map((c, i) => <Button key={`indice-selector-${i}`} sx={{}} color='ochre.dark' variant={form?.indice === c ? "outlined" : "text"} onClick={() => setForm({ ...form, indice: c })} children={c} />)}
                        </Grid>
                    </Grid>
                    <Grid id='ambientes' item size={12} >
                        <Typography gutterBottom variant="h7" textAlign='left' component="div" children={`Ambientes`} />
                        <Grid size={12} container justifyContent="flex-start" spacing={0} sx={{ m: 0, p: 0 }}>
                            {cantidadAmb?.map((c, i) => <Button sx={{ width: `${100 / cantidadAmb?.length}%` }} key={`cadencia-selector-${i}`} color='ochre.dark' variant={form?.cantidadAmb === c ? "outlined" : "text"} onClick={() => setForm({ ...form, cantidadAmb: c })} children={c} />)}
                        </Grid>
                    </Grid>
                </Stack>
                </Grid>
                <Grid conteiner size={6} spacing={2}>
                    <Grid id='calendario' size={12} justifyContent={'flex-start'} container spacing={2} >
                        <Grid size={12} container alignItems="flex-end" spacing={1}>
                            <Typography gutterBottom variant="h7" textAlign='left' component="div" children={`Inicio del Contrato: ${meses[form?.mes]} - `} />
                            <FormControl variant="standard" >
                                <Select
                                    value={form?.anio}
                                    onChange={(e) => setForm({ ...form, anio: e.target.value })}
                                    label=""
                                >
                                    {anios?.map((a, i) => { return <MenuItem key={`anio-selector-${i}`} value={a}>{a}</MenuItem> })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={12} container justifyContent="flex-start" spacing={1}>
                            {meses?.map((m, i) => {
                                return <Chip key={`mes-selector-${i}`} sx={{ width: '25%' }} label={m} variant={form?.mes === i ? "filled" : "outlined"} onClick={() => setForm({ ...form, mes: i })} />
                            })}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid id='precio' size={12} >
                    <Typography gutterBottom variant="h7" textAlign='left' color={errors?.find(e=> e.code === 'precio') && form?.precio <= 0 ? "error" : 'textPrimary'} component="div" children={'Precio *'} />
                    <FormControl fullWidth variant="standard" sx={{zoom: 1.3}}>
                        <Input
                        focused
                        color={errors?.find(e=> e.code === 'precio') && form?.precio <= 0 ? "error" : 'textPrimary'}
                            min={0}
                            onChange={(e, v) => setForm({ ...form, precio: parseFloat(e.target.value) })}
                            value={form.precio}
                            type='number'
                            id="standard-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                </Grid>

            </Grid>
        </Paper>
    </Box>

};


export default FormProspecto;