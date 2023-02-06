import React from 'react';
import { useUserData } from '../../hooks/useUsers';
import PostList from '../../components/postList/PostList';
import UploadAvatarModal from '../../components/uploadAvatarModal/UploadAvatarModal';
import Avatar from '../../components/avatar/Avatar';
import s from './Profile.module.scss';
import ProfileCover from '../../components/profileCover/ProfileCover';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faUserCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebase';
import { onAddFriend } from '../../utils/onAddFriend';
import { onRemoveFriend } from '../../utils/onRemoveFriend';
import FriendsList from '../../components/layout/friendsBar/friendsList/FriendsList';

const sections = ['Posts', 'Friends'];

const Profile: React.FC = () => {
  const { id } = useParams();
  const { loading, userData } = useUserData(id);
  const [sectionIndex, setSectionIndex] = React.useState(0);
  const [avatarUploadMode, setAvatarUploadMode] = React.useState(false);
  const [isFriendRequested, setIsFriendRequested] = React.useState(
    userData?.friendRequests && userData.friendRequests.includes(auth.currentUser!.uid),
  );
  const [isFriendAdded, setIsFriendAdded] = React.useState(
    userData?.friendRequests && userData.friends.includes(auth.currentUser!.uid),
  );

  async function handleFriendAdd() {
    if (!isFriendRequested) {
      await onAddFriend(id!, auth.currentUser!.uid, isFriendRequested);
    } else {
      await onAddFriend(id!, auth.currentUser!.uid, isFriendRequested);
    }
  }
  async function handleFriendRemove() {
    await onRemoveFriend(id!, auth.currentUser!.uid);
  }

  React.useEffect(() => {
    setIsFriendRequested(
      userData?.friendRequests && userData?.friendRequests.includes(auth.currentUser!.uid),
    );
    setIsFriendAdded(userData?.friendRequests && userData?.friends.includes(auth.currentUser!.uid));
  }, [userData]);

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
            {!isFriendAdded ? (
              auth.currentUser?.uid !== id ? (
                <div className={s.addFriend}>
                  {!isFriendRequested ? (
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
              ) : (
                <></>
              )
            ) : (
              <div className={s.addFriend}>
                <span onClick={handleFriendRemove}>
                  <FontAwesomeIcon icon={faUserCheck} />
                  Friends
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={s.sections}>
          {sections.map((section, i) => {
            return (
              <span
                style={{ color: sectionIndex === i ? '#1877f2' : '' }}
                onClick={() => setSectionIndex(i)}>
                {section}
              </span>
            );
          })}
        </div>
        <div className={s.posts}>
          <h2>
            {userData?.firstName}'s {sections[sectionIndex].toLowerCase()}
          </h2>
          {sections[sectionIndex].toLowerCase() === 'posts' && <PostList />}
          {sections[sectionIndex].toLowerCase() === 'friends' && (
            <div className={s.friends}>
              <FriendsList userData={userData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
