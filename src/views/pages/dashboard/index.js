import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
// material-ui
import { Grid } from '@mui/material';
// project imports
import { gridSpacing } from 'store/constant';
// import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import MainCard from 'ui-component/cards/MainCard';

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

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
    const theme = useTheme();
    const [ showInfoWindow, setShowInfoWindow ] = useState(false);
    const [ activeMarker, setActiveMarker ] = useState({lat: -23.527295050381184,
        lng: -47.4966746436401});
    const [ selectedPlace, setSelectedPlace ] = useState({});
    const [ marker, setMarkers ] = useState([]);

    const onMapClick = (props) => {
        if(showInfoWindow){
            setShowInfoWindow(false);
            setActiveMarker(null);
        }

    }
    const onMarkerClick = (props) => {
        // setSelectedPlace(props);
        setActiveMarker({lat: props.latLng.lat(), lng: props.latLng.lng()});
        setShowInfoWindow(true);
    }

    const onLoad = marker => {
        console.log("marker: ", marker);
    }

    const center = {
        lat: -23.527295050381184,
        lng: -47.4966746436401
    };

    const position = {
        lat: -23.527295050381184, 
        lng: -47.4966746436401
    }


    return (
        <Grid item xs={12}>
            <PerfectScrollbar component='div'>
                <Grid container spacing={gridSpacing} maxHeight="100vh">
                    <Grid item xs={7}>
                        <LoadScript
                            googleMapsApiKey='AIzaSyBHH-GUvxY2zTD3xhocuuW8UZZAID3TEyM'
                        >
                            <GoogleMap
                                mapContainerStyle={{width: "100%", height: "87vh"}}
                                center={center}
                                zoom={15}
                            >
                                <Marker
                                    position={position}
                                    onLoad={onLoad}
                                    onClick={(e) => onMarkerClick(e)}
                                />
                                {showInfoWindow && 
                                    <InfoWindow
                                        visible={showInfoWindow}
                                        position={activeMarker}
                                        onCloseClick={() => {
                                            setShowInfoWindow(false)
                                        }}
                                    >
                                        <Grid item xs={12}>
                                            <Card sx={{display: 'flex', flexDirection: "row"}}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ width: 151 }}
                                                    image="https://resizedimgs.zapimoveis.com.br/fit-in/800x360/vr.images.sp/a4d22a909b351a556c848405bc096803.jpg"
                                                    alt="Live from space album cover"
                                                />
                                                <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row'}}>
                                                    <Grid item >
                                                        <CardContent>
                                                            <Typography component="div" variant="h4" mb={1}>
                                                                R$990.000,00
                                                            </Typography>
                                                            <Divider />
                                                            <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                                                                <Typography variant="subtitle1" color="black" component="div" mt={1} mr={1}>
                                                                    Tipo de Imóvel: 
                                                                </Typography>
                                                                <Typography variant="subtitle1" color="gray"  component="div" mt={1}>
                                                                    Casa
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                                                                <Typography variant="subtitle1" color="black" component="div" mt={1} mr={1}>
                                                                    Tipo de Aluguel:
                                                                </Typography>
                                                                <Typography variant="subtitle1" color="gray"  component="div" mt={1}>
                                                                    Temporada
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                                                                <Typography variant="subtitle1" color="black" component="div" mt={1} mr={1}>
                                                                    Alugado: 
                                                                </Typography>
                                                                <Typography variant="subtitle1" color="green"  component="div" mt={1}>
                                                                    Alugado
                                                                </Typography>
                                                            </Grid>
                                                        </CardContent>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    </InfoWindow>
                                }
                                
                            </GoogleMap>

                        </LoadScript>
                    </Grid>

                    
                    <Grid item xs={5}>
                        <Card sx={{display: 'flex'}}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="https://resizedimgs.zapimoveis.com.br/fit-in/800x360/vr.images.sp/a4d22a909b351a556c848405bc096803.jpg"
                                alt="Live from space album cover"
                            />
                            <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row'}}>
                                <Grid item xs={8}>
                                    <CardContent>
                                        <Typography component="div" variant="h4" mb={1}>
                                            R$990.000,00
                                        </Typography>
                                        <Divider />
                                        <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                                            <Typography variant="subtitle1" color="black" component="div" mt={1} mr={1}>
                                                Tipo de Imóvel: 
                                            </Typography>
                                            <Typography variant="subtitle1" color="gray"  component="div" mt={1}>
                                                Casa
                                            </Typography>
                                        </Grid>

                                        <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                                            <Typography variant="subtitle1" color="black" component="div" mt={1} mr={1}>
                                                Tipo de Aluguel:
                                            </Typography>
                                            <Typography variant="subtitle1" color="gray"  component="div" mt={1}>
                                                Temporada
                                            </Typography>
                                        </Grid>

                                        <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                                            <Typography variant="subtitle1" color="black" component="div" mt={1} mr={1}>
                                                Alugado: 
                                            </Typography>
                                            <Typography variant="subtitle1" color="green"  component="div" mt={1}>
                                                Alugado
                                            </Typography>
                                        </Grid>
                                    </CardContent>
                                </Grid>
                                
                                <Grid item xs={4}>
                                    <CardContent>
                                        <Button
                                            disableElevation
                                            // disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Detalhes
                                        </Button>
                                    </CardContent>
                                </Grid>
                                
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </PerfectScrollbar>
        </Grid>
        
        
    );
}
// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyBHH-GUvxY2zTD3xhocuuW8UZZAID3TEyM'
// })(SamplePage);

/*
export class MapContainer extends Component {
    render() {
    return (
        <Map google={this.props.google} zoom={14}>
  
            <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
  
            <InfoWindow onClose={this.onInfoWindowClose}>
                <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow>
        </Map>
      );
    }
}

export default GoogleApiWrapper({
    apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE)
})(MapContainer)
*/
