// material-ui
import { Grid } from '@mui/material';
// project imports
import EarningCard from '../dashboard/Default/EarningCard';
import TotalCard from '../dashboard/Default/TotalOrderLineChartCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <MainCard>
        <Grid container spacing={gridSpacing}>
            <Grid xs={4}>
                <EarningCard />
            </Grid>
            <Grid xs={4}>
                <TotalCard />
            </Grid>
        </Grid>
    </MainCard>
);

export default SamplePage;

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
