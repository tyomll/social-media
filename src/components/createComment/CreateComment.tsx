import React from 'react';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../avatar/Avatar';
import s from './CreateComment.module.scss';
import { useComments } from '../../hooks/useComments';
import { auth } from '../../firebase';

interface CreateCommentType {
  postID: string;
}
const CreateComment: React.FC<CreateCommentType> = ({ postID }) => {
  const [comment, setComment] = React.useState<string>('');
  const { onAddComment } = useComments(postID, comment, setComment);

  async function handleCommentAdd() {
    if (auth.currentUser) {
      await onAddComment();
    }
  }

  return (
    <div className={s.writeComment}>
      {auth.currentUser && (
        <div className={s.avatar}>
          <Avatar id={auth.currentUser?.uid} />
        </div>
      )}
      <div className={s.input}>
        <input
          type="text"
          value={comment}
          placeholder={auth.currentUser ? 'Add a comment...' : 'Log in to comment this post...'}
          onChange={(e) => setComment(e.target.value)}
        />
        <FontAwesomeIcon icon={faShare} onClick={handleCommentAdd} />
      </div>
    </div>
  );
};

export default CreateComment;
