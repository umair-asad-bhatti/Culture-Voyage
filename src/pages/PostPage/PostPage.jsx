import PostCardComponent from "../../components/PostCard/PostCard.Component.jsx";

export const PostPage=()=>{
    return <div className={'grid lg:grid-cols-2  grid-cols-1 gap-4'}>
        <PostCardComponent />
        <PostCardComponent />
        <PostCardComponent />
        <PostCardComponent />
    </div>
}