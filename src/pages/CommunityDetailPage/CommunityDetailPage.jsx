import { doc, updateDoc } from "firebase/firestore";
import {
  Add,
  Danger,
  Information,
  Receipt1,
  Setting4,
  UserOctagon,
  Edit
} from "iconsax-react";
import { useContext, useEffect, useState } from "react";
import { Img } from "react-image";
import { useParams,useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.component.jsx";
import InputField from "../../components/Inputfield/InputField.component.jsx";
import { TagsInput } from "../../components/TagsInput/TagsInput.jsx";
import { UploadImage } from "../../components/Upload Image/UploadImage.jsx";
import { UserContext } from "../../context/AuthContext.jsx";
import { db } from "../../firebase/Firebase.js";
import { useFetchCommunityDetails } from "../../hooks/useFetchCommunityDetails.js";
import useLeaveCommunity from "../../hooks/useLeaveCommunity.js";
import { useUpdateImage } from "../../hooks/useUpdateImage.js";
import useJoinCommunity from "../../hooks/useJoinCommunity.js";
import AnimatedNumbers from "react-animated-numbers";
import useFetchAllCommunityMembers from "../../hooks/useFetchAllCommunityMembers.js";
import { CommunityDetailPageSkelton } from "./CommunityDetailPageSkelton.jsx";
import { useFetchQuestionsPosts } from "../../hooks/useFetchQuestionPosts.js";
import { useFetchExperiencePosts } from "../../hooks/useFetchExperiencePosts.js";
import PostListing from "../../components/PostListing/PostListing.jsx";
export const CommunityDetailPage = () => {
  
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigation = useNavigate()
  
  const [activeCategory, setActiveCategory] = useState("exp");
  const { CommunityData, isFetching } = useFetchCommunityDetails(id);
  const [communityGuidelines, setCommunityGuidelines] = useState(
    CommunityData["Guidelines"] ?? ""
  );
  const [communityRules, setCommunityRules] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");

  //fetching information of all members
  const { imageAsset, setImageAsset, uploadImageAssetAndUpdateDoc } =
    useUpdateImage();
  const { allCommunityMembers } = useFetchAllCommunityMembers(CommunityData);
  const { joinCommunity, isJoined, isJoining, checkJoinedStatus } =
    useJoinCommunity(CommunityData);
  const { leaveCommunity, isLeaving } = useLeaveCommunity();
  const { questionPosts, isFetchingQuestionPosts } = useFetchQuestionsPosts(id);
  // console.log(questionPosts);
  const { experiencePosts, isFetchingExperiencePosts } = useFetchExperiencePosts(id)


  useEffect(() => {
    checkJoinedStatus(id);
  }, [CommunityData, id]);

  useEffect(() => {
    setCommunityRules(CommunityData["Rules"] ?? []);
    setCommunityGuidelines(CommunityData["Guidelines"] ?? []);
  }, [CommunityData]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: for smooth scrolling behavior
    });
  }, []);
  if (isFetching)
    return (
      <div>
        <CommunityDetailPageSkelton />
      </div>
    );
  if (!isFetching && !CommunityData) return <h1>Error occurred</h1>;
  //implement the edit community functionality
  return (
    <>
      <div className={"w-full relative  rounded-lg shadow-lg h-[300px]"}>
        <div className="bg-primary dark:bg-secondary h-12 w-12 flex items-center justify-center rounded-full absolute top-2 left-2">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="m-1">
              <Setting4
                size="20"
                className="dark:text-primary text-secondary"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow dark:bg-secondary bg-primary rounded-box w-52"
            >
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              {/* first item in drop down and will be shown only if the admin of the community is opening the community*/}

              {CommunityData["Created By"] === user.uid && (
                <li
                  onClick={() =>
                    document.getElementById("guidelines").showModal()
                  }
                >
                  <a className="dark:hover:bg-darkerGrey hover:bg-softGrey dark:text-primary text-secondary">
                    <Information
                      size="20"
                      className="text-secondary dark:text-primary "
                    />
                    Edit Guidlines
                  </a>
                </li>
              )}
              <dialog id="guidelines" className="modal">
                <div className="modal-box dark:bg-secondary">
                  <InputField
                    value={communityGuidelines}
                    setValue={setCommunityGuidelines}
                    type={"textarea"}
                    placeholder="Edit Guidlines"
                    maxLength={200}
                  ></InputField>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <Button isDisabled={false} onClickHandler={() => { }}>
                        close
                      </Button>
                    </form>
                    <div method="dialog">
                      <Button
                        isDisabled={false}
                        onClickHandler={async () => {
                          if (communityGuidelines.trim().length == 0) {
                            alert("Guidelines cannot be empty");
                            return;
                          }
                          await updateDoc(
                            doc(db, "Communities", CommunityData.id),
                            { Guidelines: communityGuidelines }
                          );
                          alert("done");
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </dialog>

              {/* second item in dropdown */}
              {CommunityData["Created By"] === user.uid && (
                <li
                  onClick={() => document.getElementById("rules").showModal()}
                >
                  <a className="dark:hover:bg-darkerGrey hover:bg-softGrey dark:text-primary text-secondary">
                    <Receipt1
                      size="20"
                      className="text-secondary dark:text-primary"
                    />
                    Edit Rules
                  </a>
                </li>
              )}
              <dialog id="rules" className="modal">
                <div className="modal-box dark:bg-secondary">
                  <TagsInput
                    placeholder={"Add Community Rules"}
                    tags={communityRules}
                    setTags={setCommunityRules}
                    tagInputValue={tagInputValue}
                    setTagInputValue={setTagInputValue}
                  />
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <Button isDisabled={false} onClickHandler={() => { }}>
                        close
                      </Button>
                    </form>
                    <div method="dialog">
                      <Button
                        isDisabled={false}
                        onClickHandler={async () => {
                          if (communityRules.length == 0) {
                            alert("Rules cannot be empty");
                            return;
                          }
                          await updateDoc(
                            doc(db, "Communities", CommunityData.id),
                            { Rules: communityRules }
                          );
                          alert("done");
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </dialog>
              {user.uid != CommunityData["Created By"] && (
                <li>
                  <a className="dark:hover:bg-darkerGrey hover:bg-softGrey ">
                    {isJoined ? (
                      <button
                        disabled={isLeaving}
                        onClick={() => leaveCommunity(id)}
                        className=" text-warning flex items-center justify-center gap-2"
                      >
                        <Danger size="20" className="text-warning" />
                        <span>Leave Community</span>
                      </button>
                    ) : (
                      <button
                        disabled={isJoining}
                        onClick={() => {
                          joinCommunity(id);
                        }}
                        className=" text-accent flex items-center justify-center gap-2 text-bold"
                      >
                        <Add size="25" className="text-accent" />
                        <span>Join Community</span>
                      </button>
                    )}
                  </a>
                </li>
              )}
              {user.uid == CommunityData["Created By"] && (
                <li className="dark:hover:bg-darkerGrey rounded-lg flex hover:bg-softGrey dark:text-primary text-secondary">
                  <a>
                    <UserOctagon
                      size="20"
                      className="dark:text-primary text-secondary"
                    />
                    <span>Manage Users</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        {CommunityData["Banner URL"] ? (
          <>
            <Img
              className={"object-cover rounded-lg w-full h-full"}
              src={CommunityData["Banner URL"]}
              loader={<div className="w-full h-full skeleton"></div>}
            />
          </>
        ) : (
          CommunityData["Created By"] === user.uid && (
            <UploadImage
              imgCompressionSize="lg"
              fullSize={true}
              imageAsset={imageAsset}
              setImageAsset={setImageAsset}
            />
          )
        )}
        <Img
          className={
            "md:w-[200px] w-32 h-32 bg-white border border-white md:h-[200px] object-cover rounded-full absolute md:-bottom-20  -bottom-12 right-24"
          }
          src={CommunityData["Community Logo URL"]}
          loader={
            <div
              className={
                "w-[200px] border h-[200px] object-cover skeleton rounded-full absolute -bottom-20 right-20"
              }
            ></div>
          }
        />
      </div>

      <div className={"w-full dark:text-textPrimary text-textSecondary md:p-4 p-2 my-12"}>
        <h1
          className={
            "font-extrabold  text-2xl dark:text-accent text-blAccent my-2"
          }
        >
          {CommunityData["Community Name"]}{" "}
        </h1>
        <h1>
          <span className={"font-extrabold my-2"}>Created At :</span>
          {CommunityData["Created At"]}
        </h1>
        <h1 className={"font-extrabold mt-2"}>Description: </h1>
        <h1 className={"dark:text-textPrimary text-textSecondary w-96"}>
          {CommunityData["Small Description"]}
        </h1>
        <h1 className={"my-2"}>
          <span className={"font-extrabold "}>Community Genre : </span>
          {CommunityData["Community Type"]}
        </h1>
        <div className={"flex items-center justify-start gap-1 flex-wrap"}>
          <h1 className={"font-extrabold"}>Related Tags</h1>
          <div>
            {CommunityData["Tags"].length > 0 &&
              CommunityData["Tags"]?.map((tag) => {
                return (
                  <span
                    key={tag}
                    className={`border-none mx-1 p-4 md:my-0 my-2 badge dark:bg-accent bg-blAccent text-white`}
                  >
                    {tag}
                  </span>
                );
              })}
          </div>
        </div>

        <div className="flex items-end justify-start my-4  gap-8">
          <div className="flex items-center justify-between gap-2">
            Total Members:
            <AnimatedNumbers
              includeComma
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
              animateToNumber={allCommunityMembers.length}
            />
          </div>

          <div>
            {allCommunityMembers.length > 0 && (
              <Button
                isDisabled={false}
                onClickHandler={() =>
                  document.getElementById("allCommunityMembers").showModal()
                }
              >
                <h1 className="md:text:lg text-sm">Show All Members</h1>
              </Button>
            )}
          </div>
          <button onClick={() => { navigation(`/communitychat/${id}`) }}> 
            <Edit
            size="30"
            className="text-secondary dark:text-primary "/>
            </button>
        </div>

        {/* Communities Members */}
        <dialog id="allCommunityMembers" className="modal">
          <div className="modal-box dark:bg-secondary bg-primary">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="h-96 w-auto">
              {allCommunityMembers.map((member, index) => {
                return (
                  <div
                    key={index}
                    className="flex p-4 gap-4 items-center justify-start "
                  >
                    <div className="md:w-12 w-8 md:h-12 h-8 rounded-full">
                      <Img
                        src={member.Avatar}
                        loader={
                          <div className="md:w-20 w-8 md:h-20 h-8 rounded-full skeleton"></div>
                        }
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h1
                        key={index + 9}
                        className="dark:text-primary text-secondary md:text-md text-sm"
                      >
                        @{member.Username} {member.id === user.uid && "(you)"}
                      </h1>
                      <h1
                        key={index}
                        className="dark:text-primary text-secondary md:text-md text-sm"
                      >
                        {member.Email}
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </dialog>

        {/* posts swaping buttons */}
        <div className="flex items-center md:justify-end justify-start gap-6 mt-12 mb-4">
          <div>
            <Button
              onClickHandler={() => {
                setActiveCategory("exp");
              }}
              outline={activeCategory == "exp" ? false : true}
            >
              Experiences
            </Button>
          </div>
          <div>
            <Button
              onClickHandler={() => {
                setActiveCategory("que");
              }}
              outline={activeCategory == "que" ? false : true}
            >
              Questions
            </Button>
          </div>
        </div>
        {/* actual posts */}
        <div>
          {activeCategory == "exp" ? (
            <PostListing postType={'exp'} communityId={id} posts={experiencePosts} isFetching={isFetchingExperiencePosts} />
          ) : (
            <PostListing postType={'que'} communityId={id} posts={questionPosts} isFetching={isFetchingQuestionPosts} />
          )}
        </div>
      </div>
      <div>
        {imageAsset && user.uid === CommunityData["Created By"] && (
          <Button
            Button
            onClickHandler={() =>
              uploadImageAssetAndUpdateDoc("Communities", CommunityData.id)
            }
          >
            Change Banner
          </Button>
        )}
      </div>
    </>
  );
};
