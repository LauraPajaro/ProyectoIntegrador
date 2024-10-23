import React, { useEffect, useState } from "react";

import {
    Avatar, Badge, Breadcrumbs, CardActions, CardContent, CardMedia, Collapse, CircularProgress, Dialog, DialogActions, DialogContent, Divider, IconButton, DialogContentText,
    DialogTitle, Tab, Tabs, TextField, Typography, Tooltip, Popper, Fade, Link, List, ListItem, ListItemButton, ListSubheader,
    ListItemIcon, ListItemText, ListItemAvatar
} from '@mui/material';
import { Autocomplete, Box, Button, ButtonGroup, Card, Chip, FormControl, Input, InputAdornment, MenuItem, Select, Stack, Slider, OutlinedInput, Paper, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import './Dashboard.css';

import FormProspecto from "./FormProspecto/FormProspecto.jsx";
import ResultadosConsulta from "./ResultadosConsulta/ResultadosConsulta.jsx";
//import DashboardCat from './DashboardCat/DashboardCat.jsx'

const Dashboard = (props) => {

    // const dispatch = useDispatch();
    // useEffect(() => { dispatch(getData()) }, []);
    //const { logout, user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();


    const Main = () => {

        return <Grid container spacing={2}>
            <Grid size={5} children={<FormProspecto />} />
            <Grid size={7} children={<ResultadosConsulta />} />
        </Grid>
    };

    return (
        <div className="container">
            <Main />
        </div>)
}

// export default withAuthenticationRequired(Dashboard, { onRedirecting: () => <h1>Redirecting</h1> });
export default Dashboard;