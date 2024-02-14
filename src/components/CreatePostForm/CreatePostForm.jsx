/* eslint-disable react/no-unknown-property */

import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button.component";
import InputField from "../Inputfield/InputField.component";
import { getUserData } from "../../utils/Firebase Utils Functions";
import { ArrowCircleDown2, Lock } from "iconsax-react";



export function CreatePostForm() {
    const [postCategory, setPostCategory] = useState('Select Category')
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

        setPostCategory(user['First Name'])
        dropdown.current.style.display = 'none'
    }
    return (
        <div className="flex items-center justify-around flex-wrap ">
            <div className="editor md:w-96 h-full flex flex-col text-gray-800 border border-accent rounded shadow-accent p-4 shadow-md dark:shadow-sm">
                <div className=" relative w-full border p-2 rounded my-4 flex items-center justify-between">
                    <div ref={result} className="dark:text-textPrimary text-textSecondary" >{postCategory}</div>
                    <div onClick={handleClick} ref={SelectIconRef} id="select-icon"><ArrowCircleDown2 size={25} className="dark:text-textPrimary text-textSecondary" /></div>
                    <div ref={dropdown} className="h-32 absolute hidden bg-darkGrey border shadow-lg p-4 top-10 rounded left-0 w-full">
                        <div onClick={setActive} className="flex items-center cursor-pointer justify-start gap-4 border border-t-0 border-l-0 border-r-0 border-b-2 pb-4">
                            <img src={user?.Avatar} alt="" width={50} height={50} className="rounded-full" />
                            <h1>{user && user['First Name']}</h1>
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
            <div className={`md:block hidden ${postCategory != 'Select Category' ? 'border' : 'border-none'}  p-4 w-96`}>
                {
                    postCategory === (user && user['First Name']) && <div div className="card">
                        <img src={user?.Avatar} alt="" width={50} height={50} className="rounded-full" />
                        <h1 className="dark:text-textPrimary text-textSecondary">{user && user['First Name']}</h1>
                    </div>}
            </div>
        </div >
    )
}
