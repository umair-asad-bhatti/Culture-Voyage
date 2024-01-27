import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase/Firebase.js";
import Logo from "../../assets/Logo.png";
import Button from "../../components/Button/Button.component.jsx";
import { signOut } from "firebase/auth";

import { useGetUserProfileData } from "../../hooks/useGetUserProfileData.js";

export const UserProfile = () => {
  const { user, isLoading } = useContext(UserContext);
  const {
    userData,
    isFetching,
    getUserDetails,
    handleImageUpload,
    setImageFile,
  } = useGetUserProfileData();
  const {id} = useParams();
  console.log(id)
  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getUserDetails(user.uid);
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
              src={userData?.Avatar || Logo}
              alt="Profile Pic"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
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
      <Button onClickHandler={() => handleImageUpload(user.uid)}>Save Image</Button>
      <Button onClickHandler={signout}>Logout</Button>
    </>
  );
};
