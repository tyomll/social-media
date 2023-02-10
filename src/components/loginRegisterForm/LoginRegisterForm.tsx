import React from 'react';
import s from './LoginRegisterForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

export interface AuthDataType {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

interface LoginRegisterFormProps {
  content: {
    type: string;
    formHeading: string;
    formHint: string;
    btnText: string;
  };
  submitHandler: (arg: AuthDataType) => void;
}
const LoginRegisterForm: React.FC<LoginRegisterFormProps> = ({ content, submitHandler }) => {
  const [authData, setAuthData] = React.useState<AuthDataType>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.card}>
          <div className={s.heading}>
            <h2>{content.formHeading}</h2>
            <span>{content.formHint}</span>
          </div>
          <div className={s.form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (content.type === 'login') {
                  submitHandler(authData);
                } else {
                  submitHandler(authData);
                }
              }}>
              {content.type === 'register' && (
                <>
                  <div className={s.fullName}>
                    <div className={s.input}>
                      <FontAwesomeIcon icon={faUser} />
                      <input
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => {
                          setAuthData({ ...authData, firstName: e.target.value });
                        }}
                      />
                    </div>
                    <div className={s.input}>
                      <FontAwesomeIcon icon={faUser} />
                      <input
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => {
                          setAuthData({ ...authData, lastName: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className={s.input}>
                    <FontAwesomeIcon icon={faUser} />
                    <input
                      type="text"
                      placeholder="Username"
                      onChange={(e) => {
                        setAuthData({ ...authData, username: e.target.value });
                      }}
                    />
                  </div>
                </>
              )}
              <div className={s.input}>
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  type="text"
                  placeholder={content.type === 'login' ? 'Your email' : 'Email'}
                  onChange={(e) => {
                    setAuthData({ ...authData, email: e.target.value });
                  }}
                />
              </div>
              <div className={s.input}>
                <FontAwesomeIcon icon={faLock} />
                <input
                  type="password"
                  placeholder={content.type === 'login' ? 'Your password' : 'Password'}
                  onChange={(e) => {
                    setAuthData({ ...authData, password: e.target.value });
                  }}
                />
              </div>
              {content.type === 'register' && (
                <div className={s.input}>
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type="password"
                    placeholder="Password Confirmation"
                    onChange={(e) => {
                      setAuthData({ ...authData, passwordConfirmation: e.target.value });
                    }}
                  />
                </div>
              )}
              <button type="submit">{content.btnText}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
