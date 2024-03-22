import { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar.component.jsx';
import { UserContext } from '../../context/AuthContext';
import SideBarComponent from "../../components/SideBar/SideBar.component.jsx";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import { CommunityPage } from "../Community/CommunityPage.jsx";
import { PostPage } from "../PostPage/PostPage.jsx";
import { PrivateRoutes } from "../Routes/PrivateRoutes.jsx";
import { PostDetailPage } from "../PostDetailPage/PostDetailPage.jsx";
import { CommunityDetailPage } from "../CommunityDetailPage/CommunityDetailPage.jsx";
import { UserProfile } from '../Profile/UserProfile.jsx';
import { CreatePost } from '../CreatePost/CreatePost.jsx'
import { AppRoutes } from '../../constants/AppRoutes.js';
import { EditProfilePage } from '../EditProfile/EditProfilePage.jsx';
import { EditPost } from '../EditPost/EditPost.jsx';
import { CommunityChatPage } from '../CommunityChatPage/CommunityChatPage.jsx';



export default function HomePage() {
    const { isLoading } = useContext(UserContext);

    if (isLoading)
        return <div className={'flex items-center justify-center h-screen w-screen dark:bg-secondary bg-primary'}>
            <div className='w-20 h-20'><LoadingSpinner /></div>
        </div>
    return (
        <>
            <div className="sticky top-0  z-10    flex justify-center">
                <div className='w-screen xl:w-[1500px] justify-center px-4 bg-primary dark:bg-secondary'>
                    <Navbar />
                </div>
            </div>
            <div className='flex justify-center items-center dark:bg-secondary'>
                <div className='w-screen  min-h-screen xl:w-[1500px] flex '>
                    <div className=' lg:block hidden dark:bg-transparent '>
                        <div className='py-2 h-[80%] dark:bg-transparent my-2 rounded-lg z-50 min-w-[250px]'>
                            <div className='fixed'>
                                <SideBarComponent />
                            </div>
                        </div>
                    </div>
                    <div className='w-full bg-gray-100 dark:bg-transparent flex flex-col gap-4 md:p-4 p-1'>
                        <Routes>
                            <Route element={<PrivateRoutes />}>
                                <Route exact path={AppRoutes.home.route} element={<PostPage />} />
                                <Route exact path={AppRoutes.communities.route} element={<CommunityPage />} />
                                <Route exact path={AppRoutes.postDetailPage.route} element={<PostDetailPage />} />
                                <Route exact path={AppRoutes.communityDetailPage.route} element={<CommunityDetailPage />} />
                                <Route exact path={AppRoutes.profile.route} element={<UserProfile />} />
                                <Route exact path={AppRoutes.createPost.route} element={<CreatePost />} />
                                <Route exact path={AppRoutes.editProfile.route} element={<EditProfilePage />} />
                                <Route exact path={AppRoutes.editPost.route} element={<EditPost />} />
                                <Route exact path={AppRoutes.communityChatPage.route} element={<CommunityChatPage />} />
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
