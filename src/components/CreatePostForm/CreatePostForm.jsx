/* eslint-disable react/no-unknown-property */

import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button.component";
import InputField from "../Inputfield/InputField.component";
import { getUserData } from "../../utils/Firebase Utils Functions";
import { ArrowCircleDown2, Lock } from "iconsax-react";



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
    const result = useRef(null)
    const handleClick = () => {
        const elem = dropdown.current
        elem.style.display == 'block' ? elem.style.display = 'none' : elem.style.display = 'block'
    }
    const setActive = () => {
        result.current.innerHTML = `${user['First Name']}`
        dropdown.current.style.display = 'none'
    }
    return (
        <div className="flex items-center justify-around flex-wrap ">
            <div className="editor md:w-96 h-full flex flex-col text-gray-800 border border-accent rounded shadow-accent p-4 shadow-md dark:shadow-sm">
                <div className=" relative w-full border p-2 rounded my-4 flex items-center justify-between">
                    <div ref={result} className="dark:text-textPrimary text-textSecondary" >Select Category</div>
                    <div onClick={handleClick} ref={SelectIconRef} id="select-icon"><ArrowCircleDown2 size={20} className="dark:text-textPrimary text-textSecondary" /></div>
                    <div ref={dropdown} className="h-32 absolute hidden bg-darkGrey border shadow-lg p-4 top-10 rounded left-0 w-full">
                        <div onClick={setActive}>

                            <img src={user?.Avatar} alt="" width={50} height={50} className="rounded-full" />
                        </div>
                    </div>
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
