import {useState} from "react";
import {getFirebaseDoc} from "../utils/Firebase Utils Functions/index.js";
export const useFetchCommunityDetails=()=>{
    const [CommunityData,setCommunityData]=useState({})
    const [isFetching,setIsFetching]=useState(false)
    const getCommunityDetails=async (id)=>{
        setIsFetching(true)
        try {
            const data=await getFirebaseDoc("Communities",id)

            setCommunityData(data)
        }catch (error){
            console.log(error.message)
        }finally {
            setIsFetching(false)
        }
    }
    return {getCommunityDetails,isFetching,CommunityData};
}