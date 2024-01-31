import { updateDoc, doc } from "firebase/firestore";
import { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { getUserData } from "../utils/Firebase Utils Functions/index.js";
import { db } from "../firebase/Firebase.js";
import { useToast } from "@chakra-ui/react";
import { ToastStrings } from "../constants/ToastStrings.js";

const useJoinCommunity = () => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [isJoined, setIsJoined] = useState(false);

  const checkJoinedStatus = async (community) => {
    try {
      const userData = await getUserData(user?.uid);
      const joinedCommunities = userData["Joined Communities"] || [];
      setIsJoined(joinedCommunities.includes(community.id));
    } catch (error) {
      console.error("Error checking joined status:", error);
    }
  };

  const joinCommunity = async (community) => {
    try {
      setIsJoined(true);

      const userData = await getUserData(user?.uid);
      const joinedCommunities = userData["Joined Communities"] ?? [];

      //check user already memeber or not
      // if (joinedCommunities.includes(community.id)) {
      //   toast({
      //     title: "Already Joined",
      //     description: "You are already a member of this community.",
      //     status: "info",
      //     duration: ToastStrings.duration,
      //     isClosable: true,
      //   });
      //   return;
      // }

      const userDocRef = doc(db, "Users", user.uid);

      await updateDoc(userDocRef, {
        ["Joined Communities"]: [...joinedCommunities, community.id],
      });

      const communityDocRef = doc(db, "Communities", community.id);
      const communityMembers = community.members ?? [];
     

      await updateDoc(communityDocRef, {
        ["Members"]: [...communityMembers, user.uid],
      });

      toast({
        title: "Community Joined Successfully!",
        status: "success",
        duration: ToastStrings.duration,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error Joining Community",
        description: "An error occurred while joining the community.",
        status: "error",
        duration: ToastStrings.duration,
        isClosable: true,
      });
    }
  };

  return { joinCommunity, isJoined, checkJoinedStatus, setIsJoined };
};

export default useJoinCommunity;
