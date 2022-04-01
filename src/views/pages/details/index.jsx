import React, { useEffect, useState, useCallback, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router";
// material-ui
import { Grid } from "@mui/material";
// project imports
import { gridSpacing } from "store/constant";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useLoadScript,
  useJsApiLoader,
} from "@react-google-maps/api";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import api from "../../../services/api";
import axios from "axios";
import { UserContext } from "hooks/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";

// ==============================|| SAMPLE PAGE ||============================== //

export default function DetailsPage() {
  const theme = useTheme();
  const { state } = useLocation();
  const { user } = useContext(UserContext);
  const [marker, setMarkers] = useState(null);
  const [map, setMap] = useState(null);
  const [data, setData] = useState(null);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [propertyId, setPropertyId] = useState(null);

  useEffect(() => {
    var query = window.location.search.slice(1);
    var partes = query.split("&");
    var property_id = {};
    partes.forEach(function (parte) {
      var chaveValor = parte.split("=");
      property_id = chaveValor[1];
    });
    setPropertyId(property_id);
    fetchData(user.id, property_id);
  }, []);

  async function fetchData(user_id, property_id) {
    try {
      const response = await api.post("/properties/findById", {
        id_user: user_id,
        id: property_id,
      });
      console.log("Response: ", response);

      if (response.data) {
        setData(response.data.property);
        setHistory(response.data.history);
      } else {
        alert(
          "\nServidor indisponível!\nPor favor, tente novamente mais tarde"
        );
      }
    } catch (err) {
      console.log("Erro: " + err);
      alert("Falha carregando dados de , tente novamente.");
    }
  }

  async function addHistory() {
    try {
      console.log("Property: ", propertyId);
      console.log("Description: ", description);
      console.log("Date: ", date);
      const response = await api.post("/properties/addEvent", {
        user_id: user.id,
        property_id: propertyId,
        description,
        date,
      });

      if (response.status == 200) {
        api.post("/email/sendMail", {
          user_id: user.id,
          property_id: propertyId,
          description,
          date,
        });
        alert("Evento cadastrado com sucesso.");
      }
    } catch (err) {
      console.log("Erro: " + err);
      alert("Falha carregando dados de , tente novamente.");
    } finally {
      fetchData(user.id, propertyId);
    }
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Grid item xs={12}>
      <PerfectScrollbar component="div">
        <Grid container spacing={gridSpacing} maxHeight="100vh">
          <Grid item xs={12}>
            <Grid>
              <Card xs={12} sx={{ display: "flex", flexDirection: "column" }}>
                <Grid
                  item
                  mb={3}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <Grid item xs={12} mt={3} ml={3}>
                    <CardMedia
                      component="img"
                      sx={{ width: 800, padding: 1, borderRadius: 4 }}
                      image={data && data.image}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    ml={3}
                    mt={3}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <CardContent>
                      <Typography component="div" variant="h3" mb={1}>
                        {data &&
                          data.address +
                            ", " +
                            data.number +
                            " - " +
                            data.zip_code}
                      </Typography>
                      <Typography component="div" variant="h3" mb={1}>
                        {data &&
                          data.city + " - " + data.state + ", " + data.country}
                      </Typography>

                      <Divider />

                      <Typography component="div" variant="h1" mb={1} mt={1}>
                        Valor: R$ {data && data.value}
                      </Typography>

                      {data && data.rented ? (
                        <Typography component="div" variant="h2" mb={1} mt={1}>
                          Aluguel: R$ {data && data.rent_value}
                          <span style={{ fontSize: 13 }}>/mês</span>
                        </Typography>
                      ) : null}

                      <Divider />

                      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          variant="h4"
                          color="black"
                          component="div"
                          mt={1}
                          mr={1}
                        >
                          Tipo de Imóvel:
                        </Typography>
                        <Typography
                          variant="h4"
                          color="gray"
                          component="div"
                          mt={1}
                        >
                          {data && data.property_type == 1 && "Casa"}
                          {data && data.property_type == 2 && "Apartamento"}
                          {data && data.property_type == 3 && "Comercial"}
                          {data && data.property_type == 4 && "Chácara"}
                          {data && data.property_type == 5 && "Sobrado"}
                        </Typography>
                      </Grid>

                      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          variant="h4"
                          color="black"
                          component="div"
                          mt={1}
                          mr={1}
                        >
                          Tipo de Aluguel:
                        </Typography>
                        <Typography
                          variant="h4"
                          color="gray"
                          component="div"
                          mt={1}
                        >
                          {data && data.rent_type == 1
                            ? "Temporada"
                            : "Aluguel"}
                        </Typography>
                      </Grid>

                      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          variant="h4"
                          color="black"
                          component="div"
                          mt={1}
                          mr={1}
                        >
                          Alugado:
                        </Typography>
                        <Typography
                          variant="h4"
                          color="green"
                          component="div"
                          mt={1}
                        >
                          {data && data.rented ? "Alugado" : "Disponível"}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>

                <Divider />
                <Divider />

                <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid
                    item
                    xs={12}
                    ml={3}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <CardContent>
                      <Typography component="div" variant="h2" mb={1}>
                        Histórico de Eventos:
                      </Typography>

                      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell align="right">Data</TableCell>
                                <TableCell align="right">Descrição</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {history &&
                                history.map((row) => (
                                  <TableRow
                                    key={row.id}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {row.id}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.description}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.date}
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>

                      <Grid sx={{ display: "flex", flexDirection: "row" }}>
                        <form noValidate>
                          <Grid
                            container
                            spacing={1}
                            sx={{ display: "flex", flexDirection: "row" }}
                          >
                            <Grid sx={2} item>
                              <FormControl
                                sx={{ ...theme.typography.customInput }}
                              >
                                <InputLabel htmlFor="outlined-adornment-email-login">
                                  Descrição
                                </InputLabel>
                                <OutlinedInput
                                  id="outlined-adornment-email-login"
                                  type="text"
                                  value={description}
                                  name="description"
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  label="Descrição"
                                  inputProps={{}}
                                />
                              </FormControl>
                            </Grid>

                            <Grid sx={2} item>
                              <FormControl
                                sx={{ ...theme.typography.customInput }}
                              >
                                <InputLabel htmlFor="outlined-adornment-email-login">
                                  Data
                                </InputLabel>
                                <OutlinedInput
                                  id="outlined-adornment-email-login"
                                  type="date"
                                  value={date}
                                  name="date"
                                  onChange={(e) => setDate(e.target.value)}
                                  label="Data"
                                  inputProps={{}}
                                />
                              </FormControl>
                            </Grid>

                            <Grid item sx={{ mt: 2 }}>
                              <AnimateButton>
                                <Button
                                  disableElevation
                                  size="large"
                                  type="button"
                                  onClick={() => addHistory()}
                                  variant="contained"
                                  color="secondary"
                                >
                                  Adicionar
                                </Button>
                              </AnimateButton>
                            </Grid>
                          </Grid>
                        </form>
                      </Grid>
                    </CardContent>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    ml={3}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <CardContent>
                      <Typography component="div" variant="h2" mb={1}>
                        Descrição:
                      </Typography>

                      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          variant="h4"
                          color="gray"
                          component="div"
                          mt={1}
                          mr={1}
                        >
                          {data && data.description}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </PerfectScrollbar>
    </Grid>
  );
}
