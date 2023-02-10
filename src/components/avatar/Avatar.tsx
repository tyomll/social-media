import React from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './Avatar.module.scss';
import { auth } from '../../firebase';
import { useUserData } from '../../hooks/useUsers';
import ContentLoader from 'react-content-loader';

interface AvatarType {
  id?: string;
  setAvatarUploadMode?: (arg: boolean) => void;
}

const Avatar: React.FC<AvatarType> = ({ id, setAvatarUploadMode }) => {
  const { userData } = useUserData(id);

  return (
    <div className={s.avatar}>
      <img src={userData?.avatar} alt="avatar" />
      {id === auth.currentUser?.uid && setAvatarUploadMode && (
        <div className={s.avatarChange} onClick={() => setAvatarUploadMode(true)}>
          <FontAwesomeIcon icon={faCamera} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
