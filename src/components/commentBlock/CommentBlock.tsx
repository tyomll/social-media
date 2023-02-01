import React from 'react';

import { formatDistanceToNow } from 'date-fns';
import { useUserData } from '../../hooks/useUsers';
import { CommentDataType } from '../../types/commentData.type';
import Avatar from '../avatar/Avatar';
import s from './CommentBlock.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebase';
import { useComments } from '../../hooks/useComments';

const CommentBlock: React.FC<CommentDataType> = ({ id, author, comment, date }) => {
  const { userData } = useUserData(author.id);
  const { deleteComment } = useComments();

  async function handleCommentDelete() {
    deleteComment(id);
  }
  return (
    <div className={s.root}>
      <div className={s.avatar}>
        <Avatar id={author.id} />
      </div>
      <div className={s.commentDetails}>
        <div className={s.info}>
          <h4>{userData && userData.firstName + ' ' + userData.lastName}</h4>
          <span>{formatDistanceToNow(date)} ago</span>
        </div>
        <div className={s.commentText}>
          <span>{comment}</span>
          {auth.currentUser?.uid === author.id && (
            <FontAwesomeIcon icon={faTrashAlt} onClick={handleCommentDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBlock;
