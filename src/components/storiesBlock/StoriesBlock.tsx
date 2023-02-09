import React from 'react';
import { useUserData } from '../../hooks/useUsers';
import StoryModal from '../storyModal/StoryModal';
import s from './StoriesBlock.module.scss';

interface StoriesBlockType {
  author: { id: string };
  image: string;
  id: string;
}

const StoriesBlock: React.FC<StoriesBlockType> = ({ author, image }) => {
  const { userData } = useUserData(author.id);
  const [storyViewMode, setStoryViewMode] = React.useState(false);
  return (
    <>
      {storyViewMode && <StoryModal setStoryViewMode={setStoryViewMode} />}

      <div className={s.root} onClick={() => setStoryViewMode(true)}>
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
    </>
  );
};

export default StoriesBlock;
