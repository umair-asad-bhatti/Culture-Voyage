/* eslint-disable react/no-unknown-property */

import Button from "../Button/Button.component";
import InputField from "../Inputfield/InputField.component";


export function CreatePostForm() {
    return (
        <div className="">
            <div className="editor mx-auto w-full h-full flex flex-col text-gray-800 border border-accent rounded shadow-accent p-4 shadow-md dark:shadow-sm max-w-2xl">
                <InputField type={'Title'} />
                <div className="my-4">
                    <InputField type={'textarea'} maxLength={'200'} value={'Description'} />
                </div>

                <div className="icons flex text-gray-500 m-2">

                </div>
                <div className="flex my-4">
                    <Button >
                        <h1>Create Post</h1>
                    </Button>
                </div>
            </div>
        </div>
    )
}
