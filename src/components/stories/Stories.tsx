import React from 'react';
import AddStoryBlock from '../addStoryBlock/AddStoryBlock';
import StoriesBlock from '../storiesBlock/StoriesBlock';
import s from './Stories.module.scss';

const Stories = () => {
  return (
    <div className={s.root}>
      <AddStoryBlock />
      <StoriesBlock />
      <StoriesBlock />
      <StoriesBlock />
    </div>
  );
};

export default Stories;
