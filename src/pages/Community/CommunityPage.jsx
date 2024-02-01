import { useContext, useEffect } from "react";
import { CreateCommunity } from "../../components/CreateCommunity.jsx";
import { UserContext } from "../../context/AuthContext.jsx";
import { useFetchUserCreatedCommunities } from "../../hooks/useFetchUserCreatedCommunities.js";
import { useFetchAllCommunities } from "../../hooks/useFetchAllCommunities.js";
import { CommunityListing } from "../../components/CommunityListing/CommunityListing.jsx";
import { useFetchJoinedCommunities } from "../../hooks/useFetchJoinedCommunities.js";

export const CommunityPage = () => {

  const { user } = useContext(UserContext);
  const { communities, fetchAllCommunities, isFetchingAllCommunities } = useFetchAllCommunities();
  const { fetchUserCreatedCommunities, userCreatedCommunities, isFetchingUserCreatedCommunities } = useFetchUserCreatedCommunities();
  const { joinedCommunities, fetchJoinedCommunities, isFetchingJoinedCommunities } = useFetchJoinedCommunities();
  useEffect(() => {
    fetchUserCreatedCommunities(user.uid); //fetch all communities created by user
    fetchAllCommunities(user.uid);//except user created communities
    fetchJoinedCommunities(user.uid); //fetch joined communities
  }, []);
  return (
    <div className={'w-full'}>
      <CreateCommunity />
      <p className="py-2 text-center font-bold text-lg dark:text-primary">Your Own Community</p>
      <CommunityListing communities={userCreatedCommunities} isFetching={isFetchingUserCreatedCommunities} />
      <p className="py-2 text-center font-bold text-lg dark:text-primary">Joined Communities</p>
      <CommunityListing communities={joinedCommunities} isFetching={isFetchingJoinedCommunities} />
      <p className="py-2 text-center font-bold text-lg dark:text-primary">All Communities</p>
      <CommunityListing communities={communities} isFetching={isFetchingAllCommunities} />
    </div>
  );
};
