import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function onLike(id: string, userID: string, isPostLiked: boolean) {
  const postRef = doc(db, 'posts', id);

  await updateDoc(postRef, {
    likes: isPostLiked ? arrayRemove(userID) : arrayUnion(userID),
  });
}