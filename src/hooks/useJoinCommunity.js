import { doc, runTransaction } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { getUserData } from "../utils/Firebase Utils Functions/index.js";
import { db } from "../firebase/Firebase.js";
import { useToast } from "@chakra-ui/react";
import { ToastStrings } from "../constants/ToastStrings.js";

const useJoinCommunity = (community) => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [isJoined, setIsJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false)

  const checkJoinedStatus = useCallback(async (community) => {

    try {
      const userData = await getUserData(user?.uid);
      const joinedCommunities = userData["Joined Communities"] || [];
      setIsJoined(joinedCommunities.includes(community.id));
    } catch (error) {
      console.error("Error checking joined status:", error);
    }
  }, [user?.uid])
  useEffect(() => {
    checkJoinedStatus(community)
  }, [checkJoinedStatus, community])

  const joinCommunity = async (community) => {
    if (isJoining)
      return;
    try {
      setIsJoining(true);
      setIsJoined(true);
      const userData = await getUserData(user?.uid);
      const joinedCommunities = userData["Joined Communities"] ?? [];
      const communityMembers = community.members ?? [];
      const communityDocRef = doc(db, "Communities", community.id);
      const userDocRef = doc(db, "Users", user.uid);
      await runTransaction(db, async (transaction) => {
        //updating the user model
        transaction.update(userDocRef, {
          ["Joined Communities"]: [...joinedCommunities, community.id],
        })
        transaction.update(communityDocRef, {
          ["Members"]: [...communityMembers, user.uid],
        })
      })
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
    } finally {
      setIsJoining(false)
    }
  };

  return { joinCommunity, isJoined, checkJoinedStatus, setIsJoined, isJoining };
};

export default useJoinCommunity;
