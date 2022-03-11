import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Button, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper, TextField, MenuItem } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import AnimateButton from 'ui-component/extended/AnimateButton';

import api from 'services/api';


// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState }) => {
    const theme = useTheme();

    return (
        <OutlineInputStyle
            id="input-search-header"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            startAdornment={
                <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <ButtonBase sx={{ borderRadius: '12px' }}>
                        <HeaderAvatarStyle variant="rounded">
                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                        </HeaderAvatarStyle>
                    </ButtonBase>
                    <Box sx={{ ml: 2 }}>
                        <ButtonBase sx={{ borderRadius: '12px' }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    background: theme.palette.orange.light,
                                    color: theme.palette.orange.dark,
                                    '&:hover': {
                                        background: theme.palette.orange.dark,
                                        color: theme.palette.orange.light
                                    }
                                }}
                                {...bindToggle(popupState)}
                            >
                                <IconX stroke={1.5} size="1.3rem" />
                            </Avatar>
                        </ButtonBase>
                    </Box>
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
        />
    );
};

MobileSearch.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
    popupState: PopupState
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [value, setValue] = useState('');
    const [search, setSearch] = useState('');
    const [propertyType, setPropertyType] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [minValue, setMinValue] = useState("");
    const [types, setTypes] = useState([]);

    const handleSearch = (search, propertyType, minValue, maxValue) => {
        if(location.pathname == "/dashboard"){
            navigate('/dashboard/filter', { state: { search: search, propertyType: propertyType, minValue: minValue, maxValue: maxValue } });
        } else {
            navigate('/dashboard', { state: { search: search, propertyType: propertyType, minValue: minValue, maxValue: maxValue } });
        }
        
    }

    useEffect(() => {
        async function fetchData(){
            try {
                const response = await api.get("/property-type/getAll");
                setTypes(response.data);
            } catch (err) { 
                console.log("Error: ", err);
            }
        }
        fetchData();
        
    }, [])

    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <>
                            <Box sx={{ ml: 2 }}>
                                <ButtonBase sx={{ borderRadius: '12px' }}>
                                    <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                                        <IconSearch stroke={1.5} size="1.2rem" />
                                    </HeaderAvatarStyle>
                                </ButtonBase>
                            </Box>
                            <PopperStyle {...bindPopper(popupState)} transition>
                                {({ TransitionProps }) => (
                                    <>
                                        <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                                            <Card
                                                sx={{
                                                    background: '#fff',
                                                    [theme.breakpoints.down('sm')]: {
                                                        border: 0,
                                                        boxShadow: 'none'
                                                    }
                                                }}
                                            >
                                                <Box sx={{ p: 2 }}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item xs>
                                                            <MobileSearch value={value} setValue={setValue} popupState={popupState} />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Card>
                                        </Transitions>
                                    </>
                                )}
                            </PopperStyle>
                        </>
                    )}
                </PopupState>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <OutlinedInput style={{ marginLeft:"20px" }}
                            id="input-search-header"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <ButtonBase sx={{ borderRadius: '12px' }}>
                                        <HeaderAvatarStyle variant="rounded">
                                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                        </HeaderAvatarStyle>
                                    </ButtonBase>
                                </InputAdornment>
                            }
                            aria-describedby="search-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField
                            id="outline-select-type" label="Tipo" variant="outlined"
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            select
                            fullWidth
                        >
                            <MenuItem value="">Selecione</MenuItem>
                            {types && types.map((item, index) => {
                                return <MenuItem key={index} value={item.id}>
                                    {item.id} - {item.description}
                                </MenuItem>
                            })}
                        </TextField>
                    </Grid>

                    <Grid item xs={3}>
                        <OutlinedInput
                            id="input-maxprice-header"
                            value={maxValue}
                            onChange={(e) => setMaxValue(e.target.value)}
                            placeholder="Preço Máximo"
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <ButtonBase sx={{ borderRadius: '12px' }}>
                                        <HeaderAvatarStyle variant="rounded">
                                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                        </HeaderAvatarStyle>
                                    </ButtonBase>
                                </InputAdornment>
                            }
                            aria-describedby="search-maxprice-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <OutlinedInput
                            id="input-minprice-header"
                            value={minValue}
                            onChange={(e) => setMinValue(e.target.value)}
                            placeholder="Preço Mínimo"
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <ButtonBase sx={{ borderRadius: '12px' }}>
                                        <HeaderAvatarStyle variant="rounded">
                                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                        </HeaderAvatarStyle>
                                    </ButtonBase>
                                </InputAdornment>
                            }
                            aria-describedby="search-minprice-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                    </Grid>

                    <Grid item xs={1}>

                        <AnimateButton>
                            <Button
                                disableElevation
                                fullWidth
                                size="large"
                                variant="contained"
                                color="secondary"
                                onClick={() => handleSearch(search, propertyType, minValue, maxValue)}
                            >
                                Buscar
                            </Button>
                        </AnimateButton>
                    </Grid>

                </Grid>
            </Box>
        </>
    );
};

export default SearchSection;
