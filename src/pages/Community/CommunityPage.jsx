import React, { useEffect, useContext, useState } from "react";
import { CreateCommunity } from "../../components/CreateCommunity.jsx";
import { UserContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/Firebase.js";


export const CommunityPage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useContext(UserContext);
  const [communityData, setCommunityData] = useState();
  const [allCommunities, setAllCommunities] = useState([]);

  const fetchCommunityId = async () => {
    try {
      const userDocRef = doc(db, "Users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const communityId = userData["User Created Communities"]?.[0];
        return communityId;
      } else {
        console.log("User data not found in Firestore");
      }
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  const fetchAllCommunities = async () => {
    try {
      const communitiesCollectionRef = collection(db, "Communities");
      const communitiesSnapshot = await getDocs(communitiesCollectionRef);
      const userCreatedCommunityId = await fetchCommunityId();
      const communitiesData = [];

      communitiesSnapshot.forEach((doc) => {
        const communityData = doc.data();
        const communityId = doc.id;

        if (userCreatedCommunityId !== communityId) {
          communitiesData.push({
            id: communityId,
            communityName: communityData["Community Name"],
            smallDescription: communityData["Small Description"],
            communityType: communityData["Community Type"],
            communityLogoUrl: communityData["Community Logo URL"],
          });
        }
      });

      setAllCommunities(communitiesData);
    } catch (error) {
      console.error("Error fetching all communities:", error.message);
    }
  };

  const fetchCommunityData = async () => {
    const communityId = await fetchCommunityId();

    if (communityId) {
      try {
        const communityDocRef = doc(db, "Communities", communityId);
        const communityDocSnap = await getDoc(communityDocRef);

        if (communityDocSnap.exists()) {
          const communityData = communityDocSnap.data();
          setCommunityData({
            communityName: communityData["Community Name"],
            smallDescription: communityData["Small Description"],
            communityType: communityData["Community Type"],
            communityLogoUrl: communityData["Community Logo URL"],
          });
        } else {
          console.log("Community data not found in Firestore");
        }
      } catch (error) {
        console.log("Error fetching community data:", error.message);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading]);

  useEffect(() => {
    fetchCommunityData();
    fetchAllCommunities();
  }, []);

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
