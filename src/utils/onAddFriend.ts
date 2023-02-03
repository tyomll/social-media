import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function onAddFriend(id: string, userID: string, isFriendAdded: boolean) {
  const userRef = doc(db, 'users', id);

  await updateDoc(userRef, {
    friendRequests: isFriendAdded ? arrayRemove(userID) : arrayUnion(userID),
  });

}