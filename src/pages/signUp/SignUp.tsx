import React from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { setAuthUser } from '../../redux/authUser/slice';
import LoginRegisterForm, {
  AuthDataType,
} from '../../components/loginRegisterForm/LoginRegisterForm';

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

  function handleRegister(data: AuthDataType) {
    createUserWithEmailAndPassword(auth, data.email, data.password).then(async ({ user }) => {
      const ref = doc(db, 'users', user.uid);
      await setDoc(ref, {
        id: user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: Date.now().toString(),
        username: data.username,
        email: data.email,
      });
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: data.username });
      }
      dispatch(
        setAuthUser({
          id: user.uid,
          username: user.displayName,
          email: user.email,
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
