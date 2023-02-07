import React from 'react';
import { faImage, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './CreateStoryModal.module.scss';
import { convertFileToBase64 } from '../../utils/convertFileToBase64';
import html2canvas from 'html2canvas';
import { useStories } from '../../hooks/useStories';

interface CreateStoryModalType {
  setMode: (arg: boolean) => void;
}

const CreateStoryModal: React.FC<CreateStoryModalType> = ({ setMode }) => {
  const { uploadStory } = useStories();
  const [text, setText] = React.useState<string>('');
  const [image, setImage] = React.useState<string>();
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const storyElementRef = React.useRef<HTMLDivElement>(null);
  const submitElementRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target !== submitElementRef.current) {
      setX(event.clientX);
      setY(event.clientY);
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const base64 = await convertFileToBase64(file);
      setImage(base64 as string);
    }
  };

  const onSubmitStory = async () => {
    if (text || image) {
      html2canvas(storyElementRef.current!)
        .then((canvas) => {
          const dataURL = canvas.toDataURL();
          uploadStory(dataURL);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert('You must write text or upload image.');
    }
  };

  return (
    <div className={s.root}>
      <div className={s.container} onClick={handleClick}>
        <div className={s.actions}>
          <div className={s.close} onClick={() => setMode(false)}>
            <FontAwesomeIcon icon={faX} />
          </div>
          <div className={s.imageUpload}>
            <label htmlFor="file">
              <input id="file" type="file" onChange={(e) => onFileChange(e)} hidden />
              <FontAwesomeIcon icon={faImage} />
            </label>
          </div>
        </div>
        <div ref={storyElementRef} className={s.storyContent}>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            style={{
              top: y,
              left: x,
            }}
          />
          {image && (
            <img
              src={image}
              alt="story"
              style={{
                objectFit: 'cover',
              }}
            />
          )}
        </div>
        <div className={s.publish} onClick={onSubmitStory} ref={submitElementRef}>
          <span>Publish</span>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryModal;
