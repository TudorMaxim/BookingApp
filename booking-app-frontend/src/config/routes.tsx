import React from 'react';
import Login from '../auth/components/Login';
import Register from '../auth/components/Register';
import Activate from '../auth/components/Activate';
import Profile from '../profile/components/Profile';
import Dashboard from '../dashboard/components/Dashboard';
import Bookings from '../bookings/components/Bookings';
import Calendar from '../calendar/components/Calendar';

export interface IRoute {
  path: string;
  component: React.ReactNode;
  isPrivate: boolean;
}

const routes: IRoute[] = [{
  path: '/dashboard',
  component: <Dashboard />,
  isPrivate: true,
}, {
  path: '/calendar',
  component: <Calendar />,
  isPrivate: true,
}, {
  path: '/bookings',
  component: <Bookings />,
  isPrivate: true,
}, {
  path: '/profile',
  component: <Profile />,
  isPrivate: true,
}, {
  path: '/login',
  component: <Login />,
  isPrivate: false,
}, {
  path: '/register',
  component: <Register />,
  isPrivate: false,
}, {
  path: '/activate/:id',
  component: <Activate />,
  isPrivate: false,
}, {
  path: '/',
  component: <Dashboard />,
  isPrivate: true,
},
];

export default routes;
