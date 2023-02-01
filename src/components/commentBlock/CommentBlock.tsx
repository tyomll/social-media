import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { useUserData } from '../../hooks/useUsers';
import { CommentDataType } from '../../types/commentData.type';
import Avatar from '../avatar/Avatar';
import s from './CommentBlock.module.scss';

const CommentBlock: React.FC<CommentDataType> = ({ author, comment, date }) => {
  const { userData } = useUserData(author.id);
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
        <div className={s.commentText}>{comment}</div>
      </div>
    </div>
  );
};

export default CommentBlock;
