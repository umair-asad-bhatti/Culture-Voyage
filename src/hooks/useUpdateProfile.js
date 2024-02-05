import { useState } from "react"
import { db } from '../firebase/Firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useToast } from "@chakra-ui/react"
import { ToastStrings } from '../constants/ToastStrings'
export const useUpdateProfile = () => {

    const [isUpdating, setIsUpdating] = useState(false)
    const toast = useToast()
    const update = async (id, data) => {

        const { firstname, lastname, username, about } = data
        if (!firstname.trim() || !lastname.trim() || !username.trim()) {
            toast({
                title: 'Username, first and last cannot be empty',
                duration: ToastStrings.duration,
                status: 'warning',
                isClosable: true
            })
            return
        }
        setIsUpdating(true)
        const dataToUpdate = {}
        dataToUpdate['First Name'] = firstname.trim()
        dataToUpdate['Last Name'] = lastname.trim()
        dataToUpdate['Username'] = username.trim()
        dataToUpdate['About'] = about.trim()
        await updateDoc(doc(db, 'Users', id), { ...dataToUpdate })
        setIsUpdating(false)
        toast({
            title: 'Update succcesfull',
            duration: ToastStrings.duration,
            status: 'success',
            isClosable: true
        })
    }
    return { isUpdating, update }

}