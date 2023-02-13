import swal from 'sweetalert';
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function onSelectChat(id: string) {
  const combinedId =
    auth.currentUser!.uid > id ? auth.currentUser!.uid + id : id + auth.currentUser!.uid;
  try {
    const data = await getDoc(doc(db, 'chats', combinedId));

    if (!data.exists()) {
      await setDoc(doc(db, 'chats', combinedId), { messages: [] });

      await updateDoc(doc(db, 'userChats', auth.currentUser!.uid), {
        [combinedId + '.userInfo']: {
          id,
        },
        [combinedId + '.date']: Date.now(),
      });
      await updateDoc(doc(db, 'userChats', id), {
        [combinedId + '.userInfo']: {
          id: auth.currentUser?.uid,
        },
        [combinedId + '.date']: Date.now(),
      });
    }
  } catch (e: any) {
    swal({
      title: "Oops ErRoR...",
      text: e.message,
      icon: "error",
    });
  }
}