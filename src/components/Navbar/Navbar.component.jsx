import { Link } from "react-router-dom";
import { auth } from "../../firebase/Firebase";
import InputField from "../Inputfield/InputField.component";
import { useState, useContext, useEffect } from "react";
import { SearchNormal, HambergerMenu } from "iconsax-react";
import Logo from "../../assets/Logo.png";
import { UserContext } from "../../context/AuthContext";
import { getUserData } from "../../utils/Firebase Utils Functions";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [userData, setUserData] = useState();

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
      <div className="flex items-center lg:order-none order-last">
        <div className="ml-3 text-accent font-bold text-2xl">
          Culture Voyage
        </div>
      </div>
      <div
        className="lg:hidden block"
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        <HambergerMenu size="32" color="black" />
      </div>
      <div className="items-center mr-3 w-96 gap-2 lg:flex hidden">
        <InputField type="search" value={search} setValue={setSearch}>
          <SearchNormal className={"dark:text-primary text-textPrimary"} />
        </InputField>
        <Link to="/profile">
          <img
            src={userData?.Avatar || Logo}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover cursor-pointer"
          />
        </Link>
      </div>

      {/* Sidebar for mobile breakpoint */}
      {toggleSidebar && (
        <div className="z-50 h-[100vh] animate-slide-in lg:hidden fixed gap-4 dark:bg-blue-darkmd bg-blue-lightmd right-0 transition-all duration-300 ease-in-out top-0 w-4/5 f-full bg-primary overflow-hidden shadow-md">
          {/* Add your mobile sidebar content here */}
        </div>
      )}
    </div>
  );
}
