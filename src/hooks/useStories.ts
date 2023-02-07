import React from 'react'
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { uuidv4 } from '@firebase/util';
import { auth, db, storage } from "../firebase";

export const useStories = () => {
  const [stories, setStories] = React.useState<any>()

  async function uploadStory(story: any) {
    const fileRef = ref(storage, 'storyImages/' + uuidv4() + '.png')

    if (story) {
      await uploadString(fileRef, story, 'data_url').then(async () => {
        await getDownloadURL(fileRef).then(async (storyImageURL: string) => {
          const storiesCollectionRef = collection(db, 'stories');
          await addDoc(storiesCollectionRef, {
            id: uuidv4(),
            author: {
              id: auth.currentUser?.uid,
            },
            image: storyImageURL,
            date: Date.now()
          });

        }).catch((e) => {
          console.log(e.message)
        })
      }).catch((e) => {
        console.log(e.message)
      })
    }
    else {
      console.log('fill all fields')
    }
  }
  const getStories = async () => {
    const q = query(collection(db, "stories"), orderBy('date', 'desc'));
    onSnapshot(q, (data) => {
      const dataa = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown>, id: doc.id })) as any
      setStories(dataa)
    })
  }

  return { stories, getStories, uploadStory }
}