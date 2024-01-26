import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useFetchCommunityDetails} from "../../hooks/useFetchCommunityDetails.js";
import {UploadImage} from "../../components/Upload Image/UploadImage.jsx";
export const CommunityDetailPage=()=>{
    const {id}=useParams()
    const {CommunityData,isFetching,getCommunityDetails}=useFetchCommunityDetails();
    const [Banner,setBanner] = useState(null)

    useEffect(()=>{
      getCommunityDetails(id)
    },[])
    if(isFetching)
        return <h1>Loading....</h1>
    if(!isFetching && !CommunityData)
        return <h1>Error occurred</h1>
    //implement the edit community functionality
    return <>
                <div className={'w-full relative  rounded-lg shadow-lg h-[300px]'}>
                    {
                        CommunityData['Banner URL']?
                            <img className={'object-cover rounded-lg w-full h-full'} src={CommunityData['Banner URL']} alt=""/>

                           :
                           <UploadImage fullSize={true} imageAsset={Banner} setImageAsset={setBanner}/>
                    }
                        <img className={'w-[200px] bg-white border border-white h-[200px] object-cover rounded-full absolute -bottom-20 right-20'} src={CommunityData['Community Logo URL']} alt=""/>
                </div>
                <div className={'w-full dark:text-textPrimary text-textSecondary'}>
                    <h1 className={'font-extrabold  text-2xl text-accent my-2'}>{CommunityData['Community Name']}</h1>
                    <h1><span className={'font-extrabold my-2'}>Created At :</span>{CommunityData['Created At']}</h1>
                    <h1 className={'font-extrabold mt-2'}>Description: </h1>
                    <h1 className={'dark:text-textPrimary text-textSecondary'}>{CommunityData['Small Description']}</h1>
                    <h1 className={'my-2'}><span className={'font-extrabold '}>Community Genre : </span>{CommunityData['Community Type']}</h1>
                    <div className={'flex items-center justify-start gap-1 flex-wrap'}>
                        <h1 className={'font-extrabold'}>Related Tags</h1>
                        <div>
                        {
                            CommunityData['Tags']?.map((tag)=>{
                                return <span  key={tag} className={`border-none mx-1 p-4 badge bg-accent text-white`}>{tag}</span>
                            })
                        }
                        </div>
                    </div>
                    <span className={'divider '}></span>
                    <div>
                        <h1>Rules</h1>
                        <h1>Guidelines</h1>
                    </div>
                    <span className={'divider'}></span>
                </div>
        </>

}