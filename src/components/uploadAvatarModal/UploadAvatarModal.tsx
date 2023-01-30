import React from 'react';
import Avatar from 'react-avatar-edit';
import { useUserAvatarUpload } from '../../hooks/useUsers';
import s from './UploadAvatarModal.module.scss';

interface UploadAvatarModalType {
  setAvatarUploadMode: (arg: boolean) => void;
}
const UploadAvatarModal: React.FC<UploadAvatarModalType> = ({ setAvatarUploadMode }) => {
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const uploadAvatar = useUserAvatarUpload(avatar!);

  async function onSubmit() {
    setAvatarUploadMode(false);
    await uploadAvatar();
  }

  function onClose() {
    setAvatar(null);
  }
  function onCrop(preview: any) {
    setAvatar(preview);
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

        <div className={s.buttons}>
          <button onClick={onClose}>Close</button>
          <button onClick={onSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};
export default UploadAvatarModal;
