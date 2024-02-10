import { useContext } from "react";
import { CreateCommunity } from "../../components/CreateCommunity.jsx";
import { UserContext } from "../../context/AuthContext.jsx";
import { useFetchUserCreatedCommunities } from "../../hooks/useFetchUserCreatedCommunities.js";
import { useFetchAllCommunities } from "../../hooks/useFetchAllCommunities.js";
import { CommunityListing } from "../../components/CommunityListing/CommunityListing.jsx";



export const CommunityPage = () => {

  const { user } = useContext(UserContext);
  const { communities, isFetchingCommunities } = useFetchAllCommunities(user.uid);
  const { userCreatedCommunities, isFetchingUserCreatedCommunities } = useFetchUserCreatedCommunities(user.uid);
  return (
    <div className={'w-full h-full'}>
      <CreateCommunity />
      <p className="py-2 text-center font-bold text-lg dark:text-primary w-full ">Your Own Community</p>
      <CommunityListing communities={userCreatedCommunities} isFetching={isFetchingUserCreatedCommunities} />
      <p className="py-2 text-center font-bold text-lg dark:text-primary my-4">All Communities</p>
      <CommunityListing communities={communities} isFetching={isFetchingCommunities} />
    </div>
  );
};
