import React from 'react';
import { useStories } from '../../hooks/useStories';
import { StoryDataType } from '../../types/storyData.type';
import AddStoryBlock from '../addStoryBlock/AddStoryBlock';
import StoriesBlock from '../storiesBlock/StoriesBlock';
import s from './Stories.module.scss';

const Stories = () => {
  const { stories, getStories } = useStories();

  React.useEffect(() => {
    getStories();
  }, []);

  return (
    <div className={s.root}>
      <AddStoryBlock />
      {stories &&
        stories.slice(0, 4).map((story: StoryDataType) => {
          return <StoriesBlock key={story.id} {...story} />;
        })}
    </div>
  );
};

export default Stories;
