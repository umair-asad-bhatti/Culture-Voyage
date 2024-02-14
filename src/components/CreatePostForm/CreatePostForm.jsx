/* eslint-disable react/no-unknown-property */

import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button.component";
import InputField from "../Inputfield/InputField.component";
import { getUserData } from "../../utils/Firebase Utils Functions";
import { Lock } from "iconsax-react";



export function CreatePostForm() {
    const [postCategory, setPostCategory] = useState()
    const [user, setUser] = useState(null)
    const userDataFromLocal = localStorage.getItem('user')
    const userId = JSON.parse(userDataFromLocal).uid
    useEffect(() => {
        const fetchUser = async () => {
            const UserData = await getUserData(userId)
            setUser(UserData)
        }
        fetchUser()
    }, [])
    const SelectIconRef = useRef(null)
    const dropdown = useRef(null)

    const handleClick = () => {
        if (dropdown.current.style.display == "block")
            dropdown.current.style.display = "none";
        else
            dropdown.current.style.display = "block"
    }
    return (
        <div className="flex items-center justify-around flex-wrap ">
            <div className="editor md:w-96 h-full flex flex-col text-gray-800 border border-accent rounded shadow-accent p-4 shadow-md dark:shadow-sm">
                <div className=" relative w-full border p-2 rounded my-4 flex items-center justify-between">
                    <div>sdf</div>
                    <div onClick={handleClick} ref={SelectIconRef} id="select-icon"><Lock size={20} color="red" /></div>
                    <div ref={dropdown} className="h-32 absolute hidden bg-red-500 top-10 rounded left-0 w-full">sdf</div>
                </div>
                <InputField type={'text'} placeholder="Title" />
                <div className="my-4">
                    <InputField type={'textarea'} maxLength={'200'} placeholder="Description" />
                </div>
                <div className="icons flex text-gray-500 m-2">
                </div>
                <div className="flex my-4">
                    <Button >
                        <h1>Create Post</h1>
                    </Button>
                </div>
            </div>
            <div className="md:block hidden  p-4 w-96">
                Rules of our website and if community is selected than show card with community information
                and if user selects profile post than show card with profile information
            </div>
        </div>
    )
}
