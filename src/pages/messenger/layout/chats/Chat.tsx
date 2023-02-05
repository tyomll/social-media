import React from 'react';
import Avatar from '../../../../components/avatar/Avatar';
import { useUserData } from '../../../../hooks/useUsers';
import { ChatDataType } from '../../../../types/chatData.type';
import s from './Chats.module.scss';

interface ChatType {
  chat: ChatDataType;
}
const Chat: React.FC<ChatType> = ({ chat }) => {
  const { userData } = useUserData(chat[1].userInfo.id);
  
  return (
    <div className={s.chat}>
      <div className={s.avatar}>
        <Avatar id={userData?.id} />
      </div>
      <div className={s.details}>
        <h4>{`${userData?.firstName} ${userData?.lastName}`}</h4>
        <span>This is my latest message</span>
      </div>
    </div>
  );
};

export default Chat;
