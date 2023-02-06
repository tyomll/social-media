import React from 'react';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './PhotoViewer.module.scss';

interface PhotoViewerType {
  image: string;
  setMode: (arg: boolean) => void;
}
const PhotoViewer: React.FC<PhotoViewerType> = ({ image, setMode }) => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <span onClick={() => setMode(false)}>
          <FontAwesomeIcon icon={faX} />
        </span>
        <img src={image!} alt="" />
      </div>
    </div>
  );
};

export default PhotoViewer;
