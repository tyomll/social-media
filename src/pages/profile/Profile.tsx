import React from 'react';
import { auth } from '../../firebase';
import { useUserData } from '../../hooks/useUsers';
import s from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import PostList from '../../components/postList/PostList';

const Profile = () => {
  const userData = useUserData(auth.currentUser?.uid);

  return (
    <div className={s.root}>
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
              <img
                src="https://2.gravatar.com/avatar/8196ac7ecc62ed5aaa2879fe15733dce?s=204&d=identicon&r=G"
                alt="avatar"
              />
              <div className={s.avatarChange}>
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
