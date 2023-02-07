import React from 'react';
import { useStories } from '../../hooks/useStories';
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
        stories.map((story: any) => {
          return <StoriesBlock key={story.id} {...story} />;
        })}
    </div>
  );
};

export default Stories;
