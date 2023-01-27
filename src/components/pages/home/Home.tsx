import React from 'react';
import s from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.createPost}>
          <img
            src="https://2.gravatar.com/avatar/8196ac7ecc62ed5aaa2879fe15733dce?s=204&d=identicon&r=G"
            alt="avatar"
          />
          <span>What's new Artyom?</span>
        </div>

        <div className={s.posts}>
          <div className={s.post}>
            <div className={s.author}>
              <img
                src="https://2.gravatar.com/avatar/8196ac7ecc62ed5aaa2879fe15733dce?s=204&d=identicon&r=G"
                alt="avatar"
              />
              <div className={s.authorInfo}>
                <h4>Artyom Hovsepyan</h4>
                <span>12 hours ago</span>
              </div>
            </div>
            <div className={s.description}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo quibusdam assumenda id
              exercitationem aliquam pariatur, rerum facilis sed adipisci tempora.
            </div>
            <div className={s.images}>
              <img
                src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                alt="post"
              />
            </div>
          </div>
          <div className={s.post}>
            <div className={s.author}>
              <img
                src="https://2.gravatar.com/avatar/8196ac7ecc62ed5aaa2879fe15733dce?s=204&d=identicon&r=G"
                alt="avatar"
              />
              <div className={s.authorInfo}>
                <h4>Artyom Hovsepyan</h4>
                <span>12 hours ago</span>
              </div>
            </div>
            <div className={s.description}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo quibusdam assumenda id
              exercitationem aliquam pariatur, rerum facilis sed adipisci tempora.
            </div>
            <div className={s.images}>
              <img
                src="https://i.pinimg.com/736x/f1/eb/4b/f1eb4b6f07f12ac273b09af9f344e078.jpg"
                alt="post"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
