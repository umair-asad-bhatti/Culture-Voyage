import { CommunityModel } from "../Models/CommunityModel.js";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase.js";
import { useToast } from "@chakra-ui/react";
import {useContext, useState} from "react";
import { ToastStrings } from "../constants/ToastStrings.js";
import axios from "axios";
import {UserContext} from "../context/AuthContext.jsx";

export const useCreateCommunity = () => {
  const preset_key = "culture voyage";
  const cloud_name = "dxudpps7i";
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const handleCreateCommunity = async () => {
    setIsCreating(true);
    try {
      //upload image to cloudinary
      const formData = new FormData();
      formData.append('file',imageAsset);
      formData.append("upload_preset",preset_key);
      const {data}= await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
      const imageURL=data.secure_url;
      const bannerId=data.public_id;
      const createdBy=user?.uid;
      const communityModel = new CommunityModel(imageURL,title, description,createdBy,bannerId);
      const communityCollectionRef = collection(db, "Communities");
      // Converting the communityModel to a JavaScript object
      const communityData = { ...communityModel};
      await addDoc(communityCollectionRef, communityData);

      toast({
        title: "Community created successfully!",
        status: "success",
        duration: ToastStrings.duration,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating community:", error);
      toast({
        title: "Error creating community.",
        description: "An error occurred while creating the community.",
        status: "error",
        duration: ToastStrings.duration,
        isClosable: true,
      });
    } finally {
      setImageAsset(null)
      setTitle("")
      setDescription("")
      setIsCreating(false);
    }
  };

  return { handleCreateCommunity, isCreating, setIsCreating,title,setTitle,description,setDescription,imageAsset,setImageAsset };
};
