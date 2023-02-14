import React from 'react';
import { faComment, faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../../firebase';
import s from './MobileNavbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../../avatar/Avatar';
import { Link } from 'react-router-dom';

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
    link: `/users/${auth.currentUser?.uid}`,
    icon: faUser,
    title: 'Profile',
  },
];

const MobileNavbar = () => {
  return (
    <div className={s.root}>
      {pages.map((page) => {
        return (
          <React.Fragment key={page.title}>
            {page.title.toLowerCase() === 'profile' && (
              <div className={s.create}>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            )}
            <Link to={page.link} className={s.page}>
              {page.title.toLowerCase() === 'profile' ? (
                <>
                  <div className={s.avatar}>
                    <Avatar id={auth.currentUser?.uid} />
                  </div>
                </>
              ) : (
                <FontAwesomeIcon icon={page.icon} />
              )}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MobileNavbar;
