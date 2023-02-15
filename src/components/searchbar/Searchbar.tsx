import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './Searchbar.module.scss';
import Avatar from '../avatar/Avatar';
import { useSearch } from '../../hooks/useSearch';
import { auth } from '../../firebase';
import { Link, useLocation } from 'react-router-dom';
import { onSelectChat } from '../../utils/onSelectChat';

interface SearchbarType {
  component?: string;
}
const Searchbar: React.FC<SearchbarType> = ({ component }) => {
  const location = useLocation();
  const [input, setInput] = React.useState<string>('');
  const { users, getSearchUser } = useSearch(input);
  const [inputMode, setInputMode] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      if (input) {
        await getSearchUser();
      }
    })();
  }, [input]);

  return (
    <div className={s.root} style={{ width: inputMode ? 'fit-content' : '' }}>
      <div className={s.search} style={{ paddingRight: '15px' }}>
        <FontAwesomeIcon
          icon={faSearch}
          onClick={() => {
            setInput('');
            setInputMode(!inputMode);
          }}
        />
        <input
          type="text"
          placeholder="Search for users..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          hidden={!location.pathname.includes('messenger') ? inputMode : false}
        />
      </div>
      <div className={s.results}>
        {input.length > 0 && users && (
          <ul>
            {users?.map((user) => {
              if (user.id !== auth.currentUser?.uid) {
                return (
                  <li
                    className={s.user}
                    key={user.id}
                    style={{ cursor: component === 'messenger' ? 'pointer' : '' }}
                    onClick={() => {
                      component === 'messenger' && onSelectChat(user.id);
                      setInput('');
                    }}>
                    <div className={s.avatar}>
                      {component !== 'messenger' ? (
                        <Link to={`/users/${user.id}`}>
                          <Avatar id={user.id} />
                        </Link>
                      ) : (
                        <Avatar id={user.id} />
                      )}
                    </div>
                    <div className={s.info}>
                      {component !== 'messenger' ? (
                        <Link to={`/users/${user.id}`}>
                          <h4>{user.firstName + ' ' + user.lastName}</h4>
                        </Link>
                      ) : (
                        <h4>{user.firstName + ' ' + user.lastName}</h4>
                      )}

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
