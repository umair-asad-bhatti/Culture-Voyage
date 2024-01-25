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


