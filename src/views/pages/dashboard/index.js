import { useEffect, useState } from 'react';
// material-ui
import { Grid } from '@mui/material';
// project imports
import { gridSpacing } from 'store/constant';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
// ==============================|| SAMPLE PAGE ||============================== //
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))
export default function SamplePage() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `700px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </Grid>
        </Grid>
    );
}

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
