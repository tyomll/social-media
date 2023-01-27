import React from 'react';
import { Outlet } from 'react-router-dom';
import FriendsBar from './friendsBar/FriendsBar';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const layoutContentStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '30px',
  minHeight: 'calc(100vh - 100px)',
  backgroundColor: '#F9FAFC',
  gap: '50px',
};

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div style={layoutContentStyles}>
        <Sidebar />
        <Outlet />
        <FriendsBar />
      </div>
    </>
  );
};

export default MainLayout;
