import { FunctionComponent, useEffect } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { useStore } from '../context/store';
import { loginSuccess } from '../auth/actions';
import routes, { IRoute } from '../config/routes';
import authService from '../service/auth.service';
import Header from '../common/Header';

const AppRoute: FunctionComponent<IRoute> = ({ path, component, isPrivate }) => {
  const loggedIn = authService.isLoggedIn();
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
    const userDataJson = localStorage.getItem('userData');
    if (userDataJson && !state.auth.isAuthenticated) {
      dispatch(loginSuccess(JSON.parse(userDataJson)));
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
