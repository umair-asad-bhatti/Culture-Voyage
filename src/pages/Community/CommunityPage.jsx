import React, {useContext, useEffect, useState} from "react";
import {CreateCommunity} from "../../components/CreateCommunity.jsx";
import {UserContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {fetchUserCreatedCommunities,fetchAllCommunities} from "../../utils/Firebase Utils Functions/index.js";


export const CommunityPage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useContext(UserContext);
  const [communityData, setCommunityData] = useState({});
  const [allCommunities, setAllCommunities] = useState([]);

  useEffect(() => {
    fetchUserCreatedCommunities(user.uid).then((data)=>setCommunityData(data));
    fetchAllCommunities(user.uid).then(data => setAllCommunities(data));
  }, [user.uid]);
  return (
    <>
      <CreateCommunity />
      <p className="py-2 text-center font-bold text-lg dark:text-primary">Your Own Community</p>
      {communityData && (
        <div className="flex items-center ">
        {communityData.communityLogoUrl && (
            <img height={200} width={200}
              src={communityData.communityLogoUrl}
              alt={`Logo for ${communityData.communityName}`}
            />
          )}
          
          <div className="flex-col ">
          <p>Community Name: {communityData.communityName}</p>
          <p>Small Description: {communityData.smallDescription}</p>
          <p>Community Type: {communityData.communityType}</p>
          </div>
        </div>
      )}
      <p className="py-2 text-center font-bold text-lg dark:text-primary">All Communities</p>
      {allCommunities.length > 0 && (
        <div>
          <ul>
            {allCommunities.map((community) => (
              <li key={community.id}>
              {community.communityLogoUrl && (
                  <img height={200} width={200}
                    src={community.communityLogoUrl}
                    alt={`Logo for ${community.communityName}`}
                  />
                )}
                <p>Community Name: {community.communityName}</p>
                <p>Small Description: {community.smallDescription}</p>
                <p>Community Type: {community.communityType}</p>
                
              </li>
            ))}
          </ul>
        </div>
      )}
      {allCommunities.length === 0 && <p>No communities found.</p>}
    </>
  );
};
