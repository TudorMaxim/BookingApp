import { FunctionComponent } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import routes from '../config/routes';
import Header from '../common/components/Header';
import AppRoute from './AppRoute';
import { useUserProfile, useInitializer, useBookings } from './hooks';

const App: FunctionComponent = () => {
  useUserProfile();
  useInitializer();
  useBookings();
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
