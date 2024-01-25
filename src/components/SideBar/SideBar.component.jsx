
import { AddCircle, Home, Like1, People, Star } from "iconsax-react";
import { SideBarTab } from "../SideBarTab/SideBarTab.jsx";
import {useState} from "react";
import {useLocation} from 'react-router-dom'
const SideBarComponent = () => {
    const location=useLocation()
    console.log(location.pathname.slice(1))
    const [activeTab,setActiveTab]=useState(location.pathname==='/'?'home':location.pathname.slice(1))

    return (
        <>
            <div className=" w-full px-3 ">
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
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Create Post'}>
                        <AddCircle />
                    </SideBarTab>
                    <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} label={'Favourites'}>
                        <Star />
                    </SideBarTab>
                    <hr className="h-px my-4 bg-gray-400 "></hr>
                </div>
            </div>
        </>
    );
}
export default SideBarComponent;