import {collection, documentId, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/Firebase.js";
import {getUserData} from "../utils/Firebase Utils Functions/index.js";
import {useState} from 'react'
export const useFetchUserCreatedCommunities=()=>{
    const [userCreatedCommunities, setUserCreatedCommunities] = useState([]);
    const [isFetchingUserCreatedCommunities , setIsFetchingUserCreatedCommunities] = useState(false);
    const fetchUserCreatedCommunities=async (userId)=>{
        setIsFetchingUserCreatedCommunities(true)
        const userCreatedCommunitiesIds = await getUserData(userId, 'User Created Communities')??[];
        if (userCreatedCommunitiesIds) {
            try {
                const data=[]
                const communityDocRef = query(collection(db,'Communities'),where(documentId(),'in',userCreatedCommunitiesIds))
                const communityDocsSnapshot = await getDocs(communityDocRef);
                communityDocsSnapshot?.forEach(doc=>{
                    if(doc.exists()){
                        const communityData = doc.data();
                        data.push({
                            id:doc.id,
                            communityName: communityData["Community Name"],
                            smallDescription: communityData["Small Description"],
                            communityType: communityData["Community Type"],
                            communityLogoUrl: communityData["Community Logo URL"],
                            createdAt:communityData['Created At'],
                            createdBy:communityData['Created By']
                        });
                    }
                })
                setUserCreatedCommunities(data)
            } catch (error) {
                console.log("Error fetching community data:", error.message);
            }finally {
                setIsFetchingUserCreatedCommunities(false)
            }
        }
    }
    return {userCreatedCommunities,fetchUserCreatedCommunities,isFetchingUserCreatedCommunities}
}