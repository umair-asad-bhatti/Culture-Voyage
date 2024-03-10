import { useState, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/Firebase.js";
import { UserContext } from "../context/AuthContext.jsx";
import { ToastStrings } from "../constants/ToastStrings.js";
import { uploadImageAssetToCloudinary } from "../cloudinary/Cloudinary.js";
import { CommunityPostModel } from "../Models/CommunityPostModel.js";
import { GeneralPostModel } from "../Models/GeneralPostModel.js";
import { getUserData } from "../utils/Firebase Utils Functions/index.js";

export const useCreatePost = () => {
  const user = JSON.parse(localStorage.getItem('userDetails'))

  const toast = useToast()
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [postCategory, setPostCategory] = useState("Select Category");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageAsset, setImageAsset] = useState([]);
  const [communityId, setCommunityId] = useState(null);
  const [postType, setPostType] = useState("");
  const [showPostType, setShowPostType] = useState(false);
  //console.log(title,description,imageAsset,communityId,postType);

  const handleCreatePost = async (userId) => {
    if (!title || !description || (showPostType && !postType) || postCategory == 'Select Category') {
      toast({
        title: 'Warning',
        description: 'All the fields must be filled properly',
        status: 'warning',
        duration: ToastStrings.duration,
        isClosable: true,
      })
      return;
    }

    try {

      setIsCreating(true);
      const url = [];
      const publicId = [];
      if (postCategory == user['First Name']) {

        //1 . Users =>General Posts [post id]
        //2.  General Posts =>doc=>


        //creating the post in general post collection

        //1. upload all the images in the storage
        if (imageAsset.length > 0)
          for (let i = 0; i < imageAsset.length; i++) {
            const { secure_url, public_id } = await uploadImageAssetToCloudinary(
              imageAsset[i]
            );
            url.push(secure_url);
            publicId.push(public_id);
            //console.log("Uploaded")
          }
        //2. Creat the post using the model
        const generalPost = new GeneralPostModel(userId, description, title, publicId, url)
        //3. Add the created post in firebase General Posts collection
        const { id } = await addDoc(collection(db, 'General Posts'), { ...generalPost })

        //4. Add the id to General Posts field in Users collection
        const querySnapshot = await getDoc(doc(db, 'Users', userId))
        const data = querySnapshot.data();
        const userGeneralPosts = data['General Posts'] ?? []
        console.log(userGeneralPosts);
        userGeneralPosts.push(id)
        const dataToUpdate = {}
        dataToUpdate['General Posts'] = userGeneralPosts
        updateDoc(doc(db, 'Users', userId), dataToUpdate)
        toast({
          title: "Post created successfully!",
          status: "success",
          duration: ToastStrings.duration,
          isClosable: true,
        });

      }
      else {
        for (let i = 0; i < imageAsset.length; i++) {
          const { secure_url, public_id } = await uploadImageAssetToCloudinary(
            imageAsset[i]
          );
          url.push(secure_url);
          publicId.push(public_id);
          //console.log("Uploaded")
        }

        const createdBy = userId;
        const communitypostModel = new CommunityPostModel(
          createdBy,
          communityId,
          description,
          title,
          publicId,
          url,
          postType
        );

        const transactionFunction = async (transaction) => {
          const communityPostRef = collection(db, "Community Posts");

          const { id } = await addDoc(communityPostRef, {
            ...communitypostModel,
          });

          const userDocRef = doc(db, "Users", userId);
          const communityDocRef = doc(db, "Communities", communityId);

          const userDoc = await transaction.get(userDocRef);
          const communityDoc = await transaction.get(communityDocRef);

          const userData = userDoc.data();
          const communityData = communityDoc.data();

          const userCreatedPosts = userData["Community Posts"] ?? [];
          const userCreatedCommunityPosts =
            communityData[`${postType} Posts`] ?? [];

          userCreatedPosts.push(id);
          userCreatedCommunityPosts.push(id);

          transaction.update(userDocRef, {
            ["Community Posts"]: [...userCreatedPosts],
          });

          transaction.update(communityDocRef, {
            [`${postType} Posts`]: [...userCreatedCommunityPosts],
          });

          return id;
        };

        const postId = await runTransaction(db, transactionFunction);

        toast({
          title: "Post created successfully!",
          status: "success",
          duration: ToastStrings.duration,
          isClosable: true,
        });
      }

    }
    catch (error) {
      console.error("Error creating post:", error);
      setError("An error occurred. Please try again later");
    } finally {
      setImageAsset([]);
      setTitle("");
      setDescription("");
      setCommunityId(null);
      setPostType("");
      setIsCreating(false);
    }
  };

  return {
    handleCreatePost,
    error,
    isCreating,
    showPostType, setShowPostType,
    title,
    description,
    postCategory, setPostCategory,
    communityId,
    imageAsset,
    postType,
    setTitle,
    setDescription,
    setImageAsset,
    setCommunityId,
    setPostType,
    setIsCreating,
  };
};
