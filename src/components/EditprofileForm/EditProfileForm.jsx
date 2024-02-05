import { useLocation } from "react-router-dom";
import InputField from "../Inputfield/InputField.component";
import { useState } from "react";
import { User, AttachCircle } from 'iconsax-react'
import { Colors } from '../../constants/Colors'
import edit from '../../assets/edit.json'
import Lottie from 'lottie-react'
import Button from '../Button/Button.component'
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

export function EditProfileForm() {
    const { state } = useLocation()
    const [username, setusername] = useState(state.Username)
    const [firstname, setFirstname] = useState(state['First Name'])
    const [lastname, setLastName] = useState(state['Last Name'])
    const [about, setAbout] = useState(state['About'] || '')
    //function to update profile
    const { isUpdating, update } = useUpdateProfile()
    return (
        <div className="w-full flex justify-around">

            <div className="w-96">
                <div className="mb-4 flex gap-4">
                    <div>
                        <h1 className="dark:text-textPrimary text-textSecondary my-2">First Name</h1>
                        <InputField value={firstname} setValue={setFirstname} >
                            <User size="25" color={Colors.accent} />
                        </InputField>
                    </div>
                    <div>
                        <h1 className="dark:text-textPrimary text-textSecondary my-2">Last Name</h1>
                        <InputField value={lastname} setValue={setLastName} >
                            <User size="25" color={Colors.accent} />
                        </InputField>
                    </div>

                </div>
                <div className="my-4">
                    <h1 className="dark:text-textPrimary text-textSecondary my-2">User Name</h1>
                    <InputField value={username} setValue={setusername} >
                        <AttachCircle size="25" color={Colors.accent} />
                    </InputField>
                </div>
                <div className="my-4">
                    <h1 className="dark:text-textPrimary text-textSecondary my-2">About</h1>
                    <InputField maxLength={200} type='textarea' placeholder='Write something about yourself...' value={about} setValue={setAbout} >
                        {/* <User size="25" color={Colors.accent} /> */}

                    </InputField>
                </div>
                <div className=''>

                    <Button isDisabled={isUpdating} onClickHandler={() => update(state.id, { lastname, firstname, username, about })}>
                        {isUpdating ? 'Updating...' : 'Update '}
                    </Button>

                </div>
            </div>
            <div className="text-center md:flex hidden items-center justify-center">
                <div className='w-72 h-auto'>
                    <Lottie animationData={edit} loop={true} />
                </div>
            </div>
        </div>
    )
}
