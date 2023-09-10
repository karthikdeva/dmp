import React,{useState, useEffect} from 'react';
import { useLocation, Route, Routes} from 'react-router-dom';
import { useSelector } from "react-redux";

import SidebarMenu from "./components/SidebarMenu";
import { PrivateRoute } from './PrivateRoute.jsx';
import Signin from "./pages/signin";
import Home from "./pages/home"
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/profile";

import Citizen from './pages/citizen';
import Settings from './pages/settings';

const App = () => {
    const defaultTheme = 'theme-light';
    const [activeTheme, setActiveTheme]= useState(defaultTheme);
    const location = useLocation();
    const sidebarStatus = useSelector(state => state?.sidebar.sidebarStatus);
    const defaultClassName = 'container-fluid g-0';
    const className = sidebarStatus ? `${defaultClassName} sidebar-active` : defaultClassName;
    const containerClassName = location.pathname !== "/signin"? "right-container": "flex"
    useEffect(() => {
        setActiveTheme(defaultTheme);
   },[])
    return (
        <div className={className} theme={activeTheme}>
            {location.pathname !== "/signin" && <SidebarMenu />}
            <div className={containerClassName}>
                <div className="inner-container  container-fluid">
                    <Routes>
                        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}  />
                        <Route path="/signin" element={<Signin/>} />
                        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}  />
                        <Route path="/Citizens" element={<PrivateRoute><Citizen/></PrivateRoute>} />
                        <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>} />
                        <Route path="*" element={<PrivateRoute><PageNotFound/></PrivateRoute>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App;