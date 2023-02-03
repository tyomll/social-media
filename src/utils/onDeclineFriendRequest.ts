import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function onDeclineFriendRequest(id: string, userID: string) {
  const userRef = doc(db, 'users', userID);

  await updateDoc(userRef, {
    friendRequests: arrayRemove(id)
  });
}