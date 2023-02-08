import React from 'react';
import Stories from 'react-insta-stories';
import { useStories } from '../../hooks/useStories';
import { useUserData } from '../../hooks/useUsers';
import Avatar from '../avatar/Avatar';
import s from './StoryModal.module.scss';

const storyStyles = {
  objectFit: 'cover',
  width: '100%',
  height: ' 100%',
};

const StoryModal: React.FC = () => {
  const { storyImages, getStoryImages } = useStories();

  React.useEffect(() => {
    getStoryImages();
  });
  return (
    <div className={s.root}>
      <div className={s.container}>
        {storyImages && (
          <Stories
            stories={storyImages}
            defaultInterval={5500}
            width={400}
            height={600}
            storyStyles={storyStyles}
          />
        )}
      </div>
    </div>
  );
};

export default StoryModal;
