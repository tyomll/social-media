import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useUserData } from '../../hooks/useUsers';
import { PostDataType } from '../../types/postData.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './PostBlock.module.scss';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebase';
import { onLike } from '../../utils/onLike';
import CommentsList from '../commentsList/CommentsList';
import CreateComment from '../createComment/CreateComment';
import { Link, useNavigate } from 'react-router-dom';
import { useComments } from '../../hooks/useComments';
import PhotoViewer from '../photoViewer/PhotoViewer';

const PostBlock: React.FC<PostDataType> = ({ id, text, image, author, date, likes }) => {
  const { userData } = useUserData(author.id);
  const [commentMode, setCommentMode] = React.useState<boolean>(false);
  const [isPostLiked, setIsPostLiked] = React.useState<boolean>();
  const [imageViewMode, setImageViewMode] = React.useState<boolean>(false);
  const { comments, getComments } = useComments();
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      await getComments(id);
    })();
  }, [comments]);

  React.useEffect(() => {
    if (auth.currentUser !== null) {
      setIsPostLiked(likes.includes(auth.currentUser?.uid));
    }
  }, [likes]);

  return (
    <div className={s.post}>
      {imageViewMode && <PhotoViewer image={image} setMode={setImageViewMode} />}
      <div className={s.author}>
        <Link to={`/users/${userData?.id}`}>
          <img src={userData?.avatar} alt="avatar" />
        </Link>
        <div className={s.authorInfo}>
          <Link to={`/users/${userData?.id}`}>
            <h4>{userData?.firstName + ' ' + userData?.lastName}</h4>
          </Link>
          <span>{formatDistanceToNow(date)} ago</span>
        </div>
      </div>
      {text && <div className={s.description}>{text}</div>}
      {image && (
        <div className={s.images} onClick={() => setImageViewMode(true)}>
          <img src={image} alt="post" />
        </div>
      )}
      <div className={s.actions}>
        <div className={s.like}>
          <FontAwesomeIcon
            onClick={() => {
              if (auth.currentUser) {
                onLike(id, auth.currentUser?.uid, isPostLiked!);
              } else {
                navigate('/login');
              }
            }}
            icon={faHeart}
            style={{ color: isPostLiked ? 'rgba(189, 9, 9, 0.979)' : '' }}
          />
          <span>{likes.length}</span>
        </div>
        <div className={s.comment}>
          <FontAwesomeIcon
            icon={faComment}
            style={{ color: commentMode ? '#1d3a5f' : '' }}
            onClick={() => {
              if (commentMode === false) {
                setCommentMode(true);
              } else {
                setCommentMode(false);
              }
            }}
          />
          <span>{comments?.length}</span>
        </div>
      </div>
      {commentMode && (
        <div className={s.commentsSection}>
          <CreateComment postID={id} />
          <div className={s.comments}>
            <CommentsList postID={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostBlock;
