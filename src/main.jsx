import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage/Login.page.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import EmailVerificationPage from './pages/EmailVerificatioinPage/EmailVerificationPage.jsx';
import AdditionalInformationPage from './pages/AdditionalInformationPage/AdditionalInformationPage.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/emailverification' element={<EmailVerificationPage />} />
      <Route path='/additionalinformation' element={<AdditionalInformationPage />} />

    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
