import React from 'react'
import swal from 'sweetalert';
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { uuidv4 } from '@firebase/util';
import { auth, db, storage } from "../firebase";
import { StoryDataType } from '../types/storyData.type';

export const useStories = () => {
  const [stories, setStories] = React.useState<StoryDataType[]>()
  const [storyImages, setStoryImages] = React.useState<string[]>()

  async function uploadStory(story: string) {
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
          swal({
            title: "Oops ErRoR...",
            text: e.message,
            icon: "error",
          });
        })
      }).catch((e) => {
        swal({
          title: "Oops ErRoR...",
          text: e.message,
          icon: "error",
        });
      })
    }
    else {
      swal({
        title: "You must fill all fields.",
        icon: "warning",
      });
    }
  }
  const getStories = async () => {
    const q = query(collection(db, "stories"), orderBy('date', 'desc'));
    onSnapshot(q, (data) => {
      const dataa = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown>, id: doc.id })) as any
      setStories(dataa)
    })
  }
  const getStoryImages = async () => {
    const q = query(collection(db, "stories"), orderBy('date', 'desc'));
    onSnapshot(q, (data) => {
      const dataa = data.docs.map((doc) => (doc.data().image)) as any

      setStoryImages(dataa)
    })
  }
  return { stories, storyImages, getStories, uploadStory, getStoryImages }
}