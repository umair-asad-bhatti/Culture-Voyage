import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useFetchCommunityDetails} from "../../hooks/useFetchCommunityDetails.js";
export const CommunityDetailPage=()=>{
    const {id}=useParams()
    const {CommunityData,isFetching,getCommunityDetails}=useFetchCommunityDetails();
    useEffect(()=>{
      getCommunityDetails(id)
    },[])
    if(isFetching)
        return <h1>Loading....</h1>
    if(!isFetching && !CommunityData)
        return <h1>Error occurred</h1>

    return <div>
        <img className={'shadow-xl w-[200px] h-[200px] object-cover rounded-full'} src={`${CommunityData['Community Logo URL']}`} alt=""/>
        <h1>{CommunityData['Community Name']}</h1>
        <h1>{CommunityData['Small Description']}</h1>
        <h1>{CommunityData['Created At']}</h1>
        <h1>{CommunityData['Community Type']}</h1>
        <h1>Tags</h1>
        {

            CommunityData['Tags']?.map(tag=>{
                return <span key={tag} className={'mx-4'}>{tag}</span>
            })
        }
    </div>

}