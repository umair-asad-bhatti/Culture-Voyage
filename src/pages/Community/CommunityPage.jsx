import  {useContext, useEffect} from "react";
import {CreateCommunity} from "../../components/CreateCommunity.jsx";
import {UserContext} from "../../context/AuthContext.jsx";
import {useFetchUserCreatedCommunities} from "../../hooks/useFetchUserCreatedCommunities.js";
import {useFetchAllCommunities} from "../../hooks/useFetchAllCommunities.js";
import {CommunityListing} from "../../components/CommunityListing/CommunityListing.jsx";

export const CommunityPage = () => {

  const { user } = useContext(UserContext);
  const {communities,fetchAllCommunities,isFetchingAllCommunities}=useFetchAllCommunities();
  const {fetchUserCreatedCommunities,userCreatedCommunities,isFetchingUserCreatedCommunities}=useFetchUserCreatedCommunities();
  useEffect(() => {

          fetchUserCreatedCommunities(user.uid); //fetch all communities created by user
         fetchAllCommunities(user.uid);//except user created communities

  }, []);
  return (
    <>
          <CreateCommunity />
          <p className="py-2 text-center font-bold text-lg dark:text-primary">Your Own Community</p>
          <CommunityListing  communities={userCreatedCommunities} isFetching={isFetchingUserCreatedCommunities}/>
          <p className="py-2 text-center font-bold text-lg dark:text-primary">All Communities</p>
          <CommunityListing  communities={communities} isFetching={isFetchingAllCommunities}/>
    </>
  );
};
