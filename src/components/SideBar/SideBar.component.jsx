
import { AddCircle, Home, People, User } from "iconsax-react";
import { SideBarTab } from "../SideBarTab/SideBarTab.jsx";
import { useContext, useState } from "react";
import { useLocation } from 'react-router-dom'
import { UserContext } from "../../context/AuthContext.jsx";
import pen from '../../assets/sidebar_icons/pen.png'
import home from '../../assets/sidebar_icons/home.png'
import community from '../../assets/sidebar_icons/community.png'
import profile from '../../assets/sidebar_icons/profile.png'
import { CreateCommunity } from "../CreateCommunity.jsx";
const SideBarComponent = () => {
    const location = useLocation()
    const { user } = useContext(UserContext);
    const [activeTab, setActiveTab] = useState(location.pathname === '/' ? '/' : location.pathname.slice(1))

    return (
        <>
            <div className="w-full px-2 ">
                <div className="flex flex-col gap-5 relative  ">
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Home'} to={'/'}>
                        <img src={home} width={40} height={40} className="rounded-full" />

                        {/* <Home variant={activeTab === '/' ? 'Bold' : 'Outline'} /> */}
                    </SideBarTab>

                    {/* <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Recommended'} to={'/lkj'}>
                        <Like1 variant={activeTab.includes('recommended') ? 'Bold' : 'Outline'} />
                    </SideBarTab> */}

                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} to='communities' label={'Communities'}>
                        <img src={community} width={40} height={40} className="rounded-full" />

                        {/* <People variant={activeTab === 'communities' ? 'Bold' : 'Outline'} /> */}
                    </SideBarTab>
                    <hr />
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Create Post'} to={'create-post'}>
                        <img src={pen} width={40} height={40} className="rounded-full" />
                        {/* <AddCircle variant={activeTab === 'create-post' ? 'Bold' : 'Outline'} color="#F1BC19" /> */}
                    </SideBarTab>
                    {/* <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Favourites'} to={'sdf'}>
                        <Star />
                    </SideBarTab> */}
                    <CreateCommunity renderButton={true} />
                    <hr />
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Profile'} to={`profile/${user?.uid}`}>
                        {/* <User variant={activeTab === (`profile/${user?.uid}`) ? 'Bold' : 'Outline'} /> */}
                        <img src={profile} width={40} height={40} className="rounded-full" />
                    </SideBarTab>
                </div>
            </div>
        </>
    );
}
export default SideBarComponent;