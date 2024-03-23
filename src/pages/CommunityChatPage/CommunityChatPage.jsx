import { useEffect, useState } from "react";
import InputField from "../../components/Inputfield/InputField.component";
import { useParams } from "react-router-dom";
import Message from "../../components/Message/Message.component";
import SendMessage from "../../components/Message/SendMessage.component";
import { db } from "../../firebase/Firebase";
import { query, collection, onSnapshot, orderBy, where } from "firebase/firestore";

export const CommunityChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  // console.log(id)

  useEffect(() => {
    const q = query(
      collection(db, 'Messages'),
      where('communityID', '==', id),
      orderBy('Time')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [id]);


  return (
    <>
      <div className="flex flex-col p-[10px]">
        {messages && messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <SendMessage />
    </>
  );
};
