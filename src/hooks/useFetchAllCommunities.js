import { useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase.js";
import { CommunityDto } from "../dto/CommunityDto.js";
export const useFetchAllCommunities = () => {
    const [communities, setCommunities] = useState([]);
    const [isFetchingAllCommunities, setIsFetchingAllCommunities] = useState(false)
    const fetchAllCommunities = async (userId) => {
        setIsFetchingAllCommunities(true)
        try {
            const communitiesSnapshot = await getDocs(collection(db, "Communities"));
            const communitiesData = [];
            communitiesSnapshot.forEach((doc) => {
                const communityData = doc.data();
                if (communityData['Created By'] !== userId) {
                    const community_dto = new CommunityDto(communityData)
                    communitiesData.push({ id: doc.id, ...community_dto });
                }
            });

            return setCommunities(communitiesData)
        } catch (error) {
            console.error("Error fetching all communities:", error.message);
        }
        finally {
            setIsFetchingAllCommunities(false)
        }
    };

    return { fetchAllCommunities, communities, isFetchingAllCommunities }
}