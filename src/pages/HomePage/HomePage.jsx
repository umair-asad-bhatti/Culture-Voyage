import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar.component.jsx';
import { UserContext } from '../../context/AuthContext';
import { Spinner } from "@chakra-ui/react";
import PostCardComponent from "../../components/PostCard/PostCard.Component.jsx";
import SideBarComponent from "../../components/SideBar/SideBar.component.jsx";
import {Route,Routes} from 'react-router-dom'
import { Colors } from "../../constants/Colors.js";
// import { SplitScreenComponent } from '../../components/SplitScreen/SplitScreen.component.jsx';
export default function HomePage() {

    const navigation = useNavigate();
    const { user, isLoading } = useContext(UserContext);
    const [isScrolled, setIsScrolled] = useState(false)
    useEffect(() => {

        // Wait for user data to be loaded before redirecting
        if (!isLoading) {
            if (user === null) {
                navigation('/login');
            } else if (!user.emailVerified) {
                navigation('/emailverification');
            }
        }
    }, [user, isLoading, navigation]);
    // TODO check if user has completed the profile or not

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
            {isLoading ? (
                // Render a loading indicator if user data is still loading
                <div className={'flex items-center justify-center h-screen w-screen'} size={'lg'}><Spinner color={Colors.accent} /></div>
            ) : (
                user?.emailVerified && (

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
                                        <Route exact path={'/'} element={<PostCardComponent/>}/>
                                        //TODO more routes here
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

                )
            )}

        </>
    );
}
