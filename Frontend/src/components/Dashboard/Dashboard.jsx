import React, { useEffect, useState } from "react";

import { Avatar, Badge, Button, IconButton, Stack, Typography, } from '@mui/material';
import {
    Add, AddBusiness, AdminPanelSettings, AttachEmail, AttachFile, AttachMoney, Check, Close, CreditCard, Comment, ContactMail, Delete, Event, Folder, History,
    Notifications as NotificationIcon, LocalActivity, Person, Receipt, Refresh, Timeline, Edit, Note, MoreHoriz,
    Visibility, LocationCity, Logout,
} from '@mui/icons-material';
import './Dashboard.css';

import FormProspecto from "./FormProspecto/FormProspecto.jsx";
import ResultadosConsulta from "./ResultadosConsulta/ResultadosConsulta.jsx";
//import DashboardCat from './DashboardCat/DashboardCat.jsx'

const Dashboard = (props) => {

    // const dispatch = useDispatch();
    // useEffect(() => { dispatch(getData()) }, []);
    //const { logout, user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();


    const Main = () => {

        return <div children={<><FormProspecto /><ResultadosConsulta/></>} />
    };

    return (
            <div className="container">
                <Main />
            </div>)
}

// export default withAuthenticationRequired(Dashboard, { onRedirecting: () => <h1>Redirecting</h1> });
export default Dashboard;