import React from 'react'
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { uuidv4 } from '@firebase/util';
import { auth, db, storage } from "../firebase";

export const useStories = () => {
  const [stories, setStoires] = React.useState<any>()

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

  return { stories, uploadStory }
}