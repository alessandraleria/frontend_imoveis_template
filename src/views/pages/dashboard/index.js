import { useEffect, useState } from 'react';
// material-ui
import { Grid } from '@mui/material';
// project imports
import { gridSpacing } from 'store/constant';
// import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// ==============================|| SAMPLE PAGE ||============================== //

function SamplePage({google, locations = []}) {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                {/* <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `700px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                /> */}
                <Map
                    google={google}
                    containerStyle={{
                        position: "fixed",
                        width: "83%",
                        height: "80%"
                    }}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    center={locations[0]}
                    zoom={locations.length === 1 ? 18 : 13}
                    disableDefaultUI={true}
                    initialCenter={{lat: -23.528024418017562, lng: -47.49669579836341}}
                > 
                    <Marker position={{lat: -23.528024418017562, lng: -47.49669579836341}}/>    
                </Map>
            </Grid>
        </Grid>
    );
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBHH-GUvxY2zTD3xhocuuW8UZZAID3TEyM'
})(SamplePage);

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
