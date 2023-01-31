import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useUserData } from '../../hooks/useUsers';
import { PostDataType } from '../../types/postData.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './PostBlock.module.scss';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebase';
import { onLike } from '../../utils/onLike';

const PostBlock: React.FC<PostDataType> = ({ id, text, image, author, date, likes }) => {
  const { userData } = useUserData(author.id);
  const [isPostLiked, setIsPostLiked] = React.useState(likes.includes(auth.currentUser!.uid));

  React.useEffect(() => {
    setIsPostLiked(likes.includes(auth.currentUser!.uid));
  }, [likes]);

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
      <div className={s.actions}>
        <div className={s.like} onClick={() => onLike(id, auth.currentUser!.uid, isPostLiked)}>
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: isPostLiked ? 'rgba(189, 9, 9, 0.979)' : '' }}
          />
          <span>{likes.length}</span>
        </div>
        <div className={s.comment}>
          <FontAwesomeIcon icon={faComment} />
        </div>
      </div>
    </div>
  );
};

export default PostBlock;
