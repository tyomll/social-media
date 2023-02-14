import React from 'react';
import ContentLoader from 'react-content-loader';
import Avatar from '../../components/avatar/Avatar';
import CreatePost from '../../components/createPost/CreatePost';
import PostList from '../../components/postList/PostList';
import Stories from '../../components/stories/Stories';
import { auth } from '../../firebase';
import { useUserData } from '../../hooks/useUsers';
import s from './Home.module.scss';

const Home: React.FC = () => {
  const { userData } = useUserData(auth.currentUser?.uid);
  const [createPostMode, setCreatePostMode] = React.useState<boolean>(false);

  if (auth.currentUser && !userData) {
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
    <div className={s.root}>
      {auth.currentUser && <Stories />}

      {createPostMode && (
        <div className={s.createPost}>
          <CreatePost setCreatePostMode={setCreatePostMode} />
        </div>
      )}
      <div className={s.container}>
        {auth.currentUser && (
          <div className={s.createPost} onClick={() => setCreatePostMode(true)}>
            <div className={s.avatar}>
              <Avatar id={auth.currentUser!.uid} />
            </div>
            <span>What's new {userData?.firstName}?</span>
          </div>
        )}
        <div className={s.posts}>
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default Home;
