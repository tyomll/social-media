import React from 'react'

import { PostDataType } from './../types/postData.type';
import { collection, addDoc, onSnapshot, query, orderBy, where, } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from '@firebase/util';
import { auth, db, storage } from "../firebase";

interface IncomingPostType {
  text: string,
  image: File | undefined;
}
export const usePost = () => {
  const [posts, setPosts] = React.useState<PostDataType[]>()

  async function uploadPost(post: IncomingPostType) {
    const fileRef = ref(storage, 'postImages/' + uuidv4() + '.png')
    if (post.text !== '' && post.image) {
      await uploadBytes(fileRef, post.image, { contentType: 'image/png' }).then(async () => {
        await getDownloadURL(fileRef).then(async (imageURL: string) => {
          const postCollectionRef = collection(db, 'posts');
          await addDoc(postCollectionRef, {
            id: uuidv4(),
            author: {
              id: auth.currentUser?.uid,
            },
            text: post.text,
            image: imageURL,
            likes: [],
            date: Date.now()
          });

        }).catch((e) => {
          console.log(e.message)
        })
        console.log('Posted')
      }).catch((e) => {
        console.log(e.message)
      })
    }
    else {
      console.log('fill all fields')
    }
  }

  const getPosts = async () => {
    const q = query(collection(db, "posts"), orderBy('date', 'desc'));
    onSnapshot(q, (data) => {
      const dataa = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown>, id: doc.id })) as any
      setPosts(dataa)
    })
  }
  const getUserPosts = async (id: string) => {
    const q = query(collection(db, "posts"), where('author.id', '==', id), orderBy('date', 'desc'));
    onSnapshot(q, (data) => {
      const dataa = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown>, id: doc.id })) as any
      setPosts(dataa)
    })
  }
  return { posts, getUserPosts, getPosts, uploadPost }
}