import React from 'react';
import { useUserData } from '../../hooks/useUsers';
import s from './StoriesBlock.module.scss';

interface StoriesBlockType {
  author: { id: string };
  image: string;
}
const StoriesBlock: React.FC<StoriesBlockType> = ({ author, image }) => {
  const { userData } = useUserData(author.id);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.avatar}>
          <img src={userData?.avatar} alt="story" />
        </div>
        <img src={image} alt="story" />
        <div className={s.buttons}>
          <span>{`${userData?.firstName} ${userData?.lastName}`}</span>
        </div>
      </div>
    </div>
  );
};

export default StoriesBlock;
