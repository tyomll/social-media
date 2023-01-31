import React from 'react';
import { usePost } from '../../hooks/usePosts';
import { PostDataType } from '../../types/postData.type';
import PostBlock from '../postBlock/PostBlock';

const PostList: React.FC = () => {
  const { posts, getPosts } = usePost();

  React.useEffect(() => {
    (async () => {
      await getPosts();
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
