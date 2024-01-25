import { useContext } from 'react';
import {Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar.component.jsx';
import { UserContext } from '../../context/AuthContext';
import SideBarComponent from "../../components/SideBar/SideBar.component.jsx";
import { useCheckUserInformation } from "../../hooks/useCheckUserInformation.js";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import {CommunityPage} from "../Community/CommunityPage.jsx";
import {PostPage} from "../PostPage/PostPage.jsx";
import {PrivateRoutes} from "../Routes/PrivateRoutes.jsx";
import {PostDetailPage} from "../PostDetailPage/PostDetailPage.jsx";
import {CommunityDetailPage} from "../CommunityDetailPage/CommunityDetailPage.jsx";


export default function HomePage() {

    const navigation = useNavigate();
    const { user, isLoading } = useContext(UserContext);

    const { checkIsEmailVerified, isAdditionalInformationComplete } = useCheckUserInformation()

    if (isLoading)
        return <div className={'flex items-center justify-center h-screen w-screen'}><LoadingSpinner size={'lg'} /></div>


    return (
        <>
            <div className="sticky top-0  z-10 shadow-sm text-dark dark:bg-secondary  flex justify-center">
                <div className='w-screen  xl:w-[1500px] justify-center px-4 dark:bg-secondary bg-white '>
                    <Navbar />
                </div>
            </div>
            <div className='flex justify-center items-center dark:bg-secondary'>
                <div className='w-screen  min-h-screen xl:w-[1500px] flex'>
                    <div className='w-[20%]  lg:block hidden '>
                        <div className='fixed  z-50 w-[250px] '>
                            <SideBarComponent />
                        </div>
                    </div>
                    <div className='xl:max-w-[80%] lg:w-[80%] md:w-full flex flex-col gap-4 p-4'>
                        <Routes>
                            <Route element={<PrivateRoutes/>}>
                                <Route exact path={''}  element={<PostPage />} />
                                <Route exact path="communities" element={<CommunityPage />} />
                                <Route exact path="post/:id" element={<PostDetailPage />} />
                                <Route exact path="community/:id" element={<CommunityDetailPage />} />
                            </Route>
                        </Routes>
                    </div>
                    {/*<div className='w-1/5 p-4 md:block hidden  shadow-xl'>*/}
                    {/*    <div className='fixed z-50'>*/}
                    {/*        <h1 className='dark:text-primary '>Recommended Communities</h1>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>

    );
}
