import {db} from "../../firebase/Firebase.js";
import {collection, getDocs, query, where} from "firebase/firestore";


export const getDocIfExists=async (collectionName,docField,operator,toBeComparedField)=>{
    const CommunityRef=collection(db,collectionName)
    const q=query(CommunityRef,where(docField,operator,toBeComparedField))
    const querySnapshot=await getDocs(q)
    return querySnapshot.size > 0;
}

