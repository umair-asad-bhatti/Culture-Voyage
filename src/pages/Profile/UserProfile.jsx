import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase/Firebase.js";
import Logo from "../../assets/Logo.png";
import Button from "../../components/Button/Button.component.jsx";
import { signOut } from "firebase/auth";
import { useFetchJoinedCommunities } from "../../hooks/useFetchJoinedCommunities.js";
import { useGetUserProfileData } from "../../hooks/useGetUserProfileData.js";
import { CommunityListing } from "../../components/CommunityListing/CommunityListing.jsx";
export const UserProfile = () => {
  const { joinedCommunities, fetchJoinedCommunities, isFetchingJoinedCommunities } = useFetchJoinedCommunities()
  const { user } = useContext(UserContext);
  const {
    userData,
    isFetching,
    getUserDetails,
    handleImageUpload,
    setImageFile,
  } = useGetUserProfileData();
  const [imagePreview, setImagePreview] = useState();
  const { id } = useParams();
  console.log(id);
  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  useEffect(() => {
    getUserDetails(user.uid);
    fetchJoinedCommunities(user.uid)
    handleImageUpload();
  }, [id]);
  if (isFetching) return <h1>Loading....</h1>;
  if (!isFetching && !userData) return <h1>Error occurred</h1>;

  return (
    <>
      <div className="bg-primary dark:bg-secondary border border-borderPrimary dark:border-borderSecondary my-2 hover:bg-softGrey dark:hover:bg-darkerGrey shadow p-4 rounded-lg ">
        <div className="flex items-center mb-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <img
              src={imagePreview || userData?.Avatar || Logo}
              alt="Profile Pic"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="ml-4">
            <h1 className="dark:text-primary text-2xl font-semibold">{`${userData?.["First Name"]} ${userData?.["Last Name"]}`}</h1>
            <p className="dark:text-primary">{userData?.Username}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="dark:text-primary">Email</p>
            <p className="font-semibold dark:text-primary">{userData?.Email}</p>
          </div>
          <div>
            <p className="dark:text-primary">Country</p>
            <p className="font-semibold dark:text-primary">
              {userData?.Country}
            </p>
          </div>
        </div>
      </div>
      <Button onClickHandler={() => handleImageUpload(user.uid)}>
        Save Image
      </Button>
      <Button onClickHandler={signout}>Logout</Button>
      <p className="py-2 text-center font-bold text-lg dark:text-primary">Joined Communities</p>
      <CommunityListing communities={joinedCommunities} isFetching={isFetchingJoinedCommunities} />
    </>
  );
};
