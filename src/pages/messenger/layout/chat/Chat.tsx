import React from 'react';
import Avatar from '../../../../components/avatar/Avatar';
import { useAppSelector } from '../../../../hooks/redux-hooks';
import { useMessages } from '../../../../hooks/useMessages';
import { useUserData } from '../../../../hooks/useUsers';
import { MessageDataType } from '../../../../types/messageData.type';
import s from '../../Messenger.module.scss';
import Input from './Input';
import Message from './Message';

const Chat: React.FC = () => {
  const messages = useMessages();
  const userID = useAppSelector((state) => state.currentChat.userID);
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
        {messages?.map((m: MessageDataType) => {
          return <Message key={m.id} message={m} />;
        })}
      </div>
      <div className={s.messageInput}>
        <Input />
      </div>
    </div>
  );
};

export default Chat;
