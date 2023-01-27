import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
