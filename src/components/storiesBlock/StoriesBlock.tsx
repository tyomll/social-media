import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './StoriesBlock.module.scss';
import { useUserData } from '../../hooks/useUsers';
import { auth } from '../../firebase';

const StoriesBlock = () => {
  const { userData } = useUserData(auth.currentUser!.uid);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.avatar}>
          <img src={userData?.avatar} alt="story" />
        </div>
        <img
          src="https://www.vectornator.io/blog/content/images/2022/12/Cover-history-and-future-of-digital-art.jpg"
          alt="story"
        />
        <div className={s.buttons}>
          <span>Valod Petrosyan</span>
        </div>
      </div>
    </div>
  );
};

export default StoriesBlock;
