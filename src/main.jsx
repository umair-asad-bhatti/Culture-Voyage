import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route, Routes,
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage/Login.page.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import EmailVerificationPage from './pages/EmailVerificatioinPage/EmailVerificationPage.jsx';
import AdditionalInformationPage from './pages/AdditionalInformationPage/AdditionalInformationPage.jsx';
import ForgetPasswordPage from './pages/ForgetPassword/ForgetPasswordPage.jsx';
import { ChakraProvider } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider>
            <AuthProvider>
                <BrowserRouter >
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </ChakraProvider>
    </React.StrictMode>,
)
