import React from 'react'
import { CommentDataType } from './../types/commentData.type';
import { uuidv4 } from "@firebase/util";
import { collection, addDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";

export const useComments = (id?: string, comment?: string, setComment?: (arg: string) => void) => {
  const [comments, setComments] = React.useState<CommentDataType[]>()

  async function onAddComment() {
    if (comment) {
      if (setComment) setComment('');
      const commentsRef = collection(db, "comments");
      await addDoc(commentsRef, {
        id: uuidv4(),
        postId: id,
        author: {
          id: auth.currentUser?.uid,
        },
        comment: comment,
        date: Date.now(),
      });
    } else {
      alert("Write some comment");
    }
  }

  async function getComments(postId: string) {
    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      orderBy("date", "desc")
    );
    onSnapshot(q, (data) => {
      const dataa = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown>, id: doc.id })) as any
      setComments(dataa)
    })
  }
  return { comments, getComments, onAddComment: onAddComment }
}