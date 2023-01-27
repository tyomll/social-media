import React from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { setAuthUser } from '../../../redux/authUser/slice';
import LoginRegisterForm from '../../loginRegisterForm/LoginRegisterForm';

const signUpStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 200px)',
  width: '100%',
};
const content = {
  type: 'register',
  formHeading: 'Welcome!',
  formHint: 'Register to access to all features of Socialsquare.',
  btnText: 'Sign Up',
};

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleRegister(username: string | null, email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
      const ref = doc(db, 'users', user.uid);
      await setDoc(ref, { createdAt: Date.now().toString(), username, email });
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: username });
      }
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
    <div style={signUpStyles}>
      <LoginRegisterForm content={content} submitHandler={handleRegister} />
    </div>
  );
};

export default SignIn;
