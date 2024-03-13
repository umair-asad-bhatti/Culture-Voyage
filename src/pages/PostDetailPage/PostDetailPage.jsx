import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/Firebase";
import Comment from "../../components/CommentSection/Comment";
import { useFetchComments } from "../../hooks/useFetchComments";
import Button from "../../components/Button/Button.component";

export const PostDetailPage = () => {
  const { id } = useParams();
  const [data, setdata] = useState(null);
  const { comments, isLoading } = useFetchComments(id);
  const [commentUsers, setCommentUsers] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: for smooth scrolling behavior
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      const snapshot = await getDoc(doc(db, "General Posts", id));
      const data = snapshot.data();
      console.log(data);
      setdata(data);
    };
    getData();
  }, [id]);

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

  if (!data) return <h1>Loading</h1>;

  return (
    <>
      <h1 className="dark:text-textPrimary text-secondary font-bold text-2xl">
        Title: {data.Title}
      </h1>
    
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
