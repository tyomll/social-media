import React from 'react';
import Avatar from '../../../../components/avatar/Avatar';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { useUserData } from '../../../../hooks/useUsers';
import { setCurrentChat } from '../../../../redux/currentChat/slice';
import { ChatDataType } from '../../../../types/chatData.type';
import s from './Chats.module.scss';

interface ChatType {
  chat: ChatDataType;
}
const Chat: React.FC<ChatType> = ({ chat }) => {
  const { userData } = useUserData(chat[1].userInfo.id);
  const userID = useAppSelector((state) => state.currentChat.userID);
  const dispatch = useAppDispatch();

  function handleSelectChat() {
    dispatch(setCurrentChat(chat[1].userInfo.id));
  }
  return (
    <div
      className={s.chat}
      onClick={handleSelectChat}
      style={{ backgroundColor: userID === userData?.id ? 'rgb(249, 250, 252)' : '' }}>
      <div className={s.avatar}>
        <Avatar id={userData?.id} />
      </div>
      <div className={s.details}>
        <h4>{`${userData?.firstName} ${userData?.lastName}`}</h4>
        <span>{chat[1].lastMessage?.text}</span>
      </div>
    </div>
  );
};

export default Chat;
