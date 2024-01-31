import { updateDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { getUserData } from "../utils/Firebase Utils Functions/index.js";
import { db } from "../firebase/Firebase.js";
import { useToast } from "@chakra-ui/react";
import { ToastStrings } from "../constants/ToastStrings.js";

const useLeaveCommunity = () => {
  const toast = useToast();
  const { user } = useContext(UserContext);

  const leaveCommunity = async (id) => {
    try {
      const userData = await getUserData(user?.uid);
      const joinedCommunities = userData["Joined Communities"] ?? [];
      const userDocRef = doc(db, "Users", user.uid);

      const updatedJoinedCommunities = joinedCommunities.filter(
        (id) => id !== id
      );
      await updateDoc(userDocRef, {
        ["Joined Communities"]: updatedJoinedCommunities,
      });

      const communityDocRef = doc(db, "Communities", id);
      const communityMembers = id.members ?? [];

      const updatedMembers = communityMembers.filter((id) => id !== user.uid);
      await updateDoc(communityDocRef, {
        ["Members"]: updatedMembers,
      });

      toast({
        title: "Left the Community Successfully!",
        status: "success",
        duration: ToastStrings.duration,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error Leaving Community",
        description: "An error occurred while leaving the community.",
        status: "error",
        duration: ToastStrings.duration,
        isClosable: true,
      });
    }
  };

  return { leaveCommunity };
};

export default useLeaveCommunity;
