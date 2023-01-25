import React from 'react';
import Layout from './components/layout/Layout';
import Home from './components/pages/home/Home';

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default App;
