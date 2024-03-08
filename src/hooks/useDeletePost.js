import { doc, runTransaction } from "firebase/firestore"
import { db } from "../firebase/Firebase"
import { UserContext } from "../context/AuthContext"
import { useContext, useState } from "react"
import { getUserData } from "../utils/Firebase Utils Functions"
import { useToast } from "@chakra-ui/react"
import { ToastStrings } from "../constants/ToastStrings"

const useDeletePost = () => {
    const { user } = useContext(UserContext)
    const [deleting, setDeleting] = useState(false)
    const toast = useToast()
    const deletePost = async (postId, communityId, postType) => {
        setDeleting(true)
        const communityRef = doc(db, "Communities", communityId)
        const postRef = doc(db, 'Community Posts', postId)
        const userRef = doc(db, 'Users', user.uid)
        try {
            await runTransaction(db, async (transaction) => {
                //perform the writes first
                const snapshot = await transaction.get(communityRef)
                const communityData = snapshot.data()
                let exp_posts = communityData['Experience Posts']
                let que_posts = communityData['Question Posts']
                //performing the deletion
                // 1. delete the post from community post collection
                transaction.delete(postRef)
                // 2. delete the post from respective community
                if (postType == 'exp') {
                    exp_posts = exp_posts.filter(p => p != postId)
                    const dataToUpdate = {}
                    dataToUpdate['Experiece Posts'] = exp_posts
                    transaction.update(communityRef, dataToUpdate)
                } else {
                    que_posts = que_posts.filter(p => p != postId)
                    const dataToUpdate = {}
                    dataToUpdate['Question Posts'] = que_posts
                    transaction.update(communityRef, dataToUpdate)
                }
                //3. delete the post from users collecion
                let userCommunityPosts = await getUserData(user.uid, 'Community Posts')
                userCommunityPosts = userCommunityPosts.filter(p => p != postId)
                const dataToUpdate = {}
                dataToUpdate['Community Posts'] = userCommunityPosts
                transaction.update(userRef, dataToUpdate)
            });
            toast({
                title: 'Post Deleted Successfully',
                duration: ToastStrings.duration,
                status: 'success',
                isClosable: true
            })
        } catch (e) {
            console.log("Transaction failed: ", e);
        } finally {
            setDeleting(false)
        }
    }
    return { deletePost, deleting }
}
export { useDeletePost }

