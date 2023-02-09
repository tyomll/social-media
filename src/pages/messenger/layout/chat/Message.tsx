import React from 'react';
import { format } from 'date-fns';

import Avatar from '../../../../components/avatar/Avatar';
import { auth } from '../../../../firebase';
import s from '../../Messenger.module.scss';
import { MessageDataType } from '../../../../types/messageData.type';

interface MessageType {
  message: MessageDataType;
}

const Message: React.FC<MessageType> = ({ message }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message]);

  return (
    <div
      ref={ref}
      className={s.message}
      style={{
        flexDirection: message.senderID === auth.currentUser?.uid ? 'row-reverse' : undefined,
      }}>
      <div className={s.avatar}>
        <Avatar id={message.senderID} />
      </div>
      <div className={s.content}>
        {message.image && <img src={message.image} />}
        <div className={s.details}>
          <span className={s.text}>{message.text}</span>
          <span className={s.date}>{format(message.date, 'HH:mm')}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
