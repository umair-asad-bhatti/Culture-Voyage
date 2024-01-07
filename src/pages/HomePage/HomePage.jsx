import { signOut } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/Firebase';
import Navbar from '../../components/Navbar/Navbar.component.jsx';
import InputField from "../../components/Inputfield/InputField.component.jsx";

import PostCardComponent from "../../components/PostCard/PostCard.Component.jsx";
import { Spinner } from "@chakra-ui/react";
import { Colors } from "../../constants/Colors.js";
import SideBarComponent from "../../components/SideBar/SideBar.component.jsx";
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
                            <div className='w-screen xl:w-[1500px] flex'>
                                <div className='w-1/5 lg:block hidden'>
                                    <SideBarComponent />
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
                                    visited communities
                                </div>
                            </div>
                        </div>



                    </>

                )
            )}

        </>
    );
}
