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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/emailverification' element={<EmailVerificationPage />} />
      <Route path='/additionalinformation' element={<AdditionalInformationPage />} />
      <Route path='/forgetpassword' element={<ForgetPasswordPage />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ChakraProvider>
            <AuthProvider>
              {/*<RouterProvider router={router} />*/}
                <BrowserRouter >
                    <Routes>
                        <Route path='/' element={<App />} exact/>
                        <Route path='/login' element={<LoginPage />} exact/>
                        <Route path='/register' element={<RegisterPage />} exact/>
                        <Route path='/home/*' element={<HomePage />} exact />
                        <Route path='/emailverification' element={<EmailVerificationPage />} exact/>
                        <Route path='/additionalinformation' element={<AdditionalInformationPage />} exact/>
                        <Route path='/forgetpassword' element={<ForgetPasswordPage />} exact />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
      </ChakraProvider>
  </React.StrictMode>,
)
