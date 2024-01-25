
import { Route, Routes } from "react-router-dom";
import LoginPage from "../LoginPage/Login.page.jsx";
import RegisterPage from "../RegisterPage/RegisterPage.jsx";
import EmailVerificationPage from "../EmailVerificatioinPage/EmailVerificationPage.jsx";
import AdditionalInformationPage from "../AdditionalInformationPage/AdditionalInformationPage.jsx";
import ForgetPasswordPage from "../ForgetPassword/ForgetPasswordPage.jsx";
import HomePage from "../HomePage/HomePage.jsx";
import PostCardComponent from "../../components/PostCard/PostCard.Component.jsx";
import {CommunityPage} from "../Community/CommunityPage.jsx";
import {PostPage} from "../PostPage/PostPage.jsx";
import {PrivateRoutes} from "./PrivateRoutes.jsx";
export default function RoutesContainer() {

    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} exact />
            <Route path='/register' element={<RegisterPage />} exact />
            <Route path='/forgetpassword' element={<ForgetPasswordPage />} exact />
            <Route path='/*' element={<PrivateRoutes />} >
                <Route  path={''} element={<HomePage/>}>
                    <Route exact path={''} element={<PostPage />} />
                    <Route exact path={'communities'} element={<CommunityPage />} />
                </Route>
                <Route path='additionalinformation' element={<AdditionalInformationPage />} exact />
                <Route path='emailverification' element={<EmailVerificationPage />} exact />
            </Route>
        </Routes>
    )
}
