import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import s from './Sidebar.module.scss';
import { auth } from '../../../firebase';
import { useUserData } from '../../../hooks/useUsers';
import { Link } from 'react-router-dom';
import Avatar from '../../avatar/Avatar';
import ContentLoader from 'react-content-loader';

const pages = [
  {
    link: '/',
    icon: faHome,
    title: 'Home',
  },
  {
    link: `/users/${auth.currentUser?.uid}`,
    icon: faUser,
    title: 'Profile',
  },
  {
    link: '/messenger',
    icon: faComment,
    title: 'Messenger',
  },
];
const Sidebar: React.FC = () => {
  const { userData } = useUserData(auth.currentUser?.uid);

  if (auth.currentUser && !userData) {
    return (
      <ContentLoader
        speed={2}
        width={330}
        height={540}
        viewBox="0 0 330 550"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <rect x="188" y="338" rx="0" ry="0" width="1" height="0" />
        <rect x="7" y="10" rx="32" ry="32" width="301" height="485" />
      </ContentLoader>
    );
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        {auth.currentUser && (
          <div className={s.currentUser}>
            <Link to={`/users/${auth.currentUser?.uid}`}>
              <Avatar id={auth.currentUser?.uid} />
            </Link>
            <div className={s.userInfo}>
              <h4>{userData?.firstName + ' ' + userData?.lastName}</h4>
              <span>{'@' + userData?.username}</span>
            </div>
          </div>
        )}

        <div className={s.pages}>
          {auth.currentUser ? (
            pages.map((page, i) => {
              return (
                <Link
                  key={page.title + i}
                  to={
                    page.title.toLowerCase() === 'profile'
                      ? `/users/${auth.currentUser?.uid}`
                      : page.link
                  }
                  className={s.page}
                  style={{ borderBottom: i === pages.length - 1 ? 'none' : '' }}>
                  <FontAwesomeIcon icon={page.icon} />
                  <span>{page.title}</span>
                </Link>
              );
            })
          ) : (
            <Link key="home" to="/" className={s.page}>
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
