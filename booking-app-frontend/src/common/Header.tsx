import { FunctionComponent } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../context/store';
import BookingAppLogoSmall from '../assets/BookingAppLogoSmall.png';
import './Header.sass';

const PublicLinks: FunctionComponent = () => (
  <Navbar.Collapse id="header-navbar">
    <Nav className="ml-auto">
      <Link className="nav-link" to="/login"> Login </Link>
      <Link className="nav-link" to="/register"> Register </Link>
    </Nav>
  </Navbar.Collapse>
);

const PrivateLinks: FunctionComponent = () => (
  <Navbar.Collapse id="header-navbar">
    <Nav className="ml-auto">
      <Link className="nav-link" to="/dashboard"> Dashboard </Link>
      <Link className="nav-link" to="/bookings"> Bookings </Link>
      <Link className="nav-link" to="/calendar"> Calendar </Link>
      <Link className="nav-link" to="/profile"> Profile </Link>
    </Nav>
  </Navbar.Collapse>
);

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
