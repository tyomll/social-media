import React from 'react';
import s from './Messenger.module.scss';
import Chats from './layout/chats/Chats';
import Chat from './layout/chat/Chat';
import { useAppSelector } from '../../hooks/redux-hooks';

const Messenger: React.FC = () => {
  const chatID = useAppSelector((state) => state.currentChat.chatID);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Chats />
        {chatID && <Chat />}
      </div>
    </div>
  );
};

export default Messenger;
