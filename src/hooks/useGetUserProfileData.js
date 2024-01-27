import { useContext, useState } from "react";
import { uploadImageAssetToCloudinary } from "../cloudinary/Cloudinary.js";
import { getFirebaseDoc } from "../utils/Firebase Utils Functions/index.js";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/Firebase.js";
import { UserContext } from "../context/AuthContext.jsx";
import { useToast } from "@chakra-ui/react";
import { ToastStrings } from "../constants/ToastStrings.js";

export const useGetUserProfileData = () => {
  const toast = useToast();
  const { user, isLoading } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [imageFile, setImageFile] = useState();

  const getUserDetails = async (id) => {
    setIsFetching(true);
    try {
      const data = await getFirebaseDoc("Users", id);
      //console.log(data)
      setUserData(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleImageUpload = async (id) => {
    try {
      if (imageFile) {
        const { secure_url } = await uploadImageAssetToCloudinary(imageFile);
        await updateDoc(doc(db, "Users", id), {
          Avatar: secure_url,
        });
        toast({
          title: "pic uploaded successfully!",
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

  return {
    getUserDetails,
    isFetching,
    userData,
    handleImageUpload,
    setImageFile,
  };
};
