import React from "react"
import { doc, DocumentData, onSnapshot, updateDoc } from "firebase/firestore"
import { auth, db, storage } from "../firebase"
import { UserDataType } from "../types/userData.type";
import { ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";

export const useUserData = (id: string | undefined) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [userData, setUserData] = React.useState<DocumentData | UserDataType>();

  async function getUserDataById() {
    if (id) {
      setLoading(true)
      onSnapshot(doc(db, 'users', id), (doc) => {
        setUserData(doc.data())
      })
      setLoading(false)
    }
  }
  React.useEffect(() => {
    getUserDataById();
  }, [id]);

  return { loading, userData };
}

export const useUserAvatarUpload = (avatar: string, id: string) => {

  async function uploadAvatar() {
    if (auth.currentUser) {
      const fileRef = ref(storage, 'userAvatars/' + auth.currentUser.uid + '.png')
      const userRef = doc(db, 'users', id)
      if (avatar) {
        await uploadString(fileRef, avatar, 'data_url')
      }
      const photoURL = await getDownloadURL(fileRef)
      await updateDoc(userRef, {
        avatar: photoURL
      })
    }
  }
  return uploadAvatar
}

export const useUserCoverImageUpload = () => {

  async function uploadCoverImage(id: string | undefined, cover: File | undefined) {
    if (id) {
      const fileRef = ref(storage, 'userCovers/' + id)
      const userRef = doc(db, 'users', id)
      await uploadBytes(fileRef, cover!, { contentType: 'image/png' }).then(async () => {
        await getDownloadURL(fileRef).then(async (coverURL) => {
          updateDoc(userRef, {
            coverImage: coverURL
          })
        })
      })
    }
  }
  return uploadCoverImage
}

