import React from 'react';
import { faCheck, faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from '../../Messenger.module.scss';
import { onMessageSend } from '../../../../utils/onMessageSend';
import { useAppSelector } from '../../../../hooks/redux-hooks';

const Input: React.FC = () => {
  const currentChat = useAppSelector((state) => state.currentChat);
  const [message, setMessage] = React.useState({
    text: '' as string,
    image: '' as any,
  });
  return (
    <div className={s.input}>
      <input
        type="text"
        value={message.text}
        placeholder="Write something..."
        onChange={(e) => {
          setMessage({ ...message, text: e.target.value });
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (message.image !== '' || message.text !== '') {
              onMessageSend(message, currentChat.userID, currentChat.chatID);
              setMessage({
                text: '',
                image: '',
              });
            } else {
              alert('You must fill all fields.');
            }
          }
        }}
      />
      <label htmlFor="file" style={{ backgroundColor: message.image ? '#0954b6' : '' }}>
        <FontAwesomeIcon icon={message.image ? faCheck : faImage} />
        <input
          id="file"
          type="file"
          onChange={(e) => setMessage({ ...message, image: e.target.files![0] })}
          hidden
        />
      </label>
      <span
        onClick={() => {
          if (message.image !== '' || message.text !== '') {
            onMessageSend(message, currentChat.userID, currentChat.chatID);
            setMessage({
              text: '',
              image: '',
            });
          } else {
            alert('You must fill all fields.');
          }
        }}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </span>
    </div>
  );
};

export default Input;
