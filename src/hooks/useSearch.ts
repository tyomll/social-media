import React from 'react'
import { UserDataType } from './../types/userData.type';
import { collection, onSnapshot, query, where, } from "firebase/firestore";
import { db } from '../firebase';

export const useSearch = (input: string) => {
  const [users, setUsers] = React.useState<UserDataType[]>()

  const getSearchUser = async () => {
    const q = query(collection(db, "users"), where("username", ">=", input), where("username", "<=", input + "\uf8ff"));
    onSnapshot(q, (data) => {
      const dataa = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown> })) as any
      setUsers(dataa)
    })
  }
  console.log(users)
  return { users, getSearchUser }
}




