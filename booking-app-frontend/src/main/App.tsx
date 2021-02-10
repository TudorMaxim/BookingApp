import { FunctionComponent, useEffect } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { useStore } from '../context/store';
import { loginSuccess } from '../auth/actions';
import { fetchProfileSuccess } from '../profile/actions';
import routes, { IRoute } from '../config/routes';
import Header from '../common/Header';
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

const App: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  useEffect(() => {
    const token = storage.getToken();
    if (token && !state.auth.isAuthenticated) {
      dispatch(loginSuccess(token));
    }
    const profile = storage.getProfile();
    if (profile && state.profile.email !== profile.email) {
      dispatch(fetchProfileSuccess(profile));
    }
  });
  return (
    <BrowserRouter>
      <Header />
      <main className="container container-fluid">
        <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
            />
          ))}
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
