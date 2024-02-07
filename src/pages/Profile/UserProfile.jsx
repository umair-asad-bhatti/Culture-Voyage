import { useContext, useEffect } from "react";
import { Img } from 'react-image'
import { UserContext } from "../../context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import Button from "../../components/Button/Button.component.jsx";
import { useFetchJoinedCommunities } from "../../hooks/useFetchJoinedCommunities.js";
import { useGetUserProfileData } from "../../hooks/useGetUserProfileData.js";
import { CommunityListing } from "../../components/CommunityListing/CommunityListing.jsx";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase.js";
import { useUpdateImage } from "../../hooks/useUpdateImage.js";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import { CreateCommunity } from "../../components/CreateCommunity.jsx";
import { AppRoutes } from "../../constants/AppRoutes.js";
import NavigateLink from "../../components/NavigateLink/NavigateLink.component.jsx";
export const UserProfile = () => {
  const { joinedCommunities, fetchJoinedCommunities, isFetchingJoinedCommunities } = useFetchJoinedCommunities()
  const { userData, isFetching, getUserDetails } = useGetUserProfileData();
  const { isImageChanged, setIsImageChanged, uploadImageAssetAndUpdateDoc, imageAsset, handleImageChange, isImageUpdating, setImageAsset } = useUpdateImage()
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await getUserDetails(id);
      await fetchJoinedCommunities(id);
    })()
    const unSub = onSnapshot(doc(db, 'Users', user.uid), async (doc) => {
      setUser({ uid: user.uid, ...doc.data() });
    })
    return () => unSub()
    // handleImageUpload();
  }, []);

  if (isFetching)
    return <div className="flex items-center justify-center h-full"><LoadingSpinner size={'16'} /></div>;
  if (!isFetching && !userData) return <h1>Error occurred</h1>;

  return (
    <div >
      <div className="bg-primary dark:bg-secondary shadow-accent  border border-borderPrimary dark:border-borderSecondary my-2  shadow-md p-4 rounded-lg ">
        <div className="flex items-center mb-4">
          <div className="relative w-48 h-48 rounded-full overflow-hidden">
            <Img
              src={imageAsset && URL.createObjectURL(imageAsset) || userData?.Avatar || Logo}
              className="w-full h-full object-cover group"
              loader={() => <h1>Loading...</h1>}
            />
            {/*show the update of user profile only if id of params is equal to logged in user*/}
            {
              id === user.uid && <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            }
          </div>

        </div>
        <div className={'my-4'}>

          {isImageChanged &&
            <div className="flex my-4">
              <div className="">
                <Button isDisabled={isImageUpdating} onClickHandler={() => uploadImageAssetAndUpdateDoc('Users', user.uid)}>
                  {isImageUpdating ? 'Updating...' : 'save image'}
                </Button >
              </div>
              <div className=" ml-2">
                <Button isDisabled={false} onClickHandler={() => { setImageAsset(null); setIsImageChanged(false) }}>Cancel </Button>
              </div>
            </div>
          }
        </div>
        <div className="bg-primary dark:bg-secondary w-full shadow overflow-hidden sm:rounded-lg  ">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-textSecondary dark:text-textPrimary">
              User Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details and informations about user.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl className="bg-primary dark:bg-secondary">
              <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                <dt className="text-sm font-medium dark:text-textPrimary text-textSecondary">
                  Full name
                </dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 dark:text-primary text-textSecondary">
                  {`${userData?.["First Name"]} ${userData?.["Last Name"]}`}
                </dd>
              </div>
              <div className="bg-gray-50 dark:bg-secondary px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium dark:text-primary text-textSecondary">
                  Email address
                </dt>
                <dd className="mt-1 text-sm dark:text-primary text-textSecondary sm:mt-0 sm:col-span-2">
                  {userData?.Email}
                </dd>
              </div>
              <div className="bg-white dark:bg-secondary px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium dark:text-primary text-textSecondary">
                  User Name
                </dt>
                <dd className="mt-1 text-sm dark:text-primary text-textSecondary sm:mt-0 sm:col-span-2">
                  {userData?.Username}
                </dd>
              </div>
              <div className="bg-gray-50 dark:bg-secondary px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium dark:text-primary text-textSecondary">
                  About
                </dt>
                <dd className="mt-1 text-sm dark:text-primary text-textSecondary sm:mt-0 sm:col-span-2">
                  {userData?.About || 'Not about defiend yet'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <NavigateLink toURL={`${AppRoutes.editProfile.baseRoute}/${id}`} data={{ id: user.uid, ...userData }}>
          Edit  Profile Information
        </NavigateLink>
        <div className="my-8">
          <CreateCommunity />
        </div>
      </div>
      <div>

        {
          user.uid === id && <div>
            <p className="py-2 font-bold text-lg dark:text-primary">Joined Communities</p>
            <CommunityListing communities={joinedCommunities} isFetching={isFetchingJoinedCommunities} />
          </div>
        }
      </div>
    </div >
  );
};
