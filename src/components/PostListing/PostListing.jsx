/* eslint-disable react/prop-types */

import Masonry from 'react-masonry-css'
import PostCardComponent from '../PostCard/PostCard.Component'
import './style.css'
export default function PostListing({ posts, isFetching = false }) {
    if (isFetching)
        return <h1>Loading...</h1>
    if (!isFetching && posts.length == 0)
        return <h1>no data found</h1>
    return (
        <Masonry breakpointCols={{
            default: 2,
            1100: 2,
            700: 1,
            500: 1
        }}
            className="my-masonry-grid "
            columnClassName="my-masonry-grid_column">
            {posts && posts.map((postDetail, index) => <div key={index} className="m-2"><PostCardComponent key={index} postDetail={postDetail} /></div>)}
        </Masonry >
    )
}
