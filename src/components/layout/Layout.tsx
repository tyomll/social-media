import React from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const Layout: React.FC = ({ children }: any) => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
