import { FunctionComponent, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/store';
import imagesService from '../../service/images.service';
import BookingAppLogoSmall from '../../assets/BookingAppLogoSmall.png';
import DefaultProfileImage from '../../assets/DefaultProfileImage.png';
import AppDropdown from './AppDropdown';
import '../styles/Header.sass';

const PublicLinks: FunctionComponent = () => (
  <Navbar.Collapse id="header-navbar">
    <Nav className="ml-auto">
      <Link className="nav-link" to="/login"> Login </Link>
      <Link className="nav-link" to="/register"> Register </Link>
    </Nav>
  </Navbar.Collapse>
);

const PrivateLinks: FunctionComponent = () => {
  const [show, setShow] = useState(false);
  const { state } = useStore();
  const { hasImage, imageKey, name } = state.profile;
  let imageSrc = DefaultProfileImage;
  if (hasImage && imageKey) {
    imageSrc = imagesService.getURL(imageKey);
  }
  return (
    <Navbar.Collapse id="header-navbar">
      <Nav className="ml-auto">
        <Link
          className="nav-link"
          to="/dashboard"
          onClick={() => setShow(false)}
        >
          Services
        </Link>
        <Link
          className="nav-link"
          to="/bookings"
          onClick={() => setShow(false)}
        >
          Bookings
        </Link>
        <Link
          className="nav-link"
          to="/calendar"
          onClick={() => setShow(false)}
        >
          Calendar
        </Link>
        <AppDropdown
          name={name}
          imageSrc={imageSrc}
          show={show}
          setShow={setShow}
        />
      </Nav>
    </Navbar.Collapse>
  );
};

const Header: FunctionComponent = () => {
  const { state } = useStore();
  const headerLinks = state.auth.isAuthenticated ? <PrivateLinks /> : <PublicLinks />;
  return (
    <Navbar bg="light" expand="sm">
      <Link to="/" className="navbar-brand">
        <img id="header-logo-image" src={BookingAppLogoSmall} alt="Logo" />
        Booking App
      </Link>
      {headerLinks}
    </Navbar>
  );
};

export default Header;
