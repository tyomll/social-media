import React from 'react'
import { UserDataType } from './../types/userData.type';
import { collection, onSnapshot, query, where, } from "firebase/firestore";
import { auth, db } from '../firebase';

export const useSearch = (input: string) => {
  const [users, setUsers] = React.useState<UserDataType[]>()

  const getSearchUser = async () => {
    const q = auth.currentUser ? query(collection(db, "users"), where('username', '!=', auth.currentUser?.displayName), where("username", ">=", input), where("username", "<=", input + "\uf8ff")) : query(collection(db, "users"), where("username", ">=", input), where("username", "<=", input + "\uf8ff"));
    if (input.length > 0) {
      onSnapshot(q, (data) => {
        const dataa = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown> })) as any
        setUsers(dataa)
      })
    }
    else {
      setUsers([])
    }
  }

  React.useEffect(() => {
    if (input) {
      (async () => {
        await getSearchUser()
      })()
    }
  }, [input])

  return { users, getSearchUser }
}




