import { IState } from './types';

const initialState: IState = {
  auth: {
    isLoading: false,
    isAuthenticated: false,
    isRegistered: false,
    isActivated: false,
    token: '',
  },
  profile: {
    name: '',
    email: '',
    isLoading: false,
    company: '',
    description: '',
  },
  dashboard: {
    services: [],
    isLoading: false,
  },
  bookingsPage: {
    isLoading: false,
    bookings: [],
  },
  calendar: {
    isLoading: false,
    bookings: [],
  },
};

export default initialState;
