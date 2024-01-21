
import { AddCircle, Home, Like1, People, Star } from "iconsax-react";
import { SideBarTab } from "../SideBarTab/SideBarTab.jsx";

const SideBarComponent = () => {
    return (
        <>
            <div className=" w-full px-3 ">
                <div className="mt-4 flex flex-col gap-5 relative  ">
                    <SideBarTab label={'Home'} to={'/'}>
                        <Home />
                    </SideBarTab>

                    <SideBarTab label={'Recommended'}>
                        <Like1 />
                    </SideBarTab>
                    <hr className="h-px my-4 bg-gray-400"></hr>
                    <SideBarTab to='community' label={'Communities'}>
                        <People />
                    </SideBarTab>
                    <SideBarTab label={'Create Post'}>
                        <AddCircle />
                    </SideBarTab>
                    <SideBarTab label={'Favourites'}>
                        <Star />
                    </SideBarTab>
                    <hr className="h-px my-4 bg-gray-400 "></hr>
                </div>
            </div>
        </>
    );
}
export default SideBarComponent;