import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function onRemoveFriend(id: string, userID: string) {
  const userRef = doc(db, 'users', id);

  await updateDoc(userRef, {
    friends: arrayRemove(userID)
  });

}