import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/Firebase.js';
import { UserContext } from '../../context/AuthContext.jsx';
import Button from '../../components/Button/Button.component.jsx';
import { useFetchCommunityDetails } from "../../hooks/useFetchCommunityDetails.js";
import { UploadImage } from "../../components/Upload Image/UploadImage.jsx";
import useLeaveCommunity from '../../hooks/useLeaveCommunity.js';
import { useUpdateImage } from "../../hooks/useUpdateImage.js";
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner.jsx';

export const CommunityDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { CommunityData, isFetching, getCommunityDetails, setCommunityData } = useFetchCommunityDetails();
  const { leaveCommunity } = useLeaveCommunity();
  const { uploadImageAssetAndUpdateDoc, imageAsset, setImageAsset, isImageUpdating } = useUpdateImage()

  useEffect(() => {
    getCommunityDetails(id)
    const unSub = onSnapshot(doc(db, 'Communities', id), async (doc) => {
      setCommunityData({ id, ...doc.data() });
    })
    return () => unSub()
  }, [])
  if (isFetching)
    return <div className='w-full h-full flex items-center justify-center'><LoadingSpinner size={16} /></div>
  if (!isFetching && !CommunityData)
    return <h1>Error occurred</h1>
  //implement the edit community functionality
  return <>
    <div className={'w-full relative  rounded-lg shadow-lg h-[300px]'}>
      {
        CommunityData['Banner URL'] ?
          <>
            <img className={'object-cover rounded-lg w-full h-full'} src={CommunityData['Banner URL']} alt="" />
            {user.uid === CommunityData['Created By'] && <Button>Change Banner</Button>}
          </>
          :
          CommunityData['Created By'] === user.uid &&
          <UploadImage fullSize={true} imageAsset={imageAsset} setImageAsset={setImageAsset} />

      }
      {/* community logo */}

      <img className={'w-[200px] bg-white border border-white h-[200px] object-cover rounded-full absolute -bottom-20 right-20'} src={CommunityData['Community Logo URL']} alt="" />
    </div>

    <div className={'w-full dark:text-textPrimary text-textSecondary my-8'}>
      <h1 className={'font-extrabold  text-2xl text-accent my-2'}>{CommunityData['Community Name']}</h1>
      <h1><span className={'font-extrabold my-2'}>Created At :</span>{CommunityData['Created At']}</h1>
      <h1 className={'font-extrabold mt-2'}>Description: </h1>
      <h1 className={'dark:text-textPrimary text-textSecondary'}>{CommunityData['Small Description']}</h1>
      <h1 className={'my-2'}><span className={'font-extrabold '}>Community Genre : </span>{CommunityData['Community Type']}</h1>
      <div className={'flex items-center justify-start gap-1 flex-wrap'}>
        <h1 className={'font-extrabold'}>Related Tags</h1>
        <div>
          {
            CommunityData['Tags']?.map((tag) => {
              return <span key={tag} className={`border-none mx-1 p-4 badge bg-accent text-white`}>{tag}</span>
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
    {
      imageAsset && user.uid === CommunityData['Created By'] && <Button isDisabled={isImageUpdating} onClickHandler={async () => {
        await uploadImageAssetAndUpdateDoc('Communities', id);
        setImageAsset(null)
      }}>
        {
          isImageUpdating ? 'updating' : 'Save Banner'
        }
      </Button>
    }
    {
      (CommunityData['Members'] && CommunityData['Members'].includes(user.uid)) ? <Button onClickHandler={() => leaveCommunity(id)}>Leave Community</Button> : ''
    }
  </>

}