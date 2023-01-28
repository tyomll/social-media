import React from 'react';
import Avatar from 'react-avatar-edit';
import s from './UploadAvatarModal.module.scss';

function UploadAvatarModal() {
  const [preview, setPreview] = React.useState(null);

  function onClose() {
    setPreview(null);
  }
  function onCrop(pv: any) {
    setPreview(pv);
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h2>Uploading Avatar</h2>
        <Avatar
          width={300}
          height={300}
          imageWidth={300}
          onCrop={onCrop}
          onClose={onClose}
          src={undefined}
          label="Choose your photo..."
          labelStyle={{ color: 'rgb(145, 164, 191)', cursor: 'pointer' }}
          borderStyle={{
            display: 'flex',
            justifyContent: 'center',
            border: '2px solid #1d3a5f',
            borderRadius: '25px',
            fontSize: '17px',
            cursor: 'pointer',
          }}
        />
        {preview && <img src={preview} alt="Preview" />}

        <div className={s.buttons}>
          <button>Close</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
}
export default UploadAvatarModal;
