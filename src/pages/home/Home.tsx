import React from 'react';
import Avatar from '../../components/avatar/Avatar';
import PostBlock from '../../components/postBlock/PostBlock';
import PostList from '../../components/postList/PostList';
import { auth } from '../../firebase';
import { useUserData } from '../../hooks/useUsers';
import s from './Home.module.scss';

const Home: React.FC = () => {
  const userData = useUserData(auth.currentUser?.uid);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.createPost}>
          <div className={s.avatar}>
            <Avatar />
          </div>
          <span>What's new {userData?.firstName}?</span>
        </div>
        <div className={s.posts}>
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default Home;
