import { CommunityModel } from "../Models/CommunityModel.js";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/Firebase.js";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ToastStrings } from "../constants/ToastStrings.js";

export const useCreateCommunity = () => {
  const toast = useToast();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCommunity = async (imageAsset,title, description) => {
    setIsCreating(true);

    try {
      const communityModel = new CommunityModel(imageAsset,title, description);
      const communitiesCollection = collection(db, "Communities");
      // Converting the communityModel to a JavaScript object
      const communityData = { ...communityModel };
       await addDoc(communitiesCollection, communityData);

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
      setIsCreating(false);
    }
  };

  return { handleCreateCommunity, isCreating, setIsCreating };
};
