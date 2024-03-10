import { collection, getDocs, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase/Firebase"
import PostListing from "../../components/PostListing/PostListing"


export const PostPage = () => {

    //fetch all the posts here
    const [posts, setPosts] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    useEffect(() => {

        onSnapshot(collection(db, 'General Posts'), snapshots => {
            let data = []
            snapshots.forEach(snapshot => {
                const postData = snapshot.data();
                data.push({ id: snapshot.id, ...postData });
            })
            setPosts(data);
            setIsFetching(false)
        })

    }, [])
    return <PostListing posts={posts} isFetching={isFetching} postType={'general'} />

}