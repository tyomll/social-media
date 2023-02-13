import { uuidv4 } from '@firebase/util';
import { updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';

export const onMessageSend = async (message: { text: string, image: string }, userID: string | null, chatID: string | null,) => {

  if (chatID) {
    if (message.image) {
      let imageBlob;
      if (typeof message.image === 'string') {
        imageBlob = new Blob([message.image], { type: 'image/png' });
      } else {
        imageBlob = message.image;
      }
      const fileRef = ref(storage, 'messageImages/' + uuidv4());
      await uploadBytes(fileRef, imageBlob, { contentType: 'image/png' }).then(async () => {
        await getDownloadURL(fileRef).then(async (imageURL) => {
          await updateDoc(doc(db, 'chats', chatID), {
            messages: arrayUnion({
              id: uuidv4(),
              text: message.text,
              image: imageURL,
              senderID: auth.currentUser?.uid,
              date: Date.now(),
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, 'chats', chatID), {
        messages: arrayUnion({
          id: uuidv4(),
          text: message.text,
          senderID: auth.currentUser?.uid,
          date: Date.now(),
        }),
      });
    }
    await updateDoc(doc(db, 'userChats', auth.currentUser!.uid), {
      [chatID + '.lastMessage']: {
        text: message.text,
      },
      [chatID + '.date']: Date.now(),
    })
    await updateDoc(doc(db, 'userChats', userID!), {
      [chatID + '.lastMessage']: {
        text: message.text,
      },
      [chatID + '.date']: Date.now(),
    })
  }

};