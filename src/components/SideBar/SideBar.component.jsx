import { Link } from "react-router-dom";
import { AddCircle, Home, Like1, People, Star } from "iconsax-react";

const SideBarComponent = () => {
    return (
        <>
            <div className=" w-full px-3 ">
                <div className="mt-4 flex flex-col gap-5 relative  ">
                    <Link
                        to={"/home"}
                        className="text-textDark hover:text-white p-4 flex items-center gap-3 bg-gray-100 rounded-xl  hover:bg-accent "
                    >
                        <Home />
                        <h2>Home</h2>
                    </Link>
                    <Link
                        to={""}
                        className="text-textDark w-auto p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-accent"
                    >
                        <Like1 />
                        <h2>Recommended</h2>
                    </Link>
                    <hr className="h-px my-4 bg-gray-400 "></hr>
                    <Link
                        to={""}
                        className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-accent"
                    >
                        <People />
                        <h2>Communities</h2>
                    </Link>
                    <Link
                        to={""}
                        className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-accent"
                    >
                        <AddCircle />
                        <h2>Create Post</h2>
                    </Link>
                    <Link
                        to={""}
                        className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-accent"
                    >
                        <Star />
                        <h2>Favourites</h2>
                    </Link>
                    <hr className="h-px my-4 bg-gray-400 "></hr>
                </div>
            </div>
        </>
    );
}
export default SideBarComponent;