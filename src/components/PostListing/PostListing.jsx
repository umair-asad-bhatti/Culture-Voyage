/* eslint-disable react/prop-types */

import Masonry from 'react-masonry-css'
import PostCardComponent from '../PostCard/PostCard.Component'
import './style.css'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
export default function PostListing({ posts, isFetching, communityId = null, postType }) {

    if (isFetching)
        return <div className='flex items-center justify-center h-full' >
            <div className='w-20 h-20'>
                <LoadingSpinner />
            </div>
        </div>
    if (!isFetching && posts.length == 0)
        return <h1>no data found</h1>
    //delete experience post 

    return (
        <Masonry breakpointCols={{
            default: 2,
            1100: 2,
            700: 1,
            500: 1
        }}
            className="my-masonry-grid "
            columnClassName="my-masonry-grid_column">
            {posts && posts.map((postDetail, index) => <div key={index} className="m-2"><PostCardComponent communityId={communityId} postType={postType} key={index} postDetail={postDetail} /></div>)}
        </Masonry >
    )
}
