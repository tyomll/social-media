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
import swal from 'sweetalert';

const signUpStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};
const content = {
  type: 'register',
  formHeading: 'Welcome!',
  formHint: 'Register to access to all features of Socialsquare.',
  btnText: 'Sign Up',
};
export const defaultAvatar =
  'https://firebasestorage.googleapis.com/v0/b/social-media-c7b8a.appspot.com/o/defaultAvatar.png?alt=media&token=f2894209-9a04-4845-b464-fa93cad22a5a';
export const defaultCoverImage =
  'https://firebasestorage.googleapis.com/v0/b/social-media-c7b8a.appspot.com/o/defaultCover.png?alt=media&token=b28e10b3-f4ae-4dd9-b066-c1053c6182e0';

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleRegister(data: AuthDataType) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async ({ user }) => {
        const usersRef = doc(db, 'users', user.uid);
        const userChatsRef = doc(db, 'userChats', user.uid);
        await setDoc(usersRef, {
          id: user.uid,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          avatar: defaultAvatar,
          coverImage: defaultCoverImage,
          createdAt: Date.now().toString(),
          friends: [],
        });
        await setDoc(userChatsRef, {});
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: data.username,
            photoURL: defaultAvatar,
          });
        }
        dispatch(
          setAuthUser({
            id: user.uid,
            username: user.displayName,
            email: user.email,
            token: user.refreshToken,
          }),
        );
        navigate(`/users/${user.uid}`);
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
            swal({
              title: 'Oops ErRoR!',
              text: 'Email already in use. Try another one.',
              icon: 'error',
            });
            break;
        }
      });
  }
  return (
    <div style={signUpStyles}>
      <LoginRegisterForm content={content} submitHandler={handleRegister} />
    </div>
  );
};

export default SignIn;
