import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/Firebase";
import NaviagateLink from "../../components/NavigateLink/NaviagateLink.component";
import Logo from "../../assets/Logo.png";
import InputField from "../../components/Inputfield/InputField.component";
import {
  SidebarLeft,
  Star,
  Home,
  People,
  Like1,
  User,
  Setting,
  AddCircle,
  SearchNormal,
} from "iconsax-react";

export default function MainHomePage() {
  const [search, setSearch] = useState("");


  // here will make arrray to store sidebar menu items and there links and 
  // will map this so avoid code duplication

  return (
    <>
      <div className="sticky top-0 z-10 shadow-sm text-dark h-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img className="ml-3" src={Logo} width={80} height={80} />
            <div className="ml-3 text-accent font-bold text-2xl">
              Culture Voyage
            </div>
          </div>
          <div className="flex items-center mr-3 w-96">
            <InputField type="search" value={search} setValue={setSearch}>
              <SearchNormal color="#808998" />
            </InputField>
          </div>
        </div>
      </div>

      <div className="flex flex-row ">
        <div className=" bg-primary min-h-screen w-1/5 px-3 shadow-lg ">
          {/* <div className="py-3  flex justify-end">
            <SidebarLeft color="#000000" className="cursor-pointer" />
          </div> */}
          <div className="mt-4 flex flex-col gap-5 relative  ">
            <Link
              to={""}
              className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl  hover:bg-accent "
            >
              <Home />
              <h2>Home</h2>
            </Link>
            <Link
              to={""}
              className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-green-500"
            >
              <Like1 />
              <h2>Recommended</h2>
            </Link>
            <hr className="h-px my-4 bg-gray-400 "></hr>
            <Link
              to={""}
              className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-green-500"
            >
              <People />
              <h2>Communities</h2>
            </Link>
            <Link
              to={""}
              className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-green-500"
            >
              <AddCircle />
              <h2>Create Post</h2>
            </Link>
            <Link
              to={""}
              className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-green-500"
            >
              <Star />
              <h2>Favourites</h2>
            </Link>
            <hr className="h-px my-4 bg-gray-400 "></hr>
            <Link
              to={""}
              className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-green-500"
            >
              <User />
              <h2>Profile</h2>
            </Link>
            <Link
              to={""}
              className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-green-500"
            >
              <Setting />
              <h2>Settings</h2>
            </Link>
          </div>
        </div>
        {/* Scrolling Area */}
        
        <div className=" w-3/5 ">Scrolling Area</div>
        {/* Right Sider Bar  */}
        <div className="shadow-lg w-1/5">visited Communities</div>
      </div>
    </>
  );
}
