import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './Searchbar.module.scss';
import Avatar from '../avatar/Avatar';
import { useSearch } from '../../hooks/useSearch';
import { auth } from '../../firebase';

const Searchbar: React.FC = () => {
  const [input, setInput] = React.useState<string>('');
  const { users, getSearchUser } = useSearch(input);

  React.useEffect(() => {
    (async () => {
      if (input) {
        await getSearchUser();
      }
    })();
  }, [input]);

  return (
    <div className={s.root}>
      <div className={s.search}>
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Search for users..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className={s.results}>
        {input.length > 0 && users && (
          <ul>
            {users?.map((user) => {
              if (user.id !== auth.currentUser?.uid) {
                return (
                  <li className={s.user} key={user.id}>
                    <div className={s.avatar}>
                      <Avatar id={user.id} />
                    </div>
                    <div className={s.info}>
                      <h4>{user.firstName + ' ' + user.lastName}</h4>
                      <span>@{user.username}</span>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        )}
        {input.length > 0 && users?.length === 0 && (
          <ul>
            <li className={s.user}>
              <div className={s.info}>
                <h4>Nothing found</h4>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
