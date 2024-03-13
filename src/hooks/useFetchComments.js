import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase/Firebase.js";

export const useFetchComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let unsubscribe;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const commentsQuery = query(
          collection(db, 'Comments'),
          where('Post ID', '==', postId)
        );

        unsubscribe =  onSnapshot(commentsQuery, (snapshot) => {
          const commentsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
         setComments(commentsData);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to fetch comments. Please try again later.');
        setIsLoading(false);
      }
    };

     fetchComments();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [postId]);

  return { comments, isLoading, error };
};
