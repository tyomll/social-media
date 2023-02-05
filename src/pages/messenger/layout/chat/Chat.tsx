import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Avatar from '../../../../components/avatar/Avatar';
import { useAppSelector } from '../../../../hooks/redux-hooks';
import { useUserData } from '../../../../hooks/useUsers';
import s from '../../Messenger.module.scss';

const Chat: React.FC = () => {
  const userID = useAppSelector((state) => state.currentChat.id);
  const { userData } = useUserData(userID!);

  return (
    <div className={s.chatContainer}>
      {userID && (
        <div className={s.user}>
          <div className={s.avatar}>
            <Avatar id={userData?.id} />
          </div>
          <div className={s.details}>
            <h4>{`${userData?.firstName} ${userData?.lastName}`}</h4>
            <span></span>
          </div>
        </div>
      )}
      <div className={s.chat}>
        <div className={s.message}>
          <div className={s.avatar}>
            <Avatar />
          </div>
          <div className={s.text}>
            <span>Hellodsadasdasd</span>
          </div>
        </div>
        <div
          className={s.message}
          style={{ justifyContent: 'flex-start', flexDirection: 'row-reverse' }}>
          <div className={s.avatar}>
            <Avatar />
          </div>
          <div className={s.text}>
            <span>asdliahsdjsaghdji</span>
          </div>
        </div>
      </div>
      <div className={s.messageInput}>
        <div className={s.input}>
          <input type="text" placeholder="Write something..." />
          <span>
            <FontAwesomeIcon icon={faPaperPlane} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
