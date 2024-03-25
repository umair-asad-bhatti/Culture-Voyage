import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from "../firebase/Firebase.js";

export const useFetchComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const commentsQuery = query(
          collection(db, 'Comments'),
          where('Post ID', '==', postId),
        );
        onSnapshot(commentsQuery, (snapshot) => {
          const commentsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          commentsData.sort((a, b) => b['Created At'] - a[['Created At']]);
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

  }, [postId]);

  return { comments, isLoading, error };
};
