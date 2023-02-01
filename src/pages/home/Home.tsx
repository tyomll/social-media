import React from 'react';
import Avatar from '../../components/avatar/Avatar';
import CreatePost from '../../components/createPost/CreatePost';
import PostList from '../../components/postList/PostList';
import { auth } from '../../firebase';
import { useUserData } from '../../hooks/useUsers';
import s from './Home.module.scss';

const Home: React.FC = () => {
  const { userData } = useUserData(auth.currentUser?.uid);
  const [createPostMode, setCreatePostMode] = React.useState<boolean>(false);
  if (!userData) {
    return <>loading</>;
  }

  return (
    <div className={s.root}>
      {createPostMode && <CreatePost setCreatePostMode={setCreatePostMode} />}
      <div className={s.container}>
        <div className={s.createPost}>
          <div className={s.avatar}>
            <Avatar />
          </div>
          <span>What's new {userData.firstName}?</span>
        </div>
        <div className={s.posts}>
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default Home;
