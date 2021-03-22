import { FunctionComponent } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IRoute } from '../config/routes';
import { useStore } from '../context/store';
import storage from '../utils/storage';

const AppRoute: FunctionComponent<IRoute> = ({ path, component, isPrivate }) => {
  const { state } = useStore();
  const loggedIn = state.auth.isAuthenticated || storage.getToken() !== null;
  if (!loggedIn && isPrivate) {
    return <Redirect to="/login" />;
  }
  if (loggedIn && !isPrivate) {
    return <Redirect to="/" />;
  }
  const exact = path === '/';
  return (
    <Route exact={exact} path={path}>
      {component}
    </Route>
  );
};

export default AppRoute;
