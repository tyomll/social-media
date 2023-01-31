import React from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './ProfileCover.module.scss';
import { useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { useUserCoverImageUpload, useUserData } from '../../hooks/useUsers';

const ProfileCover: React.FC = () => {
  const location = useLocation();
  const uploadCoverImage = useUserCoverImageUpload();
  const { loading, userData } = useUserData(auth.currentUser?.uid);

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
      {location.pathname === '/profile' && (
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
