import {uploadImageAssetToCloudinary} from "../cloudinary/Cloudinary.js";
import {doc, updateDoc} from "firebase/firestore";
import {db} from '../firebase/Firebase.js'
import {useState} from "react";
import {useToast} from "@chakra-ui/react";
import {ToastStrings} from "../constants/ToastStrings.js";

export const useUpdateImage=()=>{
    const [imageAsset, setImageAsset] = useState(null);
    const [isImageChanged,setIsImageChanged]=useState(false)
    const [isImageUpdating,setIsImageUpdating]=useState(false)
    const toast=useToast()
    const uploadImageAssetAndUpdateDoc=async(collectionNameToUpdate,docId)=>{
        setIsImageUpdating(true)
        const {secure_url,public_id}=await uploadImageAssetToCloudinary(imageAsset)
        if(collectionNameToUpdate==='Communities'){
            await updateDoc(doc(db, "Communities", docId), {
                ['Banner URL']: secure_url,
                ['Banner Public ID']: public_id,
            });
        }else if(collectionNameToUpdate==='Users'){
            await updateDoc(doc(db, "Users", docId), {
                Avatar: secure_url,
            });
        }
        toast({
            title: "Image updated Successfully",
            status: "success",
            duration: ToastStrings.duration,
            isClosable: true,
        });
        setIsImageChanged(false)
        setIsImageUpdating(false)
    }
    const handleImageChange = (e) => {
        setIsImageChanged(true)
        const file = e.target.files[0];
        if (file) {
            setImageAsset(file);
        } else {
            setImageAsset(null);
        }
    };

    return {imageAsset, uploadImageAssetAndUpdateDoc,handleImageChange,isImageChanged,isImageUpdating,setImageAsset}
}