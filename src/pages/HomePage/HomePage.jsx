import { signOut } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/Firebase';
export default function HomePage() {
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
    const singout = () => {
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
                    <div>
                        <div>{user?.email}</div>
                        <button
                            onClick={singout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                        >
                            Logout
                        </button >
                    </div>
                )
            )}
        </>
    );
}
