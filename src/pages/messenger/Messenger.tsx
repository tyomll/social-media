import React from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../../components/avatar/Avatar';
import s from './Messenger.module.scss';
import Chats from './layout/chats/Chats';

const Messenger: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Chats />
        <div className={s.chatContainer}>
          <div className={s.user}>
            <div className={s.avatar}>
              <Avatar />
            </div>
            <div className={s.details}>
              <h4>Gago Valodyan</h4>
              <span></span>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default Messenger;
