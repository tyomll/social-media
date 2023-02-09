import { DocumentData } from 'firebase/firestore';
import React from "react"
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAppSelector } from "./redux-hooks";
import { MessageDataType } from "../types/messageData.type";

export const useMessages = () => {
  const [messages, setMessages] = React.useState<DocumentData | MessageDataType>([])
  const chatID = useAppSelector(state => state.currentChat.chatID)

  async function getMessages() {
    if (auth.currentUser?.uid) {
      onSnapshot(doc(db, 'chats', chatID!), (doc) => {
        doc.exists() && setMessages(doc.data())
      })
    }
  }
  React.useEffect(() => {
    getMessages();
  }, [chatID]);

  return messages.messages

}