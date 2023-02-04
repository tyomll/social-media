import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faContactBook,
  faImage,
  faUser,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import s from './Sidebar.module.scss';
import { auth } from '../../../firebase';
import { useUserData } from '../../../hooks/useUsers';
import { Link } from 'react-router-dom';
import Avatar from '../../avatar/Avatar';

const pages = [
  {
    link: '/',
    icon: faHome,
    title: 'Home',
  },
  {
    link: '/messenger',
    icon: faComment,
    title: 'Messenger',
  },
  {
    link: '/friends',
    icon: faContactBook,
    title: 'Friends',
  },
  {
    link: '/photos',
    icon: faImage,
    title: 'Photos',
  },
  {
    link: '/profile',
    icon: faUser,
    title: 'Profile',
  },
];
const Sidebar: React.FC = () => {
  const { loading, userData } = useUserData(auth.currentUser?.uid);

  if (loading) {
    return <>loading...</>;
  }
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.currentUser}>
          <Link to={`/users/${auth.currentUser?.uid}`}>
            <Avatar />
          </Link>
          <div className={s.userInfo}>
            <h4>{userData?.firstName + ' ' + userData?.lastName}</h4>
            <span>{'@' + userData?.username}</span>
          </div>
        </div>
        <div className={s.pages}>
          {pages.map((page, i) => {
            return (
              <Link
                key={page.title + i}
                to={page.link}
                className={s.page}
                style={{ borderBottom: i === pages.length - 1 ? 'none' : '' }}>
                <FontAwesomeIcon icon={page.icon} />
                <span>{page.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
