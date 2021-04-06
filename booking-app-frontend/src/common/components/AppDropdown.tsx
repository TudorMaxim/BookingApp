import { FunctionComponent, SetStateAction, Dispatch } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/store';
import authService from '../../service/auth.service';

interface AppDropdownProps {
  name: string,
  imageSrc: string,
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>,
}

const AppDropdown: FunctionComponent<AppDropdownProps> = ({
  name, imageSrc, show, setShow,
}) => {
  const { dispatch } = useStore();
  return (
    <div className="custom-dropdown">
      <div
        className="custom-dropdown-toggle"
        aria-hidden="true"
        onClick={() => setShow(!show)}
        onKeyDown={() => setShow(!show)}
      >
        {name.split(' ')[0]}
        <img className="user-profile-image-small" src={imageSrc} alt="Profile" />
      </div>
      <div className="custom-dropdown-menu" hidden={!show}>
        <Link
          className="nav-link"
          to="/profile"
          onClick={() => setShow(false)}
        >
          Profile
        </Link>
        <Link
          className="nav-link"
          to="/reset"
          onClick={() => setShow(false)}
        >
          Reset Password
        </Link>
        <Dropdown.Divider />
        <div
          className="nav-link"
          aria-hidden="true"
          onClick={() => authService.logout(`Goodbye, ${name}!`, dispatch)}
          onKeyDown={() => authService.logout(`Goodbye, ${name}!`, dispatch)}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default AppDropdown;
