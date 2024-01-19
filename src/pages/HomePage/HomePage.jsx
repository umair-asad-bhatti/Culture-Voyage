import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar.component.jsx';
import { UserContext } from '../../context/AuthContext';
import { Spinner } from "@chakra-ui/react";
import PostCardComponent from "../../components/PostCard/PostCard.Component.jsx";
import SideBarComponent from "../../components/SideBar/SideBar.component.jsx";
import {Route,Routes} from 'react-router-dom'
import { Colors } from "../../constants/Colors.js";
import {useCheckUserInformation} from "../../hooks/useCheckUserInformation.js";



export default function HomePage() {

    const navigation = useNavigate();
    const { user, isLoading } = useContext(UserContext);
    const [isScrolled, setIsScrolled] = useState(false)
    const {checkIsEmailVerified,isAdditionalInformationComplete}= useCheckUserInformation()
    useEffect(() => {
        // Wait for user data to be loaded before redirecting
        // TODO apply following checks in production
        // if (!isLoading && !user)
        //     navigation('/login');
        // else if(!isLoading && !user?.emailVerified)
            // checkIsEmailVerified(user)
        // else if(!isLoading && user && user?.emailVerified)
        //     isAdditionalInformationComplete(user)
    }, [user, isLoading]);

    if(isLoading)
        return <div className={'flex items-center justify-center h-screen w-screen'} size={'lg'}><Spinner color={Colors.accent} /></div>

    const checkIfScrolled = () => {
        const amountScrolled = window.scrollY
        if (amountScrolled > 50) {
            setIsScrolled(true)
        } else
            setIsScrolled(false)
    }
    window.addEventListener('scroll', checkIfScrolled)

    return (
                    <>
                        <div className="sticky top-0  z-10 shadow-sm text-dark  flex justify-center">
                            <div style={{ background: isScrolled ? Colors.softGrey : Colors.primary }} className='w-screen xl:w-[1500px] justify-center px-4'>
                                <Navbar />
                            </div>
                        </div>
                        <div className='flex justify-center items-center'>
                            <div className='w-screen  min-h-screen xl:w-[1500px] flex'>
                                <div className='w-[250px]  lg:block hidden '>
                                    <div className='fixed  z-50 w-[250px] '>
                                        <SideBarComponent />
                                    </div>
                                </div>
                                <div className='lg:w-3/5 flex flex-col gap-4 p-4'>
                                    <Routes>
                                        <Route exact path={'/'} element={<PostCardComponent/>} />
                                    </Routes>
                                </div>
                                <div className='w-1/5 p-4 md:block hidden  shadow-lg'>
                                    <div className='fixed z-50'>
                                        <h1>Visited Communities</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>

    );
}
