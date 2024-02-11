/* eslint-disable react/prop-types */
import { useContext } from "react";
import Button from "../Button/Button.component.jsx";
import { Divider } from "@chakra-ui/react";
import { UserContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import useJoinCommunity from "../../hooks/useJoinCommunity.js";
import useLeaveCommunity from "../../hooks/useLeaveCommunity.js";
import { AppRoutes } from "../../constants/AppRoutes.js";
import { Img } from 'react-image'
import { truncateText } from "../../utils/index.js";
import AnimatedNumbers from "react-animated-numbers";

// eslint-disable-next-line react/prop-types
export const CommunityCard = ({ community }) => {
  const { user } = useContext(UserContext);
  const { joinCommunity, isJoined, setIsJoined, isJoining } = useJoinCommunity(community.id);

  const handleJoinLeave = () => {
    if (!isJoined) {
      joinCommunity(community.id);
      setIsJoined(true)
    }
  };

  return (
    <div
      className={
        " h-content border-borderPrimary dark:border-borderSecondary shadow-accent  hover:bg-softGrey dark:hover:bg-darkerGrey cursor-pointer  p-2 md:p-8 rounded-lg"
      }
    >
      <div className="flex flex-wrap  items-center gap-4">
        <Img
          loader={<div className="w-20 h-20 rounded-full skeleton"></div>}
          className="w-20 h-20 rounded-full"
          src={community.communityLogoUrl}
        />
        <Link to={`${AppRoutes.communityDetailPage.baseRoute}/${community.id}`}>
          <p className="md:text-xl text-lg font-bold text-accent hover:underline">
            {community.communityName}
          </p>
        </Link>
      </div>
      <div className="flex justify-between my-4 flex-wrap gap-6">
        <p className="text-lg dark:text-textPrimary text-textSecondary  overflow-hidden">
          {truncateText(community.smallDescription, 50)}
        </p>
        <p className={"dark:text-textPrimary  text-textSecondary"}>
          Create At:{" "}
          <span className={"text-accent"}>{community.createdAt}</span>
        </p>

      </div>
      <div className={"mt-12 mb-4"}>
        <Divider />
      </div>
      <div className={"flex justify-between  items-center w-full"}>
        <div className="flex gap-2">
          <p className="dark:text-textPrimary text-textSecondary">Total Members: </p>
          <p className={"dark:text-textPrimary text-textSecondary"}>
            <AnimatedNumbers
              includeComma
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.1,
              })}
              animateToNumber={community.members.length}
            />

          </p>
        </div>
        <div className={"w-[120px]"}>
          {community.createdBy !== user.uid && (
            <Button isDisabled={isJoining} py={1} onClickHandler={handleJoinLeave}>
              {isJoined ? <h1 className={isJoined ? "cursor-not-allowed" : 'cursor-pointer'}>Joined</h1> : "Join"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
