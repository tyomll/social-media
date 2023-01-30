import React from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './Avatar.module.scss';
import { auth } from '../../firebase';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useGetCurrentUserAvatar } from '../../hooks/useUsers';

interface AvatarType {
  setAvatarUploadMode?: (arg: boolean) => void;
}

const Avatar: React.FC<AvatarType> = ({ setAvatarUploadMode }) => {
  const avatar = useAppSelector((state) => state.authUser.avatar);
  const { getAvatar } = useGetCurrentUserAvatar(auth.currentUser?.uid);

  React.useEffect(() => {
    (async () => {
      await getAvatar();
    })();
  }, [avatar]);

  return (
    <div className={s.avatar}>
      <img src={avatar!} alt="avatar" />
      {setAvatarUploadMode && (
        <div className={s.avatarChange} onClick={() => setAvatarUploadMode(true)}>
          <FontAwesomeIcon icon={faCamera} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
