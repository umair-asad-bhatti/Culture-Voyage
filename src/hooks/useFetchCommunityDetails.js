import { useCallback, useEffect, useState } from "react";
import { getFirebaseDoc } from "../utils/Firebase Utils Functions/index.js";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Firebase.js";
export const useFetchCommunityDetails = (id) => {
    const [CommunityData, setCommunityData] = useState({})
    const [isFetching, setIsFetching] = useState(false)

    const getCommunityDetails = useCallback(async () => {
        setIsFetching(true)
        try {
            const data = await getFirebaseDoc("Communities", id)
            setCommunityData(data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsFetching(false)
        }
    }, [id])
    useEffect(() => {
        getCommunityDetails()
        const unSub = onSnapshot(doc(db, 'Communities', id), async (doc) => {
            setCommunityData({ id, ...doc.data() });
        })
        //get communitites members
        return () => unSub()
    }, [getCommunityDetails, id])
    return { isFetching, CommunityData };
}