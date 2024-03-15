import { useEffect, useState } from 'react'
import InputField from '../../components/Inputfield/InputField.component'
import { useParams, useSearchParams } from 'react-router-dom'
import { db } from '../../firebase/Firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Button from '../../components/Button/Button.component'
import { useToast } from '@chakra-ui/react'
import { ToastStrings } from '../../constants/ToastStrings'

export const EditPost = () => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const type = searchParams.get('type')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const toast = useToast()
    const [isFetching, setIsFetching] = useState(true)
    useEffect(() => {
        const getData = async () => {
            const snapshot = await getDoc(doc(db, `${type == 'general' ? 'General Posts' : 'Community Posts'}`, id));
            const data = snapshot.data();
            setTitle(data.Title)
            setDescription(data.Description)
            setIsFetching(false)
        };
        getData();
    }, [id, type]);
    const handleEditPost = async () => {
        if (title.trim().length == 0 || description.trim().length == 0) {
            toast({
                title: 'Error',
                description: 'Title and Description cannot be empty',
                status: 'error',
                duration: ToastStrings.duration,
                isClosable: true,
            })
            return
        }
        //update the doc
        const docRef = doc(db, `${type == 'general' ? 'General Posts' : 'Community Posts'}`, id)
        await updateDoc(docRef, { Title: title, Description: description, Edited: true })
        toast({
            title: 'Success',
            description: 'Title and Description has been updated',
            status: 'success',
            duration: ToastStrings.duration,
            isClosable: true,
        })
    }
    if (isFetching)
        return <h1>loading...</h1>
    return (
        <div className='flex flex-col gap-8 w-96'>
            <InputField placeholder='Enter new title' value={title} setValue={setTitle} />
            <InputField placeholder='Enter new description' value={description} setValue={setDescription} maxLength={300} type={'textarea'} />
            <Button isDisabled={false} outline={false} onClickHandler={() => handleEditPost()}>
                Edit
            </Button>
        </div>
    )
}
