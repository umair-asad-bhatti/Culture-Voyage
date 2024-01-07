import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar.component.jsx';
import { UserContext } from '../../context/AuthContext';
import { Spinner } from "@chakra-ui/react";
import PostCardComponent from "../../components/PostCard/PostCard.Component.jsx";
import SideBarComponent from "../../components/SideBar/SideBar.component.jsx";
import { Colors } from "../../constants/Colors.js";
// import { SplitScreenComponent } from '../../components/SplitScreen/SplitScreen.component.jsx';
export default function HomePage() {

    const navigation = useNavigate();
    const { user, isLoading } = useContext(UserContext);

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


    return (
        <>
            {isLoading ? (
                // Render a loading indicator if user data is still loading
                <div className={'flex items-center justify-center h-screen w-screen'} size={'lg'}><Spinner color={Colors.accent} /></div>
            ) : (
                user?.emailVerified && (

                    <>
                        <div className="sticky top-0 py-2 z-10 shadow-sm text-dark bg-primary flex justify-center">
                            <div className='w-screen xl:w-[1500px] justify-center px-4'>
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
                                    <PostCardComponent />
                                    <PostCardComponent />
                                    <PostCardComponent />
                                    <PostCardComponent />
                                    <PostCardComponent />
                                    <PostCardComponent />
                                    <PostCardComponent />
                                    <PostCardComponent />
                                    <PostCardComponent />
                                </div>
                                <div className='w-1/5 p-4 md:block hidden'>
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
