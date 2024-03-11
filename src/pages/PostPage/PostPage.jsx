import { collection, onSnapshot } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { db } from "../../firebase/Firebase"
import PostListing from "../../components/PostListing/PostListing"
import { UserContext } from "../../context/AuthContext"



export const PostPage = () => {

    //fetch all the posts here  
    const { user } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    useEffect(() => {
        onSnapshot(collection(db, 'General Posts'), snapshots => {
            let data = []
            snapshots.forEach(snapshot => {
                const postData = snapshot.data();
                if (user.uid != postData['Created By'])
                    data.push({ id: snapshot.id, ...postData });
            })
            setPosts(data);
            setIsFetching(false)
        })

    }, [user.uid])
    return <PostListing posts={posts} isFetching={isFetching} postType={'general'} />

}