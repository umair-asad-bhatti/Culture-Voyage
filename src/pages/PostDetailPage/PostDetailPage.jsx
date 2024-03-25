/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { db } from "../../firebase/Firebase";
import Comment from "../../components/CommentSection/Comment";
import { useFetchComments } from "../../hooks/useFetchComments";
import { UserContext } from "../../context/AuthContext";
import { Calendar, Heart, Location, Messages2, Setting4 } from "iconsax-react";
import { Img } from "react-image";


export const PostDetailPage = ({ communityId = null }) => {

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

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth", // Optional: for smooth scrolling behavior
  //   });
  // }, []);

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
    <div className="">
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

        </ul>
      </div >

      {/* comment sectino */}
      <div className="  bg-primary dark:bg-darkCardBg rounded-lg p-4 shadow-lg">
        <Comment postID={id} />
        <hr className="my-2" />

        <div className="flex items-center justify-start gap-2 md:my-4 my-2">
          <Messages2 variant="Bold" size="27" color="#E1306C" />
          <h1 className="text-[#E1306C] font-bold tracking-widest text-lg">User Comments</h1>
          <h1 className="bg-[#E1306C] text-xs px-[4px] py-[1px] text-textLight rounded-lg">{comments.length}</h1>
        </div>
        {comments.map((comment) => (
          <div key={comment.id} className=" p-2  w-full border-b-[1px] dark:border-darkGrey my-2" >
            <div className="flex items-center gap-4">
              <div>
                <Img
                  className="w-10 h-10 rounded-full"
                  src={commentUsers[comment["Created By"]]?.Avatar}
                  alt="Profile Pic"
                  loa
                />
              </div>
              <div>
                <h1 className="font-bold dark:text-textPrimary text-textSecondary">{commentUsers[comment["Created By"]]?.Username}</h1>
                <div className="flex gap-4 items-center justify-center">
                  <div className="flex items-center justify-start gap-1">
                    <Location variant="Bold" size="15" className="text-gray-500" />
                    <span className="text-sm font-thin text-gray-500">{commentUsers[comment["Created By"]]?.Country}</span>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <Calendar variant="Bold" size="15" className="text-gray-500" />
                    <span className="text-sm font-thin text-gray-500">1m ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-[600px]">
              <p className="dark:text-textPrimary text-textSecondary my-4">{comment.Description}</p>
            </div>

            {/* <button className="bg-sky-500 rounded-2xl p-1">Reply</button> */}
          </div>

        ))}

      </div >
    </div>
  );
};
