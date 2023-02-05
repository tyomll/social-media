import React from 'react';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from '../../Messenger.module.scss';
import { MessageDataType } from '../../../../types/messageData.type';
import { onMessageSend } from '../../../../utils/onMessageSend';
import { useAppSelector } from '../../../../hooks/redux-hooks';

const Input: React.FC = () => {
  const currentChat = useAppSelector((state) => state.currentChat);
  const [message, setMessage] = React.useState<MessageDataType>({
    text: '',
    image: '',
  });
  return (
    <div className={s.input}>
      <input
        type="text"
        value={message.text}
        placeholder="Write something..."
        onChange={(e) => setMessage({ ...message, text: e.target.value })}
      />
      <label htmlFor="file">
        <FontAwesomeIcon icon={faImage} />
        <input
          id="file"
          type="file"
          onChange={(e) => setMessage({ ...message, image: e.target.files![0] })}
          hidden
        />
      </label>
      <span
        onClick={() => {
          onMessageSend(message, currentChat.userID, currentChat.chatID);
          setMessage({
            text: '',
            image: '',
          });
        }}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </span>
    </div>
  );
};

export default Input;
