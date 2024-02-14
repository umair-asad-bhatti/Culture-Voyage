/* eslint-disable react/no-unknown-property */

import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button.component";
import InputField from "../Inputfield/InputField.component";
import { getUserData } from "../../utils/Firebase Utils Functions";
import { ArrowCircleDown2 } from "iconsax-react";
import { Img } from "react-image";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/Firebase";



export function CreatePostForm() {
    const [postCategory, setPostCategory] = useState('Select Category')
    const [activeTab, setActiveTab] = useState('details')
    const [user, setUser] = useState(null)
    const [joinedCommunities, setJoinedCommunities] = useState([])
    const userDataFromLocal = localStorage.getItem('user')
    const userId = JSON.parse(userDataFromLocal).uid
    useEffect(() => {
        console.log(postCategory);
    }, [postCategory])
    useEffect(() => {
        const fetchUser = async () => {
            const UserData = await getUserData(userId)
            setUser(UserData)
            const joinedCommunitiesIDS = UserData['Joined Communities']
            const snapshots = await getDocs(query(collection(db, 'Communities'), where(documentId(), 'in', joinedCommunitiesIDS)))
            let temp = []
            snapshots.forEach((snapshot) => {
                temp.push({ id: snapshot.id, ...snapshot.data() })
            })
            setJoinedCommunities(temp)
        }
        fetchUser()
    }, [userId])
    const SelectIconRef = useRef(null)
    const dropdown = useRef(null)
    const result = useRef(null)

    const handleClick = () => {
        const elem = dropdown.current
        elem.style.display == 'block' ? elem.style.display = 'none' : elem.style.display = 'block'

    }
    const setActive = (active) => {
        setPostCategory(active)
        dropdown.current.style.display = 'none'
    }
    return (
        <div className="flex items-start justify-around flex-wrap p-4">
            <div className="editor md:w-96 h-full flex flex-col text-gray-800   p-4 shadow-md dark:shadow-darkGrey dark:shadow-sm">
                {/* active tabs button */}
                <div className="flex gap-2">
                    <Button onClickHandler={() => { setActiveTab('details') }} outline={activeTab == 'details' ? false : true}>
                        Details
                    </Button>
                    <Button onClickHandler={() => { setActiveTab('media') }} outline={activeTab == 'media' ? false : true}>
                        Media
                    </Button>
                </div>

                <div>
                    {
                        activeTab == 'details' ? <>
                            <div className=" relative w-full border p-2 rounded my-4 flex items-center justify-between">
                                <div ref={dropdown} className="h-auto absolute hidden bg-softGrey border shadow-lg p-4 top-10 rounded left-0 w-full">
                                    user
                                    <div onClick={() => setActive(user['First Name'])} className="flex items-center cursor-pointer justify-start gap-4 border border-t-0 border-l-0 border-r-0 border-b-2 pb-4">
                                        <img src={user?.Avatar} alt="" width={50} height={50} className="rounded-full" />
                                        <h1>{user && user['First Name']}</h1>
                                    </div>
                                    communities
                                    <div>
                                        {
                                            joinedCommunities.map((c) => {
                                                return <div key={c.id} onClick={() => setActive(c['Community Name'])} className="flex items-center cursor-pointer justify-start gap-4 py-4">
                                                    <img src={c['Community Logo URL']} alt="" width={50} height={50} className="rounded-full" />
                                                    <h1>{c['Community Name']}</h1>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div ref={result} className="dark:text-textPrimary text-textSecondary" >c/{postCategory}</div>
                                <div onClick={handleClick} ref={SelectIconRef} id="select-icon">
                                    <ArrowCircleDown2 size={25} className="dark:text-textPrimary text-textSecondary" />
                                </div>
                            </div>
                            <InputField type={'text'} placeholder="Title" />
                            <div className="my-4">
                                <InputField type={'textarea'} maxLength={'200'} placeholder="Description" />
                            </div>
                            <div className="flex my-4">
                                <Button >
                                    <h1>Create Post</h1>
                                </Button>
                            </div>
                        </> :
                            <>
                                <div>

                                </div>

                            </>
                    }
                </div>
            </div>



            <div className={`md:block hidden ${postCategory != 'Select Category' ? 'border-2' : 'border-none'} dark:border-accent border-blAccent p-4 w-96`}>
                {
                    postCategory === (user && user['First Name']) ? <div div className="card">
                        <Img loader={() => <div className="w-[50px] h-[50px] rounded-full skeleton"></div>} src={user?.Avatar} alt="" width={50} height={50} className="rounded-full" />
                        <h1 className="dark:text-textPrimary text-textSecondary">{user && user['First Name']}</h1>
                    </div> :
                        <>
                            {joinedCommunities.map((c) => {
                                if (c['Community Name'] == postCategory) {
                                    return <h1>{c['Community Name']}</h1>
                                }
                            })}
                        </>
                }
            </div>
        </div >
    )
}
