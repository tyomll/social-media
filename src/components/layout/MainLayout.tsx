import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FriendsBar from './friendsBar/FriendsBar';
import Header from './header/Header';
import MobileNavbar from './mobileNavbar/MobileNavbar';
import Sidebar from './sidebar/Sidebar';
import s from './MainLayout.module.scss';

const MainLayout: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <div className={s.root}>
        {location.pathname === '/register' || location.pathname === '/login' ? (
          <Outlet />
        ) : (
          <>
            {location.pathname !== '/messenger' && <Sidebar />}
            <Outlet />
            {location.pathname !== '/profile' && <FriendsBar />}
          </>
        )}
      </div>
      <MobileNavbar />
    </>
  );
};

export default MainLayout;
