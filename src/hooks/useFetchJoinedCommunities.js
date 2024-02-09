import { collection, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../firebase/Firebase.js";
import { getUserData } from "../utils/Firebase Utils Functions/index.js";
import { useState } from 'react';
import { CommunityDto } from "../dto/CommunityDto.js";

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
            const community_dto = new CommunityDto(communityData)
            data.push({ id: doc.id, ...community_dto });
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


  return { joinedCommunities, fetchJoinedCommunities, isFetchingJoinedCommunities, setJoinedCommunities };
};
