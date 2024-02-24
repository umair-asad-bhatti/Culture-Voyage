import { UploadImage } from "./Upload Image/UploadImage.jsx";
import InputField from "./Inputfield/InputField.component.jsx";

import { useCreateCommunity } from "../hooks/useCreateCommunity.js";
import Button from '../components/Button/Button.component.jsx'
import { TagsInput } from "./TagsInput/TagsInput.jsx";
import { LoadingSpinner } from "./LoadingSpinner/LoadingSpinner.jsx";
import { AddCircle } from "iconsax-react";


// eslint-disable-next-line react/prop-types
export const CreateCommunity = ({ renderButton = true }) => {

    const { handleCreateCommunity, error, tags, setTags, tagInputValue, setTagInputValue, type, setType, isCreating, title, setTitle, description, setDescription, imageAsset, setImageAsset } = useCreateCommunity();

    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            {renderButton ? <Button
                isDisabled={false}
                onClickHandler={() => document.getElementById("my_modal_1").showModal()}
            >
                +
            </Button> :
                <AddCircle onClick={() => document.getElementById("my_modal_1").showModal()} size={35} className="dark:text-accent text-blAccent cursor-pointer" />}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box max-w-3xl dark:bg-secondary">
                    {/* <h3 className="font-bold text-lg">Hello!</h3> */}
                    <p className="py-2 text-center font-bold text-lg dark:text-primary">Create Your Own Community</p>
                    {/* <div className="modal-action"> */}
                    {error && <p className={'text-center text-error'}>{error}</p>}
                    <form method="dialog"  >
                        <div className={'flex flex-col items-center'}>

                            <UploadImage imgCompressionSize="sm" imageAsset={imageAsset} setImageAsset={setImageAsset} />

                        </div>
                        <div className="my-4 ">
                            <InputField
                                type='text'
                                placeholder="Community Title..."
                                value={title}
                                setValue={setTitle}
                            >
                            </InputField >

                        </div>
                        <div className="mb-4">
                            <InputField
                                type="textarea"
                                value={description}
                                setValue={setDescription}
                                maxLength={100}
                                placeholder="Community Short Description"
                            ></InputField>
                        </div>
                        <div className={'my-2 border-2  dark:border-borderSecondary rounded-lg border-borderPrimary focus-within:border-accent'}>
                            <select value={type} onChange={(e) => setType(e.target.value)} className="select outline-none border-none w-full   dark:bg-secondary  dark:text-textPrimary">
                                <option >Select the community type</option>
                                <option>Sports</option>
                                <option>Food</option>
                                <option>Law</option>
                            </select>
                        </div>
                        <div className={'my-4 flex items-center justify-center w-full'}>
                            <TagsInput placeholder={'Add Tags'} tags={tags} type={type} setTags={setTags} tagInputValue={tagInputValue} setTagInputValue={setTagInputValue} />
                        </div>

                        <button className="dark:text-primary btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="my-4">
                        {
                            <Button
                                onClickHandler={() => handleCreateCommunity(imageAsset, title, description)}
                                isDisabled={isCreating}
                            >
                                {isCreating ? (
                                    <div className="w-full flex items-center justify-center">
                                        <div className="w-8 h-6">
                                            <LoadingSpinner />
                                        </div>
                                    </div>
                                ) : (
                                    "Create Community"
                                )}
                            </Button>
                        }
                    </div>
                </div>
            </dialog>
        </>
    )
}