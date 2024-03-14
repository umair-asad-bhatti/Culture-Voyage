import { useState, useEffect, useContext } from 'react';
import { db } from "../firebase/Firebase.js";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../context/AuthContext.jsx";
import { ToastStrings } from "../constants/ToastStrings.js";
import { CommentModel } from '../Models/CommentModel.js';

export const useAddComment = () => {
  const toast = useToast();

  const { user } = useContext(UserContext);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [error, setError] = useState(null);

  const addComment = async (description, postID) => {
    setError(null);

    try {
      setIsAddingComment(true);

      const commentModel = new CommentModel(user?.uid, description, postID);
      await addDoc(collection(db, "Comments"), { ...commentModel });

      toast({
        title: 'Comment added successfully!',
        status: 'success',
        duration: ToastStrings.duration,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('An error occurred while adding the comment. Please try again later.');
    } finally {
      setIsAddingComment(false);
    }
  };

  return { addComment, isAddingComment, error };
};
