import React from 'react';
import { auth } from '../../firebase';
import { useGetUserAvatar, useUserAvatarUpload, useUserData } from '../../hooks/useUsers';
import s from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import PostList from '../../components/postList/PostList';
import UploadAvatarModal from '../../components/uploadAvatarModal/UploadAvatarModal';

const Profile = () => {
  const userData = useUserData(auth.currentUser?.uid);
  const { avatar, getAvatar } = useGetUserAvatar(auth.currentUser?.uid);
  const [avatarUploadMode, setAvatarUploadMode] = React.useState(false);
  const [avatarImage, setAvatarImage] = React.useState<string | null>(null);
  const uploadAvatar = useUserAvatarUpload(avatarImage!);

  async function onAvatarUpload() {
    setAvatarUploadMode(false);
    await uploadAvatar();
    await getAvatar();
  }

  React.useEffect(() => {
    (async () => {
      await getAvatar();
    })();
  }, [avatarUploadMode]);

  return (
    <div className={s.root} style={{ overflow: 'disabled' }}>
      {avatarUploadMode && (
        <UploadAvatarModal setAvatar={setAvatarImage} onSubmit={onAvatarUpload} />
      )}
      <div className={s.container}>
        <div className={s.user}>
          <div className={s.banner}>
            <img
              src="https://assets-global.website-files.com/5e39e095596498a8b9624af1/6279aad9a4206d4a46dcf770_WFU-thumbnail%20(CTA%20alert%20banner).jpg"
              alt="banner"
            />
          </div>
          <div className={s.info}>
            <div className={s.avatar}>
              <img src={avatar} alt="avatar" />
              <div className={s.avatarChange} onClick={() => setAvatarUploadMode(true)}>
                <FontAwesomeIcon icon={faCamera} />
              </div>
            </div>
            <div className={s.details}>
              <div className={s.userData}>
                <h2>{userData?.firstName + ' ' + userData?.lastName}</h2>
                <span>{'@' + userData?.username}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={s.posts}>
          <h2>{userData?.firstName}'s posts</h2>
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default Profile;
