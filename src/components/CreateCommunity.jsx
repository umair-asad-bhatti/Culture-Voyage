import { UploadImage } from "./Upload Image/UploadImage.jsx";
import InputField from "./Inputfield/InputField.component.jsx";
import { Spinner } from "@chakra-ui/react";
import { Colors } from "../constants/Colors.js";
import { useCreateCommunity } from "../hooks/useCreateCommunity.js";
import Button from '../components/Button/Button.component.jsx'
export const CreateCommunity = () => {

    const { handleCreateCommunity, isCreating, title, setTitle, description, setDescription, imageAsset, setImageAsset } = useCreateCommunity();
    const createCommunityButtonHandler = async () => {
        handleCreateCommunity(imageAsset, title, description)
    }
    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <Button
                isDisabled={false}
                onClickHandler={() => document.getElementById("my_modal_1").showModal()}
            >
                Create Community
            </Button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box max-w-5xl">
                    {/* <h3 className="font-bold text-lg">Hello!</h3> */}
                    <p className="py-2 text-center font-bold text-lg">Create Your Own Community</p>
                    {/* <div className="modal-action"> */}
                    <form method="dialog">
                        <UploadImage imageAsset={imageAsset} setImageAsset={setImageAsset} />
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
                                    onClickHandler={createCommunityButtonHandler}
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
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}