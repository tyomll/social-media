import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import React from 'react';
import Avatar from '../../../../components/avatar/Avatar';
import { auth } from '../../../../firebase';
import s from '../../Messenger.module.scss';

interface MessageType {
  message: any;
}

const Message: React.FC<MessageType> = ({ message }) => {
  const ref = React.useRef<any>(null);

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
