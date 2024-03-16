/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserData } from "../../utils/Firebase Utils Functions";
import { truncateText } from "../../utils";
import { Img } from "react-image";
import { useDeletePost } from "../../hooks/useDeletePost";
import { UserContext } from "../../context/AuthContext";
import { Heart, MessageProgramming } from "iconsax-react";
import { db } from "../../firebase/Firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import Button from "../Button/Button.component";
import translate from "translate";


const PostCardComponent = ({ postDetail, communityId = null, postType }) => {

  const [author, setAuthor] = useState();
  const { deletePost, deleting } = useDeletePost();
  const { user } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState();
  const [isLiking, setIsLiking] = useState(false);
  const [translatedtext, setTranslatedText] = useState();
  // Mapping between franc keywords and ISO 639-1 language codes



  // eslint-disable-next-line no-unused-vars
  const [detectedLanguageCode, setDetectedLanguageCode] = useState()
  const translatePost = async (text) => {
    const endpoint = `https://api.dandelion.eu/datatxt/li/v1/?text=${text}&token=dbfa0d365a2440a6b477878602cbf0b2`
    const res = await fetch(endpoint)
    const langs = await res.json()
    const lang = langs.detectedLangs[0].lang
    console.log(lang);
    const translateText = await translate(text, {
      from: lang,
      to: "en",
    });
    setTranslatedText(translateText)
  }

  //listening to the realtime changes to likes of the post
  useEffect(() => {
    if (postType == "general") {
      onSnapshot(doc(db, "General Posts", postDetail.id), (doc) => {
        const likesArray = doc.data().Likes ?? [];
        setIsLiked(likesArray.includes(user.uid));
      });
    } else {
      onSnapshot(doc(db, "Community Posts", postDetail.id), (doc) => {
        const likesArray = doc.data().Likes ?? [];
        setIsLiked(likesArray.includes(user.uid));
      });
    }
  }, [postDetail, postType, user.uid]);
  const likeOrDislikePost = async (id) => {
    if (isLiking) return;
    setIsLiking(true);
    let postRef = null;

    if (postType == "general") {
      console.log("in general");
      postRef = doc(db, "General Posts", id);
    } else {
      console.log("in community post");
      postRef = doc(db, "Community Posts", id);
    }

    const snapshot = await getDoc(postRef);
    const likesArray = snapshot.data().Likes ?? [];

    if (isLiked) {
      //dislike the post
      const updatedLikesArray = likesArray.filter((item) => item != user.uid);
      await updateDoc(postRef, { Likes: updatedLikesArray });
      setIsLiked(false);
    } else {
      //likes the post
      likesArray.push(user.uid);
      await updateDoc(postRef, { Likes: likesArray });
      setIsLiked(true);
    }
    setIsLiking(false);
  };
  useEffect(() => {
    const getPostAuthor = async () => {
      const res = await getUserData(postDetail["Created By"]);
      setAuthor(res);
    };
    getPostAuthor();
  }, [postDetail]);

  return (
    <>
      {postDetail && (
        <div className="p-4   bg-primary dark:bg-darkCardBg rounded-xl shadow-lg">
          <div className="flex items-center justify-between  gap-4">
            <div className="flex items-center justify-center gap-4">
              <div style={{ width: 50, height: 50 }}>
                <Img
                  loader={
                    <div className="w-full h-full rounded-full skeleton"></div>
                  }
                  className="rounded-full w-full h-full "
                  src={author?.Avatar}
                  width={50}
                  height={50}
                />
              </div>
              <Link
                to={`/post/${postDetail["id"]}?type=${postType == "general" ? "general" : "community"
                  }`}
              >
                <h1 className="lg:text-lg text-md font-bold text-blAccent dark:text-accent ">
                  {postDetail?.Title}
                </h1>
                <span className="dark:text-textPrimary text-textSecondary">
                  By @{author?.Username}
                </span>
              </Link>
            </div>
            <div></div>
          </div>
          <div className="p-2">
            <h1 className="dark:text-textPrimary text-textSecondary">
              {postDetail.Description &&
                truncateText(postDetail?.Description, 100)}
            </h1>
          </div>
          <div className="carousel w-full">
            {postDetail["Media URL"] &&
              postDetail["Media URL"].map((url, index) => {
                return (
                  <div
                    id={`item${index + 1}`}
                    key={index}
                    className="carousel-item w-1/2 h-60 m-2 rounded-xl shadow  p-2 bg-gray-200 dark:bg-gray-700 "
                  >
                    {!url.split(".").pop().toLowerCase().includes("mp4") ? (
                      <img
                        src={url}
                        className="object-cover rounded-lg w-full h-full"
                      />
                    ) : (
                      <video
                        src={url}
                        className="w-full h-full rounded-xl"
                        controls
                      ></video>
                    )}
                  </div>
                );
              })}
          </div>
          {translatedtext && (
            <div className="p-2">
              <h1 className="dark:text-textPrimary text-textSecondary">{translatedtext}</h1>
            </div>
          )}
          {detectedLanguageCode !== 'eng' && (
            <Button
              onClickHandler={() => translatePost(postDetail.Description)}
            >
              Translate into English
            </Button>
          )}
          <div className="flex items-center justify-around  my-2   bg-slate-100 dark:bg-gray-800 rounded-xl p-2">
            <div className="flex items-center justify-center gap-2">
              <Heart
                aria-disabled={isLiking}
                onClick={() => likeOrDislikePost(postDetail.id)}
                size="20"
                variant={isLiked ? "Bold" : "Outline"}
                className="text-[#E1306C]"
              />
              <h1 className="text-[#E1306C]">
                {postDetail && postDetail["Likes"].length}{" "}
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Link to={`/post/${postDetail["id"]}`}>
                <MessageProgramming
                  size="20"
                  className="dark:text-primary text-secondary"
                />
              </Link>
              <h1 className="dark:text-textPrimary text-textSecondary text-sm">
                0
              </h1>
            </div>
          </div>
          {postDetail["Created By"] == user.uid && (
            <Button
              onClickHandler={() =>
                deletePost(postDetail.id, communityId, postType)
              }
              isDisabled={deleting}
              outline={true}
            >
              <h1 className="text-warning">
                {deleting ? "Deleting..." : "Delete Post"}
              </h1>
            </Button>
          )}
        </div>
      )}
    </>
  );
};
export default PostCardComponent;
