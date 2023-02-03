import React from 'react';
import { auth } from '../../../firebase';
import { useUserData } from '../../../hooks/useUsers';
import Request from '../../request/Request';
import s from './FriendsBar.module.scss';
import FriendsList from './friendsList/FriendsList';

const FriendsBar: React.FC = () => {
  const { userData } = useUserData(auth.currentUser?.uid);

  return (
    <div className={s.root}>
      <div className={s.container}>
        {userData?.friendRequests ? (
          <>
            <div className={s.header}>
              <h4>REQUESTS</h4>
              <span>{userData?.friendRequests.length}</span>
            </div>
            <div className={s.requests}>
              {userData?.friendRequests?.map((userID: string) => {
                return <Request key={userID} id={userID} />;
              })}
            </div>
          </>
        ) : (
          <>
            <div className={s.header}>
              <h4>Requests</h4>
              <span>0</span>
            </div>
          </>
        )}
        <div className={s.header}>
          <h4>FRIENDS</h4>
          <span>{userData?.friends.length}</span>
        </div>
        <div className={s.friends}>
          <FriendsList userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default FriendsBar;
