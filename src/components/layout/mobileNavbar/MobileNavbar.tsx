import React from 'react';
import { faComment, faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../../firebase';
import s from './MobileNavbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../../avatar/Avatar';
import { Link } from 'react-router-dom';
import CreatePost from '../../createPost/CreatePost';

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
  const [createPostMode, setCreatePostMode] = React.useState<boolean>(false);
  return (
    <>
      {auth.currentUser && (
        <div className={s.root}>
          {createPostMode && <CreatePost setCreatePostMode={setCreatePostMode} />}
          {pages.map((page) => {
            return (
              <React.Fragment key={page.title}>
                {page.title.toLowerCase() === 'profile' && (
                  <div className={s.create} onClick={() => setCreatePostMode(true)}>
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
      )}
    </>
  );
};

export default MobileNavbar;
