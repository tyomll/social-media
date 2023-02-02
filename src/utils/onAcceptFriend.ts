import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function onAcceptFriend(id: string, userID: string) {
  const userRef = doc(db, 'users', id);

  await updateDoc(userRef, {
    friendRequests: arrayRemove(userID),
  });
  await updateDoc(userRef, {
    friends: arrayUnion(userID),
  });
}