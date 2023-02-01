import React from 'react';
import { useComments } from '../../hooks/useComments';
import CommentBlock from '../commentBlock/CommentBlock';

interface CommentsListType {
  postID: string;
}
const CommentsList: React.FC<CommentsListType> = ({ postID }) => {
  const { comments, getComments } = useComments();

  React.useEffect(() => {
    (async () => {
      await getComments(postID);
    })();
  }, [comments]);
  return (
    <>
      {comments?.map((comment: any) => {
        return <CommentBlock key={comment.id} {...comment} />;
      })}
    </>
  );
};

export default CommentsList;
