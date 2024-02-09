import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { getUserData } from "../utils/Firebase Utils Functions/index.js";
import { db } from "../firebase/Firebase.js";
import { useToast } from "@chakra-ui/react";
import { ToastStrings } from "../constants/ToastStrings.js";

const useLeaveCommunity = () => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [isLeaving, setIsLeaving] = useState(false)
  const leaveCommunity = async (communityId) => {
    if (isLeaving)
      return;
    try {
      setIsLeaving(true)
      const userDocRef = doc(db, "Users", user.uid);

      //updaing the user joined communities
      const userData = await getUserData(user?.uid);
      const joinedCommunities = userData["Joined Communities"] ?? [];
      const updatedJoinedCommunities = joinedCommunities.filter(
        (id) => id !== communityId
      );
      await updateDoc(userDocRef, {
        ["Joined Communities"]: updatedJoinedCommunities,
      });

      //updating the community
      const communityDocRef = doc(db, "Communities", communityId);
      const community = await getDoc(communityDocRef)
      const communityMembers = community['Members'] ?? [];

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
    } finally {
      setIsLeaving(false)
    }
  };

  return { leaveCommunity, isLeaving };
};

export default useLeaveCommunity;
