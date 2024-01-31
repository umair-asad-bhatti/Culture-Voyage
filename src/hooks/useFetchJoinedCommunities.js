import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../firebase/Firebase.js";
import { getUserData } from "../utils/Firebase Utils Functions/index.js";
import { useState, useEffect } from 'react';

export const useFetchJoinedCommunities = () => {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [isFetchingJoinedCommunities, setIsFetchingJoinedCommunities] = useState(false);

  const fetchJoinedCommunities = async (userId) => {
    setIsFetchingJoinedCommunities(true);

    const joinedCommunitiesIds = await getUserData(userId, 'Joined Communities') ?? [];
    
    if (joinedCommunitiesIds) {
      try {
        const data = [];
        const communityDocRef = query(collection(db, 'Communities'), where(documentId(), 'in', joinedCommunitiesIds));
        const communityDocsSnapshot = await getDocs(communityDocRef);

        communityDocsSnapshot.forEach((doc) => {
          if (doc.exists()) {
            const communityData = doc.data();
            data.push({
              id: doc.id,
              communityName: communityData["Community Name"],
              smallDescription: communityData["Small Description"],
              communityType: communityData["Community Type"],
              communityLogoUrl: communityData["Community Logo URL"],
              createdAt: communityData['Created At'],
              createdBy: communityData['Created By'],
              members:communityData['Members']
            });
          }
        });

        setJoinedCommunities(data);
      } catch (error) {
        console.log("Error fetching joined community data:", error.message);
      } finally {
        setIsFetchingJoinedCommunities(false);
      }
    }
  };

 
  return { joinedCommunities, fetchJoinedCommunities, isFetchingJoinedCommunities };
};
