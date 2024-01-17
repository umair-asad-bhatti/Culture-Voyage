
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/Login.page.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificatioinPage/EmailVerificationPage.jsx";
import AdditionalInformationPage from "./pages/AdditionalInformationPage/AdditionalInformationPage.jsx";
import ForgetPasswordPage from "./pages/ForgetPassword/ForgetPasswordPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";

export default function App() {
  return (
      <Routes>
        <Route path='/login' element={<LoginPage />} exact/>
        <Route path='/register' element={<RegisterPage />} exact/>
        <Route path='/emailverification' element={<EmailVerificationPage />} exact/>
        <Route path='/additionalinformation' element={<AdditionalInformationPage />} exact/>
        <Route path='/forgetpassword' element={<ForgetPasswordPage />} exact />
        <Route path='/home/*' element={<HomePage />} />
      </Routes>
  )
}
