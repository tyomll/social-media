import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from '../../firebase';
import { useUserData } from '../../hooks/useUsers';
import s from './AddStoryBlock.module.scss';
import CreateStoryModal from '../createStoryModal/CreateStoryModal';

const AddStoryBlock = () => {
  const { userData } = useUserData(auth.currentUser?.uid);
  const [createStoryMode, setCreateStoryMode] = React.useState<boolean>(false);

  return (
    <div className={s.root}>
      {createStoryMode && <CreateStoryModal setMode={setCreateStoryMode} />}
      <div className={s.container} onClick={() => setCreateStoryMode(true)}>
        <img src={userData?.coverImage} alt="story" />
        <div className={s.buttons}>
          <div>
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <span>Add Story</span>
        </div>
      </div>
    </div>
  );
};

export default AddStoryBlock;
