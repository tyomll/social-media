import React from 'react';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './CreateStoryModal.module.scss';
import { toPng } from 'html-to-image';

const CreateStoryModal = () => {
  const [text, setText] = React.useState<string>('');
  const [image, setImage] = React.useState<any>();
  const storyElementRef = React.useRef<HTMLDivElement>(null);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const handleClick = (event: any) => {
    setX(event.clientX);
    setY(event.clientY);
  };

  const onSubmitStory = async () => {
    if (storyElementRef.current !== null) {
      await toPng(storyElementRef.current, { cacheBust: true })
        .then(async (dataUrl) => {
          console.log(dataUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={s.root}>
      <div className={s.container} onClick={handleClick}>
        <div className={s.actions}>
          <div className={s.imageUpload}>
            <label htmlFor="file">
              <input id="file" type="file" onChange={(e) => setImage(e.target.files![0])} hidden />
              <FontAwesomeIcon icon={faImage} />
            </label>
          </div>
        </div>
        {/* <div ref={storyElementRef} className={s.storyContent}>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            style={{
              top: y,
              left: x,
            }}
          />
          {image && <img src={image} alt="story" />}
        </div> */}
        <div className={s.publish} onClick={onSubmitStory}>
          <span>Publish</span>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryModal;
