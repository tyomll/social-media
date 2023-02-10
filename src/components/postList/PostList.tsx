import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { usePost } from '../../hooks/usePosts';
import { PostDataType } from '../../types/postData.type';
import PostBlock from '../postBlock/PostBlock';

const PostList: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const { posts, getPosts, getUserPosts } = usePost();

  React.useEffect(() => {
    (async () => {
      if (location.pathname === '/') {
        await getPosts();
      } else {
        await getUserPosts(id!);
      }
    })();
  }, [id]);

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
