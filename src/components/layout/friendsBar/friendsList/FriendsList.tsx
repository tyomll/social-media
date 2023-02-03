import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { UserDataType } from '../../../../types/userData.type';
import Friend from './Friend';

interface FriendsListType {
  userData: DocumentData | UserDataType | undefined;
}
const FriendsList: React.FC<FriendsListType> = ({ userData }) => {
  return (
    <div>
      {userData?.friends.map((friendID: string) => {
        return <Friend key={friendID} friendID={friendID} />;
      })}
    </div>
  );
};

export default FriendsList;
