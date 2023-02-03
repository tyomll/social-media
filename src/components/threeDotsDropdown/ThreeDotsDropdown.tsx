import React from 'react';
import './ThreeDotsDropdown.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { onRemoveFriend } from '../../utils/onRemoveFriend';
import { auth } from '../../firebase';

interface ThreeDotsDropdownType {
  friendID: string;
}

const ThreeDotsDropdown: React.FC<ThreeDotsDropdownType> = ({ friendID }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLUListElement>(null);

  function handleRemoveFriend() {
    onRemoveFriend(friendID, auth.currentUser!.uid);
  }

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (dropdownRef.current && target.className !== 'dots') {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="dropdown-container">
      <div className="dots" onClick={() => setIsOpen(!isOpen)}>
        ...
      </div>
      {isOpen && (
        <ul ref={dropdownRef} className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
          <li className="dropdown-option-chat">
            <FontAwesomeIcon icon={faComments} />
            <span>Chat</span>
          </li>
          <li className="dropdown-option-remove" onClick={handleRemoveFriend}>
            <FontAwesomeIcon icon={faUserMinus} />
            <span>Remove friend</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ThreeDotsDropdown;
