import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/Firebase.js";
import { Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ToastStrings } from "../../constants/ToastStrings.js";
import { auth } from "../../firebase/Firebase.js";
import { Colors } from "../../constants/Colors.js";
import { getUserData } from "../../utils/Firebase Utils Functions/index.js";
import Logo from "../../assets/Logo.png";
import Button from "../../components/Button/Button.component.jsx";
import { signOut } from "firebase/auth";
import { uploadImageAssetToCloudinary } from "../../cloudinary/Cloudinary.js";

export const UserProfile = () => {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [userData, setUserData] = useState();
  const [imageFile, setImageFile] = useState();
  const [loading, setLoading] = useState(true);

  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleImageUpload = async () => {
    try {
      if (imageFile) {
        const { secure_url } = await uploadImageAssetToCloudinary(imageFile);
        await updateDoc(doc(db, "Users", user.uid), {
          Avatar: secure_url,
        });
        toast({
          title: "pic uploded successfully!",
          status: "success",
          duration: ToastStrings.duration,
          isClosable: true,
        });
        setUserData((prevUserData) => ({
          ...prevUserData,
          Avatar: secure_url,
        }));
      }
    } catch (error) {
      console.log("Error uploading profile picture:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const data = await getUserData(user.uid);
          setUserData(data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (isLoading || loading) {
    return <Spinner color={Colors.white} size={"lg"} />;
  }

  return (
    <>
      <div className="bg-primary dark:bg-secondary border border-borderPrimary dark:border-borderSecondary my-2 hover:bg-softGrey dark:hover:bg-darkerGrey shadow p-4 rounded-lg">
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
      <Button onClickHandler={handleImageUpload}>Save Image</Button>
      <Button onClickHandler={signout}>Logout</Button>
    </>
  );
};
