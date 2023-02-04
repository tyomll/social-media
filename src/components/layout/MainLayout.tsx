import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FriendsBar from './friendsBar/FriendsBar';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const layoutContentStyles = {
  display: 'flex',
  padding: '30px',
  minHeight: 'calc(100vh - 100px)',
  backgroundColor: '#F9FAFC',
  gap: '50px',
};

const MainLayout: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <div style={layoutContentStyles}>
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
    </>
  );
};

export default MainLayout;
