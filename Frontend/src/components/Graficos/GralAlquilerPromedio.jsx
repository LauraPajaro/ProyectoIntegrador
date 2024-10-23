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

const GralAlquilerPromedio = ({ data, dataset, auxFechas }) => {
    return (
        <BarChart
            dataset={dataset}
            xAxis={data?.fechaInicioContrato ?
                [{ scaleType: 'band', tickPlacement: 'middle', tickLabelPlacement: 'middle', dataKey: 'mes' }]
                : [{ data: auxFechas }]
            }
            series={data?.fechaInicioContrato ?
                [
                    { dataKey: 'precioAlquiler', label: 'Tu Alquiler', valueFormatter: (v) => moneyFormat(v) },
                    { dataKey: 'promedioAlquiler', label: `Promedio ${data?.cantidadAmb}-Amb en ${data?.barrio}`, valueFormatter: (v) => moneyFormat(v) },
                    //{ dataKey: 'indice', label: data?.indice?.toUpperCase(), valueFormatter },
                ]
                : []
            }
            width={500}
            height={300}
        />
    )
}

export default GralAlquilerPromedio