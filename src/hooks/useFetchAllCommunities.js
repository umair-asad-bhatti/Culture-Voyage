import {useState} from 'react'
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase/Firebase.js";
export const useFetchAllCommunities=()=>{
    const [communities, setCommunities] = useState([]);
    const [isFetchingAllCommunities,setIsFetchingAllCommunities]=useState(false)
    const fetchAllCommunities = async (userId) => {
        setIsFetchingAllCommunities(true)
        try {
            const communitiesSnapshot = await getDocs(collection(db, "Communities"));
            const communitiesData = [];

            communitiesSnapshot.forEach((doc) => {
                const communityData = doc.data();
                if (communityData['Created By'] !== userId) {
                    communitiesData.push({
                        id: doc.id,
                        communityName: communityData["Community Name"],
                        smallDescription: communityData["Small Description"],
                        communityType: communityData["Community Type"],
                        communityLogoUrl: communityData["Community Logo URL"],
                        createdAt:communityData['Created At'],
                        createdBy:communityData['Created By'],
                        members:communityData['Members']
                    });
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

    return {fetchAllCommunities,communities,isFetchingAllCommunities}
}