import React from 'react';
import { auth } from '../../firebase';
import { useUserData } from '../../hooks/useUsers';
import Avatar from '../avatar/Avatar';
import s from './CreatePost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';
import { usePost } from '../../hooks/usePosts';

interface CreatePostType {
  setCreatePostMode: (arg: boolean) => void;
}

interface PostDataType {
  text: string;
  image: File | undefined;
}
const CreatePost: React.FC<CreatePostType> = ({ setCreatePostMode }) => {
  const { uploadPost } = usePost();
  const { loading, userData } = useUserData(auth.currentUser?.uid);
  const [postData, setPostData] = React.useState<PostDataType>({
    text: '' as string,
    image: undefined,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.preventDefault();
      const photo = e.target.files[0];
      setPostData({ ...postData, image: photo });
    }
  };

  const onPost = async () => {
    setCreatePostMode(false);
    console.log(postData);
    await uploadPost(postData);
    setPostData({ text: '', image: undefined });
  };
  if (loading) {
    return <>loading...</>;
  }
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.author}>
          <div className={s.avatar}>
            <Avatar id={auth.currentUser?.uid} />
          </div>
          <div className={s.details}>
            <h4>{userData?.firstName + ' ' + userData?.lastName}</h4>
            <span>@{userData?.username}</span>
          </div>
          <div className={s.closeModal} onClick={() => setCreatePostMode(false)}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
        <div className={s.text}>
          <textarea
            placeholder="What do you want to talk about?"
            onChange={(e) => setPostData({ ...postData, text: e.target.value })}></textarea>
        </div>
        {postData.image && (
          <div className={s.image}>
            <div onClick={() => setPostData({ ...postData, image: undefined })}>
              <FontAwesomeIcon icon={faClose} />
            </div>
            <img src={URL.createObjectURL(postData.image)} />
          </div>
        )}
        <div className={s.tools}>
          <label htmlFor="uploadImage">
            <FontAwesomeIcon icon={faImage} />
          </label>
          <input id="uploadImage" type="file" onChange={handleImageUpload} hidden />
          <div className={s.submit} onClick={onPost}>
            <span>Post</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
