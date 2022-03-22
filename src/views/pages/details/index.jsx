import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router';
// material-ui
import { Grid } from '@mui/material';
// project imports
import { gridSpacing } from 'store/constant';
import { GoogleMap, LoadScript, Marker, InfoWindow, useLoadScript, useJsApiLoader  } from '@react-google-maps/api';

import { 
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Divider,
    Button
 } from '@mui/material';
 import AnimateButton from 'ui-component/extended/AnimateButton';
import PerfectScrollbar from 'react-perfect-scrollbar';
import "react-perfect-scrollbar/dist/css/styles.css";
import api from "../../../services/api";
import axios from "axios";
import { UserContext } from 'hooks/UserContext';

// ==============================|| SAMPLE PAGE ||============================== //

export default function DetailsPage() {
    
    const {state} = useLocation(); 
    const { user } = useContext(UserContext);
    const [ marker, setMarkers ] = useState(null);
    const [map, setMap] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    if(loading){
        return (
            <div>Carregando...</div>
        )
    }

    
       return (
        <Grid item xs={12}>
            <PerfectScrollbar component='div'>
                <Grid container spacing={gridSpacing} maxHeight="100vh">
                    <div>oi</div>
                </Grid>
            </PerfectScrollbar>
        </Grid>
        
        
    ); 

    
}

