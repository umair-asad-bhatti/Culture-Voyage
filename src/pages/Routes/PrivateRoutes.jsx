import {Navigate, Outlet} from 'react-router-dom'
import {UserContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import HomePage from "../HomePage/HomePage.jsx";

export const PrivateRoutes=()=>{
    const {user,isLoading}=useContext(UserContext)
    //fetch user state
    return (!isLoading && user)?<Outlet/>:<Navigate to={'/login'}/>
}