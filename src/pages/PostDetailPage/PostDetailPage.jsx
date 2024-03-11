import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../firebase/Firebase"


export const PostDetailPage = () => {
    const { id } = useParams()
    const [data, setdata] = useState(null)
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Optional: for smooth scrolling behavior
        });
    }, []);
    useEffect(() => {
        const getData = async () => {
            const snapshot = await getDoc(doc(db, 'General Posts', id));
            const data = snapshot.data()
            console.log(data);
            setdata(data)
        }
        getData()
    }, [id])
    if (!data)
        return <h1>Loading</h1>
    return <h1 className="dark:text-textPrimary text-secondary font-bold text-2xl">Title: {data.Title}</h1>
}