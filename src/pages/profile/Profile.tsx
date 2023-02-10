import React from 'react';
import { useUserData } from '../../hooks/useUsers';
import PostList from '../../components/postList/PostList';
import UploadAvatarModal from '../../components/uploadAvatarModal/UploadAvatarModal';
import Avatar from '../../components/avatar/Avatar';
import s from './Profile.module.scss';
import ProfileCover from '../../components/profileCover/ProfileCover';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDoorOpen,
  faHourglass,
  faUserCheck,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebase';
import { onAddFriend } from '../../utils/onAddFriend';
import { onRemoveFriend } from '../../utils/onRemoveFriend';
import FriendsList from '../../components/layout/friendsBar/friendsList/FriendsList';
import ContentLoader from 'react-content-loader';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { removeAuthUser } from '../../redux/authUser/slice';

const sections = ['Posts', 'Friends'];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, userData } = useUserData(id);
  const [sectionIndex, setSectionIndex] = React.useState(0);
  const [avatarUploadMode, setAvatarUploadMode] = React.useState(false);
  const [isFriendRequested, setIsFriendRequested] = React.useState(
    userData?.friendRequests && userData.friendRequests.includes(auth.currentUser?.uid),
  );
  const [isFriendAdded, setIsFriendAdded] = React.useState(
    userData?.friendRequests && userData.friends.includes(auth.currentUser?.uid),
  );
  const dispatch = useAppDispatch();
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
      userData?.friendRequests && userData?.friendRequests.includes(auth.currentUser?.uid),
    );
    setIsFriendAdded(userData?.friendRequests && userData?.friends.includes(auth.currentUser?.uid));
  }, [userData]);

  if (loading) {
    return (
      <ContentLoader
        speed={2}
        width={530}
        height={540}
        viewBox="0 0 550 550"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <rect x="188" y="338" rx="0" ry="0" width="1" height="0" />
        <rect x="7" y="10" rx="32" ry="32" width="531" height="485" />
      </ContentLoader>
    );
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
                  {auth.currentUser && (
                    <>
                      {' '}
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
                    </>
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
          <div className={s.links}>
            {sections.map((section, i) => {
              return (
                <span
                  key={i}
                  style={{ color: sectionIndex === i ? '#1877f2' : '' }}
                  onClick={() => setSectionIndex(i)}>
                  {section}
                </span>
              );
            })}
          </div>
          {auth.currentUser?.uid === id && (
            <span
              className={s.logout}
              onClick={() => {
                auth.signOut();
                dispatch(removeAuthUser());
                navigate('/login');
              }}>
              <FontAwesomeIcon icon={faDoorOpen} />
              Log out
            </span>
          )}
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
