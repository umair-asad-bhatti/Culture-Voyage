import React, { useContext } from "react";
import { UserContext } from "../../context/AuthContext";


const style = {
  message:
    "flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full",
  sent: "bg-[#395dff] text-white flex-row-reverse float-right rounded-bl-full",
  received: "bg-[#e5e5ea] text-black float-left rounded-br-full",
};

export default function Message({ message }) {
  const { user } = useContext(UserContext);

  const messageClass =
    message.uid === user.uid ? `${style.sent}` : `${style.received}`;

  return (
    <div>
      <div className={`${style.message} ${messageClass}`}>
        {message.uid !== user.uid && (
          <div className="w-10 h-10">
            <img
              className="object-cover rounded-full w-full h-full"
              src={message?.Image}
            />
          </div>
        )}
        <div>
          <p>{message?.text}</p>
        </div>
        {message.uid === user.uid && (
          <div className="w-10 h-10">
            <img
              className="object-cover rounded-full w-full h-full"
              src={message?.Image}
            />
          </div>
        )}
      </div>
    </div>
  );
}
