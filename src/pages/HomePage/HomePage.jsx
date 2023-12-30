import { signOut } from 'firebase/auth';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../context/AuthContext';
import {Link, useNavigate} from "react-router-dom";
import { auth } from '../../firebase/Firebase';
import Logo from "../../assets/Logo.png";
import InputField from "../../components/Inputfield/InputField.component.jsx";
import {AddCircle, Home, Like1, People, SearchNormal, Setting, Star, User} from "iconsax-react";
import PostCardComponent from "../../components/PostCard/PostCard.Component.jsx";
export default function HomePage() {
    const [search, setSearch] = useState("");
    const navigation = useNavigate();
    const { user, isLoading } = useContext(UserContext);

    useEffect(() => {
        // Wait for user data to be loaded before redirecting
        if (!isLoading) {
            if (user === null) {
                navigation('/login');
            } else if (!user.emailVerified) {
                navigation('/emailverification');
            }
        }
    }, [user, isLoading, navigation]);
    // TODO check if user has completed the profile or not
    const signout = () => {
        signOut(auth).then(() => {
            console.log('logged out');
        }).catch((error) => {
            alert(error);
        });
    }

    return (
        <>
            {isLoading ? (
                // Render a loading indicator if user data is still loading
                <div>Loading...</div>
            ) : (
                user?.emailVerified && (

                    <>
                        <div className=" sticky top-0 z-10 shadow-sm text-dark h-20 bg-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img className="ml-3" src={Logo} width={80} height={80} />
                                    <div className="ml-3 text-accent font-bold text-2xl">
                                        Culture Voyage
                                    </div>
                                </div>
                                <div className="flex items-center mr-3 w-96 gap-2">
                                    <InputField type="search" value={search} setValue={setSearch}>
                                        <SearchNormal color="#808998" />
                                    </InputField>
                                    <button
                                        onClick={signout}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-error focus:outline-none focus:shadow-outline-red"
                                    >
                                        Logout
                                    </button >
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row ">
                            <div className=" bg-primary min-h-screen w-1/5 px-3 shadow-lg lg:block hidden">

                                <div className="mt-4 flex flex-col gap-5 relative  ">
                                    <Link
                                        to={""}
                                        className="text-textDark hover:text-white p-4 flex items-center gap-3 bg-gray-100 rounded-xl  hover:bg-accent "
                                    >
                                        <Home />
                                        <h2>Home</h2>
                                    </Link>
                                    <Link
                                        to={""}
                                        className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-accent"
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
                                    <Link
                                        to={""}
                                        className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-accent"
                                    >
                                        <User />
                                        <h2>Profile</h2>
                                    </Link>
                                    <Link
                                        to={""}
                                        className="text-textDark p-4 flex items-center gap-3 bg-gray-100 rounded-xl hover:bg-accent"
                                    >
                                        <Setting />
                                        <h2>Settings</h2>
                                    </Link>
                                </div>
                            </div>
                            {/* Scrolling Area */}

                            <div className="grid grid-cols-2 gap-2">

                                <PostCardComponent/>
                                <PostCardComponent/>
                            </div>
                            {/* Right Sider Bar  */}
                            <div className="shadow-lg w-1/5">visited Communities</div>
                        </div>
                        <div>


                        </div>
                    </>

                )
            )}
            
        </>
    );
}
