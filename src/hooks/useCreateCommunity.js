import { CommunityModel } from "../Models/CommunityModel.js";
import {collection, addDoc} from "firebase/firestore";
import { db } from "../firebase/Firebase.js";
import { useToast } from "@chakra-ui/react";
import {useContext, useState} from "react";
import { ToastStrings } from "../constants/ToastStrings.js";
import {UserContext} from "../context/AuthContext.jsx";
import {getDocIfExists} from "../utils/Firebase Utils Functions/index.js";
import {uploadImageAssetToCloudinary} from "../cloudinary/Cloudinary.js";

export const useCreateCommunity = () => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type,setType]=useState('Select the community type')
  const [imageAsset, setImageAsset] = useState(null);
  const [error,setError]=useState(null)
  const handleCreateCommunity = async () => {

    if(!imageAsset || !title || !description){
      setError("Image, Title and description cannot be empty")
      setTimeout(()=>setError(null),3000)
      return;
    }
    try {
        setIsCreating(true);
        const userHasAlreadyCreatedACommunity= await getDocIfExists("Communities","Created By","==",user.uid)
        const communityNameAlreadyExists= await getDocIfExists("Communities","Community Name","==",title)
        if(userHasAlreadyCreatedACommunity){
          setError("You have already created a community.You cannot create more than one community")
          setIsCreating(false);
          setTimeout(()=>setError(null),3000)
        }
        else if(communityNameAlreadyExists){
          setError("Community name already exists")
          setIsCreating(false);
          setTimeout(()=>setError(null),3000)
        }
        else{
          setError(null)
          const {secure_url, public_id}=await uploadImageAssetToCloudinary(imageAsset)
          const createdBy=user?.uid;
          const communityModel = new CommunityModel(secure_url,title, description,createdBy,public_id,type);
          await addDoc(collection(db, "Communities"), {...communityModel});
          toast({
            title: "Community created successfully!",
            status: "success",
            duration: ToastStrings.duration,
            isClosable: true,
          });
        }
    } catch (error) {
      console.error("Error creating community:", error);
      setError("An error occurred. Please try again later")
    } finally {
      setImageAsset(null)
      setTitle("")
      setDescription("")
      setType("Select the community type")
      setIsCreating(false);
    }
  };

  return { handleCreateCommunity,type,setType, error,isCreating, setIsCreating,title,setTitle,description,setDescription,imageAsset,setImageAsset };
};
