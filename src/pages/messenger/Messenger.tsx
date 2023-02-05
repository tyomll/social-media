import React from 'react';
import s from './Messenger.module.scss';
import Chats from './layout/chats/Chats';
import Chat from './layout/chat/Chat';

const Messenger: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Chats />
        <Chat />
      </div>
    </div>
  );
};

export default Messenger;
