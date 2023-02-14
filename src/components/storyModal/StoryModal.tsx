import React from 'react';
import Stories from 'react-insta-stories';
import { useStories } from '../../hooks/useStories';
import s from './StoryModal.module.scss';

interface StoryModalType {
  setStoryViewMode: (arg: boolean) => void;
}

const storyStyles = {
  objectFit: 'cover',
  width: '100%',
  height: ' 100%',
};

const StoryModal: React.FC<StoryModalType> = ({ setStoryViewMode }) => {
  const { storyImages, getStoryImages } = useStories();
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    getStoryImages();
  }, []);

  return (
    <div
      className={s.root}
      onClick={(e) => {
        if (!containerRef || !containerRef.current!.contains(e.target as Node)) {
          setStoryViewMode(false);
        }
      }}>
      <div ref={containerRef} className={s.container}>
        {storyImages && (
          <Stories
            stories={storyImages}
            defaultInterval={5500}
            width={350}
            height={500}
            storyStyles={storyStyles}
            onStoryEnd={() => setStoryViewMode(false)}
          />
        )}
      </div>
    </div>
  );
};

export default StoryModal;
