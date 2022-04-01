import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import useFindUser from 'hooks/useFindUser';

import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('views/pages/dashboard/index.jsx')));

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Filter = Loadable(lazy(() => import('views/pages/dashboard/byfilter.jsx')));
const Filter2 = Loadable(lazy(() => import('views/pages/dashboard/byfilter2.jsx')));
const Details = Loadable(lazy(() => import('views/pages/details/index.jsx')));
const Chat = Loadable(lazy(() => import('views/pages/Chat/Chat')));
const Join = Loadable(lazy(() => import('views/pages/Join/Join')));
// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));


import { UserContext } from 'hooks/UserContext';
import PrivateRoute from 'views/pages/PrivateRoute';



// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const { user, setUser, isLoading } = useFindUser();

    return (
        
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <NavigationScroll>
                        <UserContext.Provider value={{user, setUser, isLoading}}>
                            <Routes>
                                <Route exact path="/login" element={<AuthLogin3/>}/>
                                <Route path="/register" element={<AuthRegister3/>}/>
                                <MainLayout>   
                                    <PrivateRoute path="/dashboard" element={<Dashboard/>} />
                                    <PrivateRoute path="/dashboard/filter" element={<Filter/>} />
                                    <PrivateRoute path="/dashboard/filter1" element={<Filter2/>} />
                                    <PrivateRoute path="/details" element={<Details/>} />
                                    <PrivateRoute path="/chat" element={<Chat/>} />
                                    <PrivateRoute path="/join" element={<Join/>} />
                                </MainLayout>
                            </Routes>
                        </UserContext.Provider>
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        
    );
};

export default App;
