import { CommunityModel } from "../Models/CommunityModel.js";
import {collection, addDoc, query, where, getDocs} from "firebase/firestore";
import { db } from "../firebase/Firebase.js";
import { useToast } from "@chakra-ui/react";
import {useContext, useState} from "react";
import { ToastStrings } from "../constants/ToastStrings.js";
import axios from "axios";
import {UserContext} from "../context/AuthContext.jsx";
import {getDocIfExists} from "../utils/Firebase Utils Functions/index.js";

export const useCreateCommunity = () => {
  const preset_key = "culture voyage";
  const cloud_name = "dxudpps7i";
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type,setType]=useState('')
  const [imageAsset, setImageAsset] = useState(null);
  const [error,setError]=useState(null)
  const handleCreateCommunity = async () => {

    if(!imageAsset || !title || !description){
      setError("Image, Title and description cannot be empty")
      setTimeout(()=>setError(null),3000)
      return;
    }
    setIsCreating(true);
    try {
        //trying to fetch the community with Community Name===title
        const result_one= await getDocIfExists("Communities","Created By","==",user.uid)
        const result_two= await getDocIfExists("Communities","Community Name","==",title)
        //Check if community with created At==userId is exists or not
        if(result_one){
          setError("You have already created a community.You cannot create more than one community")
          setIsCreating(false);
          setTimeout(()=>setError(null),3000)
        }
        else if(result_two){
          setError("Community name already exists")
          setIsCreating(false);
          setTimeout(()=>setError(null),3000)
        }
        else{
          setError(null)
          const formData = new FormData();
          formData.append('file',imageAsset);
          formData.append("upload_preset",preset_key);
          const {data}= await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
          const logoURL=data.secure_url;
          const logoID=data.public_id;
          const createdBy=user?.uid;
          const communityModel = new CommunityModel(logoURL,title, description,createdBy,logoID,type);
          const communityCollectionRef = collection(db, "Communities");
          // Converting the communityModel to a JavaScript object
          const communityData = { ...communityModel};
          await addDoc(communityCollectionRef, communityData);

          toast({
            title: "Community created successfully!",
            status: "success",
            duration: ToastStrings.duration,
            isClosable: true,
          });
        }
    } catch (error) {
      console.error("Error creating community:", error);
      toast({
        title: "Error creating community.",
        description: "An error occurred while creating the community.",
        status: "error",
        duration: ToastStrings.duration,
        isClosable: true,
      });
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
