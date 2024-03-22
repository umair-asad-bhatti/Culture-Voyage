import { useEffect, useState } from "react";
import InputField from "../../components/Inputfield/InputField.component";
import { useParams } from "react-router-dom";

import { Send } from "iconsax-react";

export const CommunityChatPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState();

  const handleMessage = () => {
    console.log("first");
  };

  return (
    <>
      <div className="flex">
        <div className="w-[70%] shadow-md h-screen p-2 border border-borderSecondary dark:border-borderPrimary text-textSecondary dark:text-textPrimary rounded-xl">
          <div className="flex p-2 rounded-xl">
            <p>Message</p>
          </div>
          <div className="flex flex-row-reverse p-2 rounded-xl">
            <p>Message</p>
          </div>
          <div className="fixed bottom-0 w-[53%] mb-1">
            <InputField
              placeholder="Enter Message"
              type="text"
              value={message}
              setValue={setMessage}
            />
            <Send
              className={
                "dark:text-primary text-darkGrey absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              }
              onClick={handleMessage}
            />
          </div>
        </div>
        <div className="p-2">Community Details</div>
      </div>
    </>
  );
};
