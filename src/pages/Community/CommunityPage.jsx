import {CreateCommunity} from "../../components/CreateCommunity.jsx";
import {useEffect} from "react";
import {UserContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

export const CommunityPage = () => {
    const navigate=useNavigate()
    const {user,isLoading}=useContext(UserContext)
    useEffect(() => {
        // Wait for user data to be loaded before redirecting
        // TODO apply following checks in production
        //
        if(!isLoading && !user)
            navigate('/login')
        // else if(!isLoading && !user?.emailVerified)
        // checkIsEmailVerified(user)
        // else if(!isLoading && user && user?.emailVerified)
        //     isAdditionalInformationComplete(user)
    }, [user, isLoading]);
  
  return (
      <>
      <CreateCommunity/>
      </>
  );
};
