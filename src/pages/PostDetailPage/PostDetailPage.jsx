/* eslint-disable react/prop-types */
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { db } from "../../firebase/Firebase";
import Comment from "../../components/CommentSection/Comment";
import { useFetchComments } from "../../hooks/useFetchComments";
import { UserContext } from "../../context/AuthContext";
import Button from "../../components/Button/Button.component";
import { Img } from "react-image";
import { Setting4 } from "iconsax-react";
import { useTranslatePost } from "../../hooks/useTranslatePost";


export const PostDetailPage = () => {

  const { id } = useParams();
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')

  //-----------------------------------------
  const navigation = useNavigate()
  //-----------------------------------------
  const { user } = useContext(UserContext)
  const [postDetail, setPostDetail] = useState(null);
  const { comments } = useFetchComments(id);
  const [commentUsers, setCommentUsers] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: for smooth scrolling behavior
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      const snapshot = await getDoc(doc(db, `${type == 'general' ? 'General Posts' : 'Community Posts'}`, id));
      const data = snapshot.data();
      setPostDetail(data);
    };
    getData();
  }, [id, type]);
  // const { translatePost, translatedtext, detectedLanguageCode } = useTranslatePost(postDetail)
  useEffect(() => {
    const fetchUserDetails = async () => {
      const users = [];
      for (const comment of comments) {
        const userId = comment["Created By"];
        if (!users[userId]) {
          const userSnapshot = await getDoc(doc(db, "Users", userId));
          const userData = userSnapshot.data();
          users[userId] = userData;
        }
      }
      setCommentUsers(users);
    };

    fetchUserDetails();
  }, [comments]);
  if (!postDetail) return <h1>Loading</h1>;

  return (
    <>
      {/* <Img
        className={"object-cover rounded-lg w-full h-full"}
        src={postDetail["Banner URL"]}
        loader={<div className="w-full h-full skeleton"></div>}
      /> */}
      <h1 className="dark:text-textPrimary text-secondary font-bold text-2xl">
        {postDetail.Title}
      </h1>
      {/* Description */}
      <h1 className="dark:text-textPrimary text-secondary">{postDetail.Description}</h1>
      {/* {translatedtext && (
        <div className="p-2">
          <h1 className="dark:text-textPrimary text-textSecondary">{translatedtext}</h1>
        </div>
      )}
      {detectedLanguageCode !== 'eng' && (
        <Button
          onClickHandler={() => translatePost(postDetail.Description, detectedLanguageCode)}
        >
          Translate into English
        </Button>
      )} */}
      {/* dropdown menu */}
      <div className="dropdown">
        <div tabIndex={0} role="button" className="m-1">
          <Setting4 size="25" className="dark:text-primary text-secondary" />
        </div>
        <ul tabIndex={0} className=" dropdown-content z-[1] menu p-2 shadow dark:bg-secondary bg-primary rounded-box w-52">
          {
            postDetail['Created By'] == user.uid &&
            <li className="dark:hover:bg-darkerGrey rounded-lg flex hover:bg-softGrey dark:text-primary text-secondary">
              <a className=" dark:hover:bg-darkerGrey hover:bg-softGrey" onClick={() => { navigation(`/edit/post/${id}?type=${type}`) }}>
                Edit Post
              </a>
            </li>
          }
          <li><a>Item 2</a></li>
        </ul>
      </div >

      {/* comment sectino */}
      <Comment postID={id} />
      <div className="">
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <div className="mb-2 bg-grey p-2 w-72 rounded-2xl">
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={commentUsers[comment["Created By"]]?.Avatar}
                    alt="Profile Pic"
                  />
                  <span>{commentUsers[comment["Created By"]]?.Username}</span>
                </div>
                <p>{comment.Description}</p>

                {/* <button className="bg-sky-500 rounded-2xl p-1">Reply</button> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
