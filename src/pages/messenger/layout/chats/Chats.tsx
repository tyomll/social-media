import React from 'react';
import Searchbar from '../../../../components/searchbar/Searchbar';
import { useChats } from '../../../../hooks/useChats';
import { ChatDataType } from '../../../../types/chatData.type';
import Chat from './Chat';
import s from './Chats.module.scss';

const Chats: React.FC = () => {
  const chats = useChats();

  return (
    <div className={s.chats}>
      <div className={s.search}>
        <Searchbar component="messenger" />
      </div>
      {chats?.map((chat: ChatDataType) => {
        return <Chat key={chat[0]} chat={chat} />;
      })}
    </div>
  );
};

export default Chats;
