import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
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

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
    
    
    const [ marker, setMarkers ] = useState(null);
    const [map, setMap] = useState(null);
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    var infowindow;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBHH-GUvxY2zTD3xhocuuW8UZZAID3TEyM"
    })

    const onLoad =  useCallback(async function callback(map) {
        console.log("map: ", map)
        await fetchData();
        const bounds = new window.google.maps.LatLngBounds();     
        
        map.setZoom(15);
        infowindow = new google.maps.InfoWindow();
        positions.forEach((item, index) => {
            var marker = addMarker(item, map);
            marker.setMap(map);
            bounds.extend(item.location);
        });
        const center = bounds.getCenter();
        map.setCenter(center);
        map.fitBounds(bounds);
        map.addListener("click", function() {
            infowindow.close();
        });
        
        setMap(map);
    }, [])

    

    const addMarker = (location, map) => {
        var contentString = `<div id="content">
            <div id="siteNotice">
            <img src="${location.image}" alt="Girl in a jacket" width="300"/>
            </div>
            <h3 id="firstHeading" class="firstHeading">R$${location.value}</h3>
            <div id="bodyContent">
            <p><b>${location.title}</b></p>  
            <p><b>Alugada: </b> ${location.rented ? `Alugada` : `Disponível`}</p>
            <p><b>Valor do Aluguel: </b> R$${location.rent_value}</p>
            <p>${location.address}, ${location.zip_code}</p>
            <p>${location.city_uf_country}</p>
            </div>
            </div>`;

        var marker = new google.maps.Marker({
            position: location.location,
            title: location.title,
            clickable: true
        });

        marker.addListener("click", function() {
            infowindow.close();
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
        });
        return marker;
    }

    const positions = []
    async function fetchCards(){
        try {
            const response = await api.get("/properties");
    
            if (response.data) {
                setData
                console.log(data)
            } else {
            alert(
                "\nServidor indisponível!\nPor favor, tente novamente mais tarde"
            );
            }
        } catch (err) {
            console.log("Erro: " + err);
            alert("Falha carregando dados de propriedades, tente novamente.");
        } finally {
            console.log(data)
        }
    }
    useEffect(() => {   
        setLoading(true)
        fetchCards();
    }, [])

    // useEffect(() => {
    //     fetchCards();
    //     // for(let i = 0; i < data.length; i++){
    //     //     renderCards(data[i]);
    //     // }
        
    // }, [])

    async function renderCards(item){
        return(
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
                                R${item.value}
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
        )
    }

    async function fetchData(){
        try {
            const response = await api.get("/properties");
    
            if (response.data) {
                for(let i = 0; i < response.data.length; i++){
                    positions.push({
                        title: response.data[i].description,
                        image: response.data[i].image,
                        value: response.data[i].value,
                        rented: response.data[i].rented,
                        address: response.data[i].address + ', ' + response.data[i].number,
                        zip_code: response.data[i].zip_code,
                        city_uf_country: response.data[i].city + " - " + response.data[i].state + ", " + response.data[i].country,
                        rent_value: response.data[i].rent_value,
                        location: {
                            lat: parseFloat(response.data[i].latitude), 
                            lng: parseFloat(response.data[i].longitude)
                        } 
                    })
                }
            } else {
            alert(
                "\nServidor indisponível!\nPor favor, tente novamente mais tarde"
            );
            }
        } catch (err) {
            console.log("Erro: " + err);
            alert("Falha carregando dados de propriedades, tente novamente.");
        }
    }
    if(loading){
        return (
            <div>oi</div>
        )
    }

    if(!loading){
       return (
        <Grid item xs={12}>
            <PerfectScrollbar component='div'>
                <Grid container spacing={gridSpacing} maxHeight="100vh">
                    {/* <Grid item xs={7}>
                        {isLoaded &&
                            <GoogleMap
                                mapContainerStyle={{width: "100%", height: "87vh"}}
                                onLoad={onLoad}
                            />
                        }       
                    </Grid> */}

                    
                    <Grid item xs={5}>
                        {
                            data && data.forEach((item) => {
                                
                                <div>{item.id}</div>
                                   
                                
                                    
                                //     <Card sx={{display: 'flex'}}>
                                //     <CardMedia
                                //         component="img"
                                //         sx={{ width: 151 }}
                                //         image="https://resizedimgs.zapimoveis.com.br/fit-in/800x360/vr.images.sp/a4d22a909b351a556c848405bc096803.jpg"
                                //         alt="Live from space album cover"
                                //     />
                                //     <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row'}}>
                                //         <Grid item xs={8}>
                                //             <CardContent>
                                //                 <Typography component="div" variant="h4" mb={1}>
                                //                     R${item.value}
                                //                 </Typography>
                                //                 <Divider />
                                //                 <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                                //                     <Typography variant="subtitle1" color="black" component="div" mt={1} mr={1}>
                                //                         Tipo de Imóvel: 
                                //                     </Typography>
                                //                     <Typography variant="subtitle1" color="gray"  component="div" mt={1}>
                                //                         Casa
                                //                     </Typography>
                                //                 </Grid>

                                //                 <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                                //                     <Typography variant="subtitle1" color="black" component="div" mt={1} mr={1}>
                                //                         Tipo de Aluguel:
                                //                     </Typography>
                                //                     <Typography variant="subtitle1" color="gray"  component="div" mt={1}>
                                //                         Temporada
                                //                     </Typography>
                                //                 </Grid>

                                //                 <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                                //                     <Typography variant="subtitle1" color="black" component="div" mt={1} mr={1}>
                                //                         Alugado: 
                                //                     </Typography>
                                //                     <Typography variant="subtitle1" color="green"  component="div" mt={1}>
                                //                         Alugado
                                //                     </Typography>
                                //                 </Grid>
                                //             </CardContent>
                                //         </Grid>
                                        
                                //         <Grid item xs={4}>
                                //             <CardContent>
                                //                 <Button
                                //                     disableElevation
                                //                     // disabled={isSubmitting}
                                //                     fullWidth
                                //                     size="large"
                                //                     type="submit"
                                //                     variant="contained"
                                //                     color="secondary"
                                //                 >
                                //                     Detalhes
                                //                 </Button>
                                //             </CardContent>
                                //         </Grid>
                                        
                                //     </Grid>
                                // </Card>  
                                
                                
                            })
                             
                        }
                        
                    </Grid>
                </Grid>
            </PerfectScrollbar>
        </Grid>
        
        
    ); 
    }

    
}

