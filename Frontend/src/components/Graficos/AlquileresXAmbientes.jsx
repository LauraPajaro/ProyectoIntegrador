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
import { axisClasses, BarChart, ResponsiveChartContainer, LineChart, AnimatedLine } from '@mui/x-charts';
import { useChartId, useDrawingArea, useXScale } from '@mui/x-charts/hooks';
import { handleString, moneyFormat, formatoFechaMesAnio, generateMonthlyDates, createDataset } from '../../utils/index.js'
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];

const DiferenciaXMes = ({ data, dataset, auxFechas }) => {

    return (
        <Stack>
            <ChartContainer
                width={500}
                height={300}
                series={[
                    { data: pData, label: 'pv', type: 'line' },
                    { data: uData, label: 'uv', type: 'line' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            >
                <LinePlot />
                <MarkPlot />
                <ChartsReferenceLine
                    x="Page C"
                    label="Max PV PAGE"
                    lineStyle={{ stroke: 'red' }}
                />
                <ChartsReferenceLine y={9800} label="Max" lineStyle={{ stroke: 'red' }} />
                <ChartsXAxis />
                <ChartsYAxis />
            </ChartContainer>
        </Stack>
    )
}

export default AlquileresXAmbientes