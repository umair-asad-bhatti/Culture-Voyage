import { UploadImage } from "../../components/Upload Image/UploadImage.jsx";
import InputField from "../../components/Inputfield/InputField.component";
import Button from "../../components/Button/Button.component";
import { useState } from "react";
import { Send } from "iconsax-react";
import { useCreateCommunity } from "../../hooks/useCreateCommunity.js";
import { Spinner } from "@chakra-ui/react";
import { Colors } from "../../constants/Colors.js";

export const CommunityPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const { handleCreateCommunity, isCreating } = useCreateCommunity();
  
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Create Community
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          <p className="py-2 text-center font-bold text-lg">Create Your Own Community</p>

          {/* <div className="modal-action"> */}
            <form method="dialog">
              <UploadImage imageAsset={imageAsset} setImageAsset={setImageAsset}/>
              <div className="mb-4 ">
                <InputField
                  type="Community Title..."
                  value={title}
                  setValue={setTitle}
                >
               
                </InputField>
              </div>
              <div className="mb-4">
                <InputField
                  type="textarea"
                  value={description}
                  setValue={setDescription}
                  maxLength={300}
                ></InputField>
              </div>

              <div className="my-4">
                  {
                    <Button
                      onClickHandler={() => handleCreateCommunity( imageAsset,title, description)}
                      isDisabled={isCreating}
                    >
                      {isCreating ? (
                        <Spinner color={Colors.white} size={"sm"} />
                      ) : (
                        "Create Community"
                      )}
                    </Button>
                  }
                </div>
            </form>
          </div>
        {/* </div> */}
      </dialog>
    </>
  );
};
