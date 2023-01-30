import { useAppDispatch, useAppSelector } from './redux-hooks';
import React from "react"
import { doc, DocumentData, getDoc } from "firebase/firestore"
import { auth, db, storage } from "../firebase"
import { UserDataType } from "../types/userData.type";
import { updateProfile } from "firebase/auth";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { setAuthUser } from '../redux/authUser/slice';

export const useUserData = (id: string | undefined) => {
  const [userData, setUserData] = React.useState<DocumentData | UserDataType>();

  async function getUserDataById() {
    if (id) {
      const ref = doc(db, 'users', id);
      const data = await getDoc(ref);
      setUserData(data.data());
    }
  }
  React.useEffect(() => {
    getUserDataById();
  }, [id]);

  return userData;
}

export const useUserAvatarUpload = (avatar: string) => {
  const currentUser = useAppSelector(state => state.authUser)
  const dispatch = useAppDispatch()

  async function uploadAvatar() {
    if (auth.currentUser) {
      const fileRef = ref(storage, 'userAvatars/' + auth.currentUser.uid + '.png')
      if (avatar) {
        await uploadString(fileRef, avatar, 'data_url')
      }
      const photoURL = await getDownloadURL(fileRef)
      await updateProfile(auth.currentUser, {
        photoURL: photoURL as string
      })
      dispatch(setAuthUser({ ...currentUser, avatar: photoURL }))

    }
  }
  return uploadAvatar
}


export function useGetCurrentUserAvatar(id: string | undefined) {
  const currentUser = useAppSelector(state => state.authUser)
  const dispatch = useAppDispatch()

  async function getAvatar() {
    if (id) {
      if (auth.currentUser?.photoURL !== 'https://firebasestorage.googleapis.com/v0/b/social-media-c7b8a.appspot.com/o/defaultAvatar.png?alt=media&token=f2894209-9a04-4845-b464-fa93cad22a5a') {
        const fileRef = ref(storage, 'userAvatars/' + id + '.png');
        await getDownloadURL(fileRef).then(async (url) => {
          dispatch(setAuthUser({ ...currentUser, avatar: url }))
        })
      }
      else {
        dispatch(setAuthUser({ ...currentUser, avatar: 'https://firebasestorage.googleapis.com/v0/b/social-media-c7b8a.appspot.com/o/defaultAvatar.png?alt=media&token=f2894209-9a04-4845-b464-fa93cad22a5a' }))
      }
    }
  }

  React.useEffect(() => {
    (async () => {
      if (id) {
        await getAvatar()
      }
    })()
  }, [id])

  return { getAvatar }
}