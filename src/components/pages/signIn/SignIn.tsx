import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { setAuthUser } from '../../../redux/authUser/slice';
import LoginRegisterForm from '../../loginRegisterForm/LoginRegisterForm';

const signInStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 200px)',
  width: '100%',
};
const content = {
  type: 'login',
  formHeading: 'Welcome Back',
  formHint: 'Enter your credentials to access your account.',
  btnText: 'Sign In',
};

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogin(username: string | null, email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      dispatch(
        setAuthUser({
          username: user.displayName,
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        }),
      );
      navigate('/profile');
    });
  }

  return (
    <div style={signInStyles}>
      <LoginRegisterForm content={content} submitHandler={handleLogin} />
    </div>
  );
};

export default SignIn;
