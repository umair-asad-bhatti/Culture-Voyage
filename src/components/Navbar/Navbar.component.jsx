import { Link } from "react-router-dom";
import InputField from "../Inputfield/InputField.component";
import { useState, useContext, useEffect } from "react";
import { SearchNormal, HambergerMenu, CloseCircle } from "iconsax-react";
import Logo from "../../assets/Logo.png";
import { UserContext } from "../../context/AuthContext";
import { getUserData } from "../../utils/Firebase Utils Functions";
import { auth } from "../../firebase/Firebase";
import { signOut } from "firebase/auth";
import Button from '../Button/Button.component'
import SideBarComponent from "../SideBar/SideBar.component";
import { Colors } from "../../constants/Colors";
import { AppRoutes } from "../../constants/AppRoutes";
export default function Navbar() {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [userData, setUserData] = useState();
  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const data = await getUserData(user.uid);
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center lg:order-none order-last ">
        <h2 className="ml-3 dark:text-accent text-blAccent font-bold text-2xl">
          Culture Voyage
        </h2>
      </div>
      <div
        className="lg:hidden block"
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        <HambergerMenu size="32" className="dark:text-primary text-secondary" />
      </div>
      <div className="items-center   lg:flex hidden gap-4">
        <div className="w-[300px]">
          <InputField type="text" placeholder="Search" value={search} setValue={setSearch}>
            <SearchNormal className={"dark:text-primary text-textPrimary"} />
          </InputField>
        </div>
        <div className="w-[100px]">
          <Button onClickHandler={signout}>Logout</Button>
        </div>
        <Link to={`${AppRoutes.profile.baseRoute}/${user?.uid}`}>
          <img
            style={{ width: 50, height: 50 }}
            src={userData?.Avatar || Logo}
            alt="Profile"
            className="rounded-full object-cover cursor-pointer"
          />
        </Link>
      </div>

      {/* Sidebar for mobile breakpoint */}
      {toggleSidebar && (
        <div className="z-50 h-[100vh] animate-slide-in lg:hidden fixed gap-4 dark:bg-blue-darkmd bg-blue-lightmd right-0 transition-all duration-300 ease-in-out top-0 w-4/5 f-full bg-primary dark:bg-secondary overflow-hidden shadow-md">
          <div className="flex justify-end items-center p-8">
            <CloseCircle onClick={() => setToggleSidebar(!toggleSidebar)} size="32" color={Colors.warning} />
          </div>
          <SideBarComponent />
        </div>
      )}
    </div>
  );
}
