import {db} from "../../firebase/Firebase.js";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";


export const docExistsOrNot=async (collectionName,docField,operator,toBeComparedField)=>{
    const CommunityRef=collection(db,collectionName)
    const q=query(CommunityRef,where(docField,operator,toBeComparedField))
    const querySnapshot=await getDocs(q)
    return querySnapshot.size > 0;
}



export const getUserCreatedCommunities=async(userId)=>{
    const querySnapshot=await getDoc(doc(db,'Users',userId))
    const data= querySnapshot.data();
    return data["User Created Communities"]
}
