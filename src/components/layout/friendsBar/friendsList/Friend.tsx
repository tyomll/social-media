import React from 'react';
import { useUserData } from '../../../../hooks/useUsers';
import Avatar from '../../../avatar/Avatar';
import s from './Friend.module.scss';
import { Link } from 'react-router-dom';

interface FriendType {
  friendID: string;
}
const Friend: React.FC<FriendType> = ({ friendID }) => {
  const { userData } = useUserData(friendID);

  return (
    <div className={s.friend}>
      <div className={s.avatar}>
        <Link to={`/users/${userData?.id}`}>
          <Avatar id={userData?.id} />
        </Link>
      </div>
      <div className={s.details}>
        <Link to={`/users/${userData?.id}`}>
          <h4>{userData?.firstName + ' ' + userData?.lastName}</h4>
        </Link>
        <span>@{userData?.username}</span>
      </div>
    </div>
  );
};

export default Friend;
