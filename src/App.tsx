import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreatePost from './components/createPost/CreatePost';
import MainLayout from './components/layout/MainLayout';
import { useAuth } from './hooks/use-auth';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import { checkAuthUser } from './utils/checkAuthUser';

const App: React.FC = () => {
  const { isAuth } = useAuth();

  React.useEffect(() => {
    checkAuthUser();
  }, [isAuth]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
