/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserData } from '../../utils/Firebase Utils Functions'
import { truncateText } from '../../utils'
import { Img } from 'react-image'
import { useDeletePost } from '../../hooks/useDeletePost'
import { UserContext } from '../../context/AuthContext'
import { Heart, Login, MessageProgramming } from 'iconsax-react'
import { db } from '../../firebase/Firebase'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'


const PostCardComponent = ({ postDetail, communityId, postType }) => {
    const [author, setAuthor] = useState()
    const { deletePost, deleting } = useDeletePost()
    const { user } = useContext(UserContext)
    const [isLiked, setIsLiked] = useState(postDetail.Likes.includes(user.uid))
    const [isLiking, setIsLiking] = useState(false)
    //listening to the realtime changes to likes of the post
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'Community Posts', postDetail.id), (doc) => {
            const likesArray = doc.data().Likes ?? []
            setIsLiked(likesArray.includes(user.uid))
        })
        return () => unsubscribe()
    }, [])
    const likeOrDislikePost = async (id) => {
        if (isLiking)
            return
        setIsLiking(true)
        const postRef = doc(db, 'Community Posts', id)
        const snapshot = await getDoc(postRef)
        const likesArray = snapshot.data().Likes ?? []

        if (isLiked) {
            //dislike the post
            const updatedLikesArray = likesArray.filter(item => item != user.uid)
            await updateDoc(postRef, { Likes: updatedLikesArray })

        }
        else {
            //likes the post
            likesArray.push(user.uid)
            await updateDoc(postRef, { Likes: likesArray })

        }
        setIsLiking(false)
    }
    useEffect(() => {
        const getPostAuthor = async () => {
            const res = await getUserData(postDetail['Created By'])
            setAuthor(res)
        }
        getPostAuthor()
    }, [postDetail])

    return <>
        {
            postDetail &&
            <div className='border p-4 shadow bg-primary dark:bg-transparent rounded-xl'>
                <div className='flex items-center justify-between  gap-4'>
                    <div className='flex items-center justify-center gap-4'>

                        <div style={{ width: 50, height: 50 }}>
                            <Img loader={<div className='w-full h-full rounded-full skeleton'></div>} className='rounded-full w-full h-full ' src={author?.Avatar} width={50} height={50} />
                        </div>
                        <Link to={`/post/sdfhkhkj5654jkh63`}>
                            <h1 className='lg:text-lg text-md font-bold text-blAccent dark:text-accent '>{postDetail?.Title}</h1>
                            <span>By @{author?.Username}</span>
                        </Link>
                    </div>
                </div>
                <div className='p-2'>
                    <h1>{postDetail.Description && truncateText(postDetail?.Description, 100)}</h1>
                </div>
                <div className="carousel w-full">
                    {
                        postDetail['Media URL'] && postDetail['Media URL'].map((url, index) => {
                            return <div id={`item${index + 1}`} key={index} className="carousel-item w-1/2 h-60 m-2 rounded-xl shadow border p-2 bg-gray-200 dark:bg-transparent ">
                                {!url.split(".").pop().toLowerCase().includes('mp4') ?
                                    <img src={url} className="object-cover rounded-lg w-full h-full" /> :
                                    <video src={url} className='w-full h-full rounded-xl' controls>
                                    </video>
                                }
                            </div>
                        })
                    }
                </div>

                <div className='flex items-center justify-center gap-8 my-2   bg-slate-100 dark:bg-gray-800 rounded-xl p-2'>
                    <div className='flex items-center justify-center gap-2'>
                        <Heart aria-disabled={isLiking} onClick={() => likeOrDislikePost(postDetail.id)} size="20" variant={isLiked ? 'Bold' : 'Outlined'} className="dark:text-primary text-secondary" />
                        <h1>{postDetail['Likes'].length} </h1>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <MessageProgramming size="20" className="dark:text-primary text-secondary" />
                        <h1 className='text-sm'>0</h1>
                    </div>
                </div>

                <h1 aria-disabled={deleting} onClick={() => deletePost(postDetail.id, communityId, postType)} className="text-warning text-center p-2 border rounded-xl my-4  text-sm cursor-pointer">
                    {deleting ? 'deleting' : 'Delete Post'}
                </h1>
            </div>
        }
    </>
}
export default PostCardComponent