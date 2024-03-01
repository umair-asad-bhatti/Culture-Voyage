/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserData } from '../../utils/Firebase Utils Functions'
import { truncateText } from '../../utils'
import { Img } from 'react-image'

const PostCardComponent = ({ postDetail }) => {
    const [author, setAuthor] = useState()
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
                <div className='flex items-center justify-start  gap-4'>
                    <div style={{ width: 50, height: 50 }}>
                        <Img loader={<div className='w-full h-full rounded-full skeleton'></div>} className='rounded-full w-full h-full ' src={author?.Avatar} width={50} height={50} />
                    </div>
                    <Link to={`/post/sdfhkhkj5654jkh63`}>
                        <h1 className='lg:text-lg text-md font-bold text-blAccent dark:text-accent '>{postDetail?.Title}</h1>
                        <span>By @{author?.Username}</span>
                    </Link>
                </div>
                <div className='p-2'>
                    <h1>{postDetail.Description && truncateText(postDetail?.Description, 100)}</h1>
                </div>
                <div className="carousel w-full ">
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
            </div>
        }
    </>
}
export default PostCardComponent