
import { AddCircle, Home, Like1, People, Star, User } from "iconsax-react";
import { SideBarTab } from "../SideBarTab/SideBarTab.jsx";
import { useContext, useState } from "react";
import { useLocation } from 'react-router-dom'
import { UserContext } from "../../context/AuthContext.jsx";

const SideBarComponent = () => {
    const location = useLocation()
    const { user } = useContext(UserContext);
    const [activeTab, setActiveTab] = useState(location.pathname === '/' ? 'home' : location.pathname.slice(1))

    return (
        <>
            <div className="w-full px-2 ">
                <div className="mt-4 flex flex-col gap-5 relative  ">
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Home'} to={'/'}>
                        <Home />
                    </SideBarTab>

                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Recommended'}>
                        <Like1 />
                    </SideBarTab>
                    <hr className="h-px my-4 bg-gray-400"></hr>
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} to='communities' label={'Communities'}>
                        <People />
                    </SideBarTab>
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Create Post'} to={'create-post'}>
                        <AddCircle />
                    </SideBarTab>
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Favourites'}>
                        <Star />
                    </SideBarTab>
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Profile'} to={`/profile/${user?.uid}`}>
                        <User />
                    </SideBarTab>
                    <hr className="h-px my-4 bg-gray-400 "></hr>
                </div>
            </div>
        </>
    );
}
export default SideBarComponent;