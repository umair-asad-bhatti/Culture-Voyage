import {db} from "../../firebase/Firebase.js";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";


export const docExistsOrNot=async (collectionName,docField,operator,toBeComparedField)=>{
    const CommunityRef=collection(db,collectionName)
    const q=query(CommunityRef,where(docField,operator,toBeComparedField))
    const querySnapshot=await getDocs(q)
    return querySnapshot.size > 0;
}

export const getUserData=async(userId,dataField=null)=>{
    const querySnapshot=await getDoc(doc(db,'Users',userId))
    const data= querySnapshot.data();
    return dataField?data[dataField]:data
}

export const fetchAllCommunities = async (userId) => {
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
                });
            }
        });

        return communitiesData
    } catch (error) {
        console.error("Error fetching all communities:", error.message);
    }
};
export const fetchUserCreatedCommunities=async (userId)=>{
    const communityId = await getUserData(userId, 'User Created Communities');
    if (communityId) {
        try {
            const communityDocRef = doc(db, "Communities", communityId[0]);
            const communityDocSnap = await getDoc(communityDocRef);
            if (communityDocSnap.exists()) {
                const communityData = communityDocSnap.data();
                return{
                    communityName: communityData["Community Name"],
                    smallDescription: communityData["Small Description"],
                    communityType: communityData["Community Type"],
                    communityLogoUrl: communityData["Community Logo URL"],
                };
            } else {
                console.log("Community data not found in Firestore");
            }
        } catch (error) {
            console.log("Error fetching community data:", error.message);
        }
    }else{
        return "No community found"
    }
}