/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import Button from "../Button/Button.component.jsx";
import { Divider } from "@chakra-ui/react";
import { UserContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import useJoinCommunity from "../../hooks/useJoinCommunity.js";
import useLeaveCommunity from "../../hooks/useLeaveCommunity.js";
import { AppRoutes } from "../../constants/AppRoutes.js";
import { Img } from 'react-image'

// eslint-disable-next-line react/prop-types
export const CommunityCard = ({ community }) => {
  const { user } = useContext(UserContext);
  const { joinCommunity, isJoined, checkJoinedStatus, setIsJoined } = useJoinCommunity();
  const { leaveCommunity } = useLeaveCommunity();

  useEffect(() => {
    checkJoinedStatus(community);
  }, [community.id]);

  const handleJoinLeave = () => {
    if (isJoined) {
      leaveCommunity(community.id);
      setIsJoined(false);
    } else {
      joinCommunity(community);
    }
  };

  return (
    <div
      className={
        "border border-borderPrimary dark:border-borderSecondary shadow-sm shadow-accent  hover:bg-softGrey dark:hover:bg-darkerGrey cursor-pointer   p-8 rounded-lg"
      }
    >
      <div className="flex flex-wrap  items-center gap-4">

        <Img
          loader={() => <h1>Loading...</h1>}
          className="w-20 h-20 rounded-full"
          src={community.communityLogoUrl}
          alt={`Logo for ${community.communityName}`}
        />

        <Link to={`${AppRoutes.communityDetailPage.baseRoute}/${community.id}`}>
          <p className="md:text-xl text-lg font-bold text-accent hover:underline">
            {community.communityName}
          </p>
        </Link>
      </div>
      <div className="flex justify-between my-4 flex-wrap gap-6">
        <p className="text-lg dark:text-textPrimary text-textSecondary ">
          {community.smallDescription}
        </p>
        <p className={"dark:text-textPrimary  text-textSecondary"}>
          Create At:{" "}
          <span className={"text-accent"}>{community.createdAt}</span>
        </p>

      </div>
      <div className={"mt-12 mb-4"}>
        <Divider />
      </div>
      <div className={"flex justify-between items-center w-full"}>
        <p className={"dark:text-textPrimary text-textSecondary"}>
          Total Members: {community.members.length}
        </p>
        <div className={"w-[120px]"}>
          {community.createdBy !== user.uid && (
            <Button py={1} onClickHandler={handleJoinLeave}>
              {isJoined ? "Joined" : "Join"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
