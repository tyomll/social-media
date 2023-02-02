import React from 'react';
import { useUserData } from '../../hooks/useUsers';
import PostList from '../../components/postList/PostList';
import UploadAvatarModal from '../../components/uploadAvatarModal/UploadAvatarModal';
import Avatar from '../../components/avatar/Avatar';
import s from './Profile.module.scss';
import ProfileCover from '../../components/profileCover/ProfileCover';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebase';
import { onAddFriend } from '../../utils/onAddFriend';

const Profile: React.FC = () => {
  const { id } = useParams();
  const { loading, userData } = useUserData(id);
  const [avatarUploadMode, setAvatarUploadMode] = React.useState(false);
  const [isFriendAdded, setIsFriendAdded] = React.useState(false);

  async function handleFriendAdd() {
    if (!isFriendAdded) {
      setIsFriendAdded(true);
      await onAddFriend(id!, auth.currentUser!.uid, isFriendAdded);
    } else {
      setIsFriendAdded(false);
      await onAddFriend(id!, auth.currentUser!.uid, isFriendAdded);
    }
  }

  if (loading) {
    return <>loading...</>;
  }

  return (
    <div className={s.root} style={{ overflow: 'disabled' }}>
      {avatarUploadMode && <UploadAvatarModal setAvatarUploadMode={setAvatarUploadMode} />}
      <div className={s.container}>
        <div className={s.user}>
          <div className={s.banner}>
            <ProfileCover id={id} />
          </div>
          <div className={s.info}>
            <div className={s.avatar}>
              <Avatar id={id} setAvatarUploadMode={setAvatarUploadMode} />
            </div>
            <div className={s.details}>
              <div className={s.userData}>
                <h2>{userData?.firstName + ' ' + userData?.lastName}</h2>
                <span>{'@' + userData?.username}</span>
              </div>
            </div>
            <div className={s.addFriend}>
              {!isFriendAdded ? (
                <span onClick={handleFriendAdd}>
                  <FontAwesomeIcon icon={faUserPlus} />
                  Add friend
                </span>
              ) : (
                <span onClick={handleFriendAdd} style={{ backgroundColor: '#458b3d' }}>
                  <FontAwesomeIcon icon={faHourglass} />
                  Requested
                </span>
              )}
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
