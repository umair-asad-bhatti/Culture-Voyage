import { useState } from "react";
import { getUserData } from "../utils/Firebase Utils Functions/index.js";

export const useGetUserProfileData = () => {

  const [userData, setUserData] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const getUserDetails = async (id) => {
    setIsFetching(true);
    try {
      const data = await getUserData(id)
      setUserData(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsFetching(false);
    }
  };
  return {
    getUserDetails,
    isFetching,
    userData,
  };
};
