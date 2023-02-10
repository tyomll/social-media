import React from 'react';
import ContentLoader from 'react-content-loader';
import { auth } from '../../../firebase';
import { useUserData } from '../../../hooks/useUsers';
import Request from '../../request/Request';
import s from './FriendsBar.module.scss';
import FriendsList from './friendsList/FriendsList';

const FriendsBar: React.FC = () => {
  const { loading, userData } = useUserData(auth.currentUser?.uid);

  if (auth.currentUser && loading) {
    return (
      <ContentLoader
        speed={2}
        width={330}
        height={540}
        viewBox="0 0 330 550"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <rect x="188" y="338" rx="0" ry="0" width="1" height="0" />
        <rect x="7" y="10" rx="32" ry="32" width="301" height="485" />
      </ContentLoader>
    );
  }

  return (
    <div className={s.root} style={{ display: !auth.currentUser ? 'none' : '' }}>
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
