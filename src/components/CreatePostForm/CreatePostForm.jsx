/* eslint-disable react/no-unknown-property */

import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button.component";
import InputField from "../Inputfield/InputField.component";
import { getUserData } from "../../utils/Firebase Utils Functions";
import { ArrowCircleDown2, DocumentUpload, Trash } from "iconsax-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import Masonry from "react-masonry-css";
import "./style.css";
import { gsap } from "gsap";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useCreatePost } from "../../hooks/useCreatePost";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export function CreatePostForm() {
  const [postCategory, setPostCategory] = useState("Select Category");

  const [activeTab, setActiveTab] = useState("details");
  const [showPostType, setShowPostType] = useState(false);

  const {
    handleCreatePost,
    isCreating,
    title,
    description,
    imageAsset,
    postType,
    setTitle,
    setDescription,
    setImageAsset,
    setCommunityId,
    setPostType,
  } = useCreatePost();
  const [user, setUser] = useState(null);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const userDataFromLocal = localStorage.getItem("user");
  const active_nav = useRef(null);
  useEffect(() => {
    postCategory != "Select Category" &&
      gsap.from(".cardddd", { y: -100, opacity: 0, duration: 1 });
  }, [postCategory]);

  const userId = JSON.parse(userDataFromLocal).uid;
  const handleAnimClick = (e) => {
    const state = Flip.getState(active_nav.current);
    e.target.appendChild(active_nav.current);
    Flip.from(state, { duration: 0.2, absolute: true, ease: "none" });
  };

  useEffect(() => {
    const fetchUserDetailsAndCommunities = async () => {
      try {
        const UserData = await getUserData(userId);
        const joinedCommunitiesIDS = UserData["Joined Communities"];
        if (joinedCommunitiesIDS.length > 0) {
          const communityPromises = joinedCommunitiesIDS.map(
            async (communityId) => {
              const communitySnapshot = await getDoc(
                doc(db, "Communities", communityId)
              );
              return { id: communitySnapshot.id, ...communitySnapshot.data() };
            }
          );
          const communitiesData = await Promise.all(communityPromises);
          setJoinedCommunities(communitiesData);
        } else {
          setJoinedCommunities([]);
        }
        setUser(UserData);
      } catch (error) {
        console.error("Error fetching user details and communities:", error);
      }
    };
    fetchUserDetailsAndCommunities();
  }, [userId]);
  const handleImageChange = (e) => {
    if (e.target.files[0]) setImageAsset([...imageAsset, e.target.files[0]]);
  };
  const handleDelete = (image) => {
    const res = imageAsset.filter((i) => i != image);
    console.log(res);
    setImageAsset([...res]);
  };
  const SelectIconRef = useRef(null);
  const dropdown = useRef(null);
  const result = useRef(null);

  const handleClick = () => {
    const elem = dropdown.current;
    elem.style.display == "block"
      ? (elem.style.display = "none")
      : (elem.style.display = "block");
  };

  const setActive = (active) => {
    if (active === user["First Name"]) {
      setCommunityId(null);
    } else {
      const selectedCommunity = joinedCommunities.find(
        (c) => c["Community Name"] === active
      );
      setCommunityId(selectedCommunity ? selectedCommunity.id : null);
    }
    setPostCategory(active);
    dropdown.current.style.display = "none";
  };
  useEffect(() => {
    setShowPostType(
      postCategory === "Select Category" ||
        postCategory === user?.["First Name"]
        ? false
        : true
    );
    setPostType("");
  }, [postCategory, user]);

  return (
    <div className="flex items-start justify-start gap-4 flex-wrap p-4">
      <div className="editor bg-primary dark:bg-transparent   md:w-[600px] flex flex-col text-gray-800   p-4 shadow-md dark:border-borderSecondary border-borderPrimary border-2 rounded-xl dark:shadow-sm">
        {/* active tabs button */}
        <div className="bg-primary dark:bg-transparent flex justify-center gap-8 items-center rounded py-2 h-12 border shadow px-8 dark:border">
          <div
            onClick={() => {
              setActiveTab("details");
              handleAnimClick(event);
            }}
            className={`links  cursor-pointer  relative ${
              activeTab == "details"
                ? "text-blAccent font-semibold dark:text-accent"
                : "dark:text-textPrimary"
            }`}
          >
            Post Details
            <div
              ref={active_nav}
              className="active-nav aboslute w-full h-[2px] rounded top-3 dark:bg-accent bg-blAccent"
            ></div>
          </div>
          <div
            onClick={() => {
              setActiveTab("media");
              handleAnimClick(event);
            }}
            className={`links cursor-pointer relative ${
              activeTab == "media"
                ? "text-blAccent font-semibold  dark:text-accent"
                : "dark:text-textPrimary"
            }`}
          >
            Media (if any)
          </div>
        </div>
        <div>
          {activeTab == "details" ? (
            <div>
              <div className=" relative w-full border p-2 rounded my-4 flex items-center justify-between">
                <div
                  ref={dropdown}
                  className=" h-80 overflow-y-scroll absolute hidden bg-softGrey border shadow-lg p-4 top-10 rounded left-0 w-full"
                >
                  user
                  <div
                    onClick={() => setActive(user["First Name"])}
                    className="flex items-center cursor-pointer justify-start gap-4 border border-t-0 border-l-0 border-r-0 border-b-2 pb-4"
                  >
                    <img
                      src={user?.Avatar}
                      alt=""
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <h1>{user && user["First Name"]}</h1>
                  </div>
                  communities
                  <div>
                    {joinedCommunities.length > 0
                      ? joinedCommunities.map((c) => {
                          return (
                            <div
                              key={c.id}
                              onClick={() => setActive(c["Community Name"])}
                              className="flex items-center cursor-pointer justify-start gap-4 py-4"
                            >
                              <img
                                src={c["Community Logo URL"]}
                                alt=""
                                style={{ width: 50, height: 50 }}
                                className="rounded-full object-cover"
                              />

                              <h1>{c["Community Name"]}</h1>
                            </div>
                          );
                        })
                      : "No Joined Communities"}
                  </div>
                </div>
                <div
                  ref={result}
                  className="dark:text-textPrimary text-textSecondary"
                >
                  c/{postCategory}
                </div>
                <div onClick={handleClick} ref={SelectIconRef} id="select-icon">
                  <ArrowCircleDown2
                    size={25}
                    className="dark:text-textPrimary text-textSecondary"
                  />
                </div>
              </div>
            
              {showPostType && postCategory !== user?.["First Name"] && (
                <div className="my-4 relative">
                  <select
                    id="postType"
                    className="border p-2 rounded w-full"
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select Post Type
                    </option>
                    <option value="Experience">Experience</option>
                    <option value="Question">Question</option>
                  </select>
                </div>
              )}
             

              {/* {console.log(postType)} */}
              <InputField
                type={"text"}
                placeholder="Title"
                value={title}
                setValue={setTitle}
              />
              <div className="my-4">
                <InputField
                  type={"textarea"}
                  maxLength={"200"}
                  placeholder="Description"
                  value={description}
                  setValue={setDescription}
                />
              </div>

              <div className="flex my-4 cursor-pointer">
                {
                  <Button
                    onClickHandler={() => handleCreatePost(userId)}
                    isDisabled={isCreating}
                  >
                    {isCreating ? (
                      <div className="w-full flex items-center justify-center">
                        <div className="w-8 h-6">
                          <LoadingSpinner />
                        </div>
                      </div>
                    ) : (
                      "Create Post"
                    )}
                  </Button>
                }
              </div>
            </div>
          ) : (
            <>
              <div className="min-h-auto my-8">
                {/* <UploadImage fullSize={true} imageAsset={imageAsset} setImageAsset={setImageAsset} imgCompressionSize="lg" /> */}
                <label>
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-bold text-2xl my-2">
                        <DocumentUpload size="30" className="text-accent" />
                      </p>
                      <p className="text-sm w-full dark:text-primary">
                        {" "}
                        click to upload Community logo
                      </p>
                    </div>
                    <p className="mt-4 text-sm text-gray-400  text-center">
                      Use high-quality jpeg, mp4, png image
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload-image"
                    onChange={handleImageChange}
                    className="w-0 h-0"
                  />
                </label>
                <Masonry
                  breakpointCols={{
                    default: 2,
                    1100: 2,
                    700: 1,
                    500: 1,
                  }}
                  className="my-masonry-grid "
                  columnClassName="my-masonry-grid_column"
                >
                  {imageAsset.length > 0 &&
                    imageAsset.map((img, index) => {
                      return (
                        <div key={index} className="relative">
                          <div
                            onClick={() => handleDelete(img)}
                            className="absolute bg-primary dark:bg-secondary  top-2 left-2 rounded-full p-2"
                          >
                            <Trash size="25" color="#FF8A65" />
                          </div>
                          <img src={URL.createObjectURL(img)} />
                        </div>
                      );
                    })}
                </Masonry>
              </div>
            </>
          )}
        </div>
      </div>

      <div
        className={`md:block hidden rounded-xl cardddd   ${
          postCategory != "Select Category"
            ? "shadow-lg border-2 bg-primary dark:bg-transparent dark:border-borderSecondary border-borderPrimary"
            : "border-none"
        }  p-2 w-96`}
      >
        {postCategory === (user && user["First Name"]) ? (
          <div div className="card">
            <div className="flex items-center justify-center">
              <img
                src={user?.Avatar}
                alt=""
                className="rounded object-cover  block  w-24 h-24"
              />
            </div>
            <h1 className="dark:text-textPrimary text-textSecondary text-center">
              {user && user["First Name"]}
            </h1>
          </div>
        ) : (
          <div className="">
            {joinedCommunities.map((c) => {
              if (c["Community Name"] == postCategory) {
                return (
                  <div key={c.id} className="h-96">
                    <div className="relative">
                      <img
                        src={c["Banner URL"]}
                        alt=""
                        className="w-full h-32 object-cover block"
                      />
                      <img
                        src={c["Community Logo URL"]}
                        alt=""
                        className="-bottom-14 left-[35%] object-cover  rounded-full block absolute w-24 h-24"
                      />
                    </div>
                    <h1 className="dark:text-primary font-bold text-secondary mt-20">
                      {c["Community Name"]}
                    </h1>
                    <p>{c["Small Description"]}</p>
                    <div className="divider"></div>
                    <h1 className="dark:text-primary font-bold text-secondary">
                      Members: {c["Members"].length}
                    </h1>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}
