import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faContactBook, faImage, faUser } from '@fortawesome/free-solid-svg-icons';
import s from './Sidebar.module.scss';
import { auth } from '../../../firebase';
import { useUserData } from '../../../hooks/useUsers';

const pages = [
  {
    icon: faHome,
    title: 'Home',
  },
  {
    icon: faContactBook,
    title: 'Friends',
  },
  {
    icon: faImage,
    title: 'Photos',
  },
  {
    icon: faUser,
    title: 'Profile',
  },
];
const Sidebar: React.FC = () => {
  const { getUserDataById, userData } = useUserData(auth.currentUser?.uid);

  React.useEffect(() => {
    getUserDataById();
  }, []);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.currentUser}>
          <img
            src="https://2.gravatar.com/avatar/8196ac7ecc62ed5aaa2879fe15733dce?s=204&d=identicon&r=G"
            alt="avatar"
          />
          <div className={s.userInfo}>
            <h4>{userData?.firstName + ' ' + userData?.lastName}</h4>
            <span>{'@' + userData?.username}</span>
          </div>
        </div>

        <div className={s.pages}>
          {pages.map((page, i) => {
            return (
              <div
                key={page.title + i}
                className={s.page}
                style={{ borderBottom: i === pages.length - 1 ? 'none' : '' }}>
                <FontAwesomeIcon icon={page.icon} />
                <span>{page.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
