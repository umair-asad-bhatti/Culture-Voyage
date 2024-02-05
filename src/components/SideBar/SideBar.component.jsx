
import { AddCircle, Home, People, User } from "iconsax-react";
import { SideBarTab } from "../SideBarTab/SideBarTab.jsx";
import { useContext, useState } from "react";
import { useLocation } from 'react-router-dom'
import { UserContext } from "../../context/AuthContext.jsx";
const SideBarComponent = () => {
    const location = useLocation()
    const { user } = useContext(UserContext);
    const [activeTab, setActiveTab] = useState(location.pathname == '/' ? '/' : location.pathname.slice(1))
    console.log(location.pathname);
    return (
        <>
            <div className="w-full px-2 ">
                <div className="mt-4 flex flex-col gap-5 relative  ">
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Home'} to={'/'}>
                        <Home variant={activeTab === '/' ? 'Bold' : 'Outline'} />
                    </SideBarTab>

                    {/* <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Recommended'} to={'/lkj'}>
                        <Like1 variant={activeTab.includes('recommended') ? 'Bold' : 'Outline'} />
                    </SideBarTab> */}
                    <hr className="h-px my-4 bg-gray-400"></hr>
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} to='communities' label={'Communities'}>
                        <People variant={activeTab === 'communities' ? 'Bold' : 'Outline'} />
                    </SideBarTab>
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'create-post'} to={'create-post'}>
                        <AddCircle variant={activeTab === 'create-post' ? 'Bold' : 'Outline'} />
                    </SideBarTab>
                    {/* <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Favourites'} to={'sdf'}>
                        <Star />
                    </SideBarTab> */}
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Profile'} to={`/profile/${user?.uid}`}>
                        <User variant={activeTab.includes('/profile') ? 'Bold' : 'Outline'} />
                    </SideBarTab>
                    <hr className="h-px my-4 bg-gray-400 "></hr>
                </div>
            </div>
        </>
    );
}
export default SideBarComponent;