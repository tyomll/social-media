import React from 'react';
import s from './FriendsBar.module.scss';
const FriendsBar: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.header}>
          <h4>FRIENDS</h4>
          <span>12</span>
        </div>
        <div className={s.friends}>
          <div className={s.friend}>
            <img
              src="https://0.gravatar.com/avatar/fcfa3fc00f244f160aa0b363cb3d46e7?s=204&d=identicon&r=G"
              alt="friend"
            />
            <h4>Gago Dzya</h4>
          </div>
          <div className={s.friend}>
            <img
              src="https://media.licdn.com/dms/image/C4D22AQHKKOMFM6DFhg/feedshare-shrink_1280/0/1674729900394?e=1677715200&v=beta&t=Ca6Q3f0jLcPH3aUrf2pMKEqOBijHLGyHC3-nRenYPis"
              alt="friend"
            />
            <h4>Valod Pap</h4>
          </div>
          <div className={s.friend}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMZwSWQPfhyX4RkPi5Z1y_LHEkuxhmJw8sVbNd6tLAT2bsEce6vAQGLXhi5TLexurO1PY&usqp=CAU"
              alt="friend"
            />
            <h4>Ruzan Moqir</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsBar;
