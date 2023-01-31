import React from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { usePost } from '../../hooks/usePosts';
import { PostDataType } from '../../types/postData.type';
import PostBlock from '../postBlock/PostBlock';

const PostList: React.FC = () => {
  const location = useLocation();
  const { posts, getPosts, getUserPosts } = usePost();

  React.useEffect(() => {
    (async () => {
      if (location.pathname === '/') {
        await getPosts();
      } else {
        await getUserPosts(auth.currentUser!.uid);
      }
    })();
  }, []);

  if (!posts) {
    return <>loading</>;
  }
  return (
    <>
      {posts &&
        posts.map((post: PostDataType) => {
          return <PostBlock key={post.id} {...post} />;
        })}
    </>
  );
};

export default PostList;
