/* eslint-disable react/prop-types */
import { useState } from "react";
import InputField from "../Inputfield/InputField.component";
import Button from "../Button/Button.component";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { useAddComment } from "../../hooks/useAddComment";

const Comment = ({ postID }) => {
  const [description, setDescription] = useState("");
  const { addComment, isAddingComment } = useAddComment();

  const handleAddComment = async () => {
    if (description.trim() !== "") {
      await addComment(description, postID);
      setDescription("");
    }
  };

  return (
    <div className="mt-4 w-full">
      <InputField
        type="textarea"
        value={description}
        setValue={setDescription}
        maxLength={1000}
        placeholder="Write Your Comment"
      ></InputField>
      <div className="flex my-4 cursor-pointer w-24">
        <Button
          onClickHandler={handleAddComment}
          isDisabled={isAddingComment}
        >
          {isAddingComment ? (
            <div className="w-full flex items-center justify-center">
              <div className="w-8 h-6">
                <LoadingSpinner />
              </div>
            </div>
          ) : (
            "Post"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Comment;
