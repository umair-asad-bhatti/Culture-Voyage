import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar.component.jsx';
import { UserContext } from '../../context/AuthContext';
import PostCardComponent from "../../components/PostCard/PostCard.Component.jsx";
import SideBarComponent from "../../components/SideBar/SideBar.component.jsx";
import { Route, Routes } from 'react-router-dom'
import { useCheckUserInformation } from "../../hooks/useCheckUserInformation.js";
import { CommunityPage } from "../Community/CommunityPage.jsx";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner.jsx";


export default function HomePage() {

    const navigation = useNavigate();
    const { user, isLoading } = useContext(UserContext);
    // const [isScrolled, setIsScrolled] = useState(false)
    // const { checkIsEmailVerified, isAdditionalInformationComplete } = useCheckUserInformation()
    useEffect(() => {
        // Wait for user data to be loaded before redirecting
        // TODO apply following checks in production
        if (!isLoading && !user)
            navigation('/login');
        // else if(!isLoading && !user?.emailVerified)
        // checkIsEmailVerified(user)
        // else if(!isLoading && user && user?.emailVerified)
        //     isAdditionalInformationComplete(user)
    }, [user, isLoading, navigation]);

    if (isLoading)
        return <div className={'flex items-center justify-center h-screen w-screen'}><LoadingSpinner size={'lg'} /></div>

    // const checkIfScrolled = () => {
    //     const amountScrolled = window.scrollY
    //     if (amountScrolled > 50) {
    //         setIsScrolled(true)
    //     } else
    //         setIsScrolled(false)
    // }
    // window.addEventListener('scroll', checkIfScrolled)

    return (
        <>
            <div className="sticky top-0  z-10 shadow-sm text-dark  flex justify-center">
                <div className='w-screen xl:w-[1500px] justify-center px-4 dark:bg-secondary bg-white '>
                    <Navbar />
                </div>
            </div>
            <div className='flex justify-center items-center dark:bg-secondary'>
                <div className='w-screen  min-h-screen xl:w-[1500px] flex'>
                    <div className='w-[250px]  lg:block hidden '>
                        <div className='fixed  z-50 w-[250px] '>
                            <SideBarComponent />
                        </div>
                    </div>
                    <div className='lg:w-3/5 flex flex-col gap-4 p-4'>
                        <Routes>
                            <Route exact path={'/'} element={<PostCardComponent />} />
                            <Route path={'/community'} element={<CommunityPage />} />
                        </Routes>
                    </div>
                    <div className='w-1/5 p-4 md:block hidden  shadow-lg'>
                        <div className='fixed z-50'>
                            <h1 className='dark:text-primary '>Visited Communities</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
