import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/AuthContext";
import { db } from "../../firebase/Firebase";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import InputField from "../Inputfield/InputField.component";
import { Send } from "iconsax-react";
import { getUserData } from '../../utils/Firebase Utils Functions'
import { useParams } from "react-router-dom";

export default function SendMessage() {
  const { id } = useParams();
  //console.log(id)
  const { user } = useContext(UserContext);
  const [input, setInput] = useState();
  //console.log(user)

  const [userData , setUserData] = useState();

  useEffect(() => {
    (async () => {
      const data = await getUserData(user.uid)
      console.log("Data",data)
      setUserData(data)
    })()
  }, [user.uid])

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Input Field Empty");
      return;
    }
    await addDoc(collection(db, "Messages"), {
      text: input,
      name: userData?.Username,
      Image:userData?.Avatar,
      uid: user.uid,
      communityID: id,
      Time: serverTimestamp(),
    });
    setInput("");
  };
  return (
    <>
      <div className="fixed bottom-0 w-96 dark:bg-secondary bg-primary">
        <InputField
          placeholder="Enter Message..."
          type="text"
          value={input}
          setValue={setInput}
        />
        <Send
          className={
            "dark:text-primary text-darkGrey absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          }
          onClick={sendMessage}
        />
      </div>
    </>
  );
}
