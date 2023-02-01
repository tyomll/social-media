import React from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './ProfileCover.module.scss';
import { auth } from '../../firebase';
import { useUserCoverImageUpload, useUserData } from '../../hooks/useUsers';

interface ProfileCoverType {
  id?: string;
}
const ProfileCover: React.FC<ProfileCoverType> = ({ id }) => {
  const uploadCoverImage = useUserCoverImageUpload();
  const { loading, userData } = useUserData(id ? id : auth.currentUser?.uid);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.preventDefault();
      await uploadCoverImage(auth.currentUser?.uid, e.target.files[0]);
    }
  };

  if (loading) {
    return <>loading</>;
  }

  return (
    <div className={s.banner}>
      <img src={userData?.coverImage} />
      {id === auth.currentUser?.uid && (
        <label htmlFor="uploadCover">
          <FontAwesomeIcon icon={faCamera} />
          Edit Cover
          <input
            id="uploadCover"
            type="file"
            onChange={(event) => handleImageUpload(event)}
            className={s.image}
            hidden
          />
        </label>
      )}
    </div>
  );
};

export default ProfileCover;
