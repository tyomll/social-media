import { format, formatDistanceToNow } from 'date-fns';
import React from 'react';
import { useUserData } from '../../hooks/useUsers';
import { PostDataType } from '../../types/postData.type';
import s from './PostBlock.module.scss';

const PostBlock: React.FC<PostDataType> = ({ text, image, author, date }) => {
  const { userData } = useUserData(author.id);

  return (
    <div className={s.post}>
      <div className={s.author}>
        <img src={userData?.avatar} alt="avatar" />
        <div className={s.authorInfo}>
          <h4>{userData?.firstName + ' ' + userData?.lastName}</h4>
          <span>{formatDistanceToNow(date)} ago</span>
        </div>
      </div>
      <div className={s.description}>{text}</div>
      <div className={s.images}>
        <img src={image} alt="post" />
      </div>
    </div>
  );
};

export default PostBlock;
