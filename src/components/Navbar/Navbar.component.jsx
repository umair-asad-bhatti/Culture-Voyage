import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import InputField from "../Inputfield/InputField.component";
import { useState } from "react";
import { SearchNormal, HambergerMenu } from "iconsax-react";
export default function Navbar() {
    const [search, setSearch] = useState("");
    const [toggleSidebar, settoggleSidebar] = useState(false)

    const signout = () => {
        signOut(auth).then(() => {
            console.log('logged out');
        }).catch((error) => {
            alert(error);
        });
    }
    return (
        <div className={'flex items-center justify-between py-2'}>
            <div className="flex items-center lg:order-none order-last">
                {/* <img className="ml-3" src={Logo} width={80} height={80} /> */}
                <div className="ml-3 text-accent font-bold text-2xl">
                    Culture Voyage
                </div>
            </div>
            <div className="lg:hidden block" onClick={() => settoggleSidebar(!toggleSidebar)}>
                <HambergerMenu
                    size="32"
                    color="black"
                />
            </div>
            <div className="items-center mr-3 w-96 gap-2 lg:flex hidden">
                <InputField type="search" value={search} setValue={setSearch}>
                    <SearchNormal className={'dark:text-primary text-textPrimary'} />
                </InputField>
                <button
                    onClick={signout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-error focus:outline-none focus:shadow-outline-red"
                >
                    Logout
                </button >
            </div>

            {/* sidebar for mobile breakpoint */}
            {
                toggleSidebar && <div className='z-50 h-[100vh] animate-slide-in lg:hidden fixed gap-4 dark:bg-blue-darkmd bg-blue-lightmd right-0 transition-all duration-300 ease-in-out top-0 w-4/5 f-full bg-primary overflow-hidden shadow-md '>
                    mobile
                </div>
            }
        </div>
    )
}
