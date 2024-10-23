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
    Send, Add, AttachFile, Check, Close, Circle, CreditCard, Comment, DataObject, Delete, Event, ExpandLess, ExpandMore, FormatListBulleted,
    History, Notifications as NotificationIcon, LocalActivity, Person, RadioButtonUnchecked, Receipt, Refresh, Timeline, Edit, Note, MoreVert, Visibility
} from '@mui/icons-material';
import { axisClasses, BarChart, ResponsiveChartContainer } from '@mui/x-charts';
import { handleString,  moneyFormat, formatoFechaMesAnio, generateMonthlyDates, createDataset } from '../../utils/index.js'

const DiferenciaXMes = ({ data, dataset, auxFechas }) => {
   
    let datasetDif = dataset?.map(d => ({ ...d, diferencia: (d.precioAlquiler - d.promedioAlquiler) }));
    let difTotal = datasetDif?.reduce((acc, x) => acc + x.diferencia, 0)
    const chartSetting = {
        xAxis: [
            {
                label: '',
                colorMap: {
                    type: 'piecewise',
                    thresholds: [0],
                    colors: ['green', 'red'],
                }
            },
        ],
        width: 500,
        height: 400,
    };
    return (
        <Stack>
            <Typography children={`Diferencia Mensual`} />
            <BarChart
                dataset={datasetDif}
                layout="horizontal"
                yAxis={data?.fechaInicioContrato ?
                    [{ scaleType: 'band', tickPlacement: 'middle', tickLabelPlacement: 'middle', dataKey: 'mes' }]
                    : [{ data: auxFechas }]
                }
                series={data?.fechaInicioContrato ?
                    [
                        { dataKey: 'diferencia', label: 'Diferencia Mensual', valueFormatter: (v) => moneyFormat(v) },
                    ]
                    : []
                }
                width={500}
                height={300}
                {...chartSetting}
            />
            <Typography children={`En ${datasetDif?.length} meses de contrato pagará  ${moneyFormat(difTotal)}\n con respecto al valor promedio del mercado inmobiliario.`} />
        </Stack>
    )
}

export default DiferenciaXMes