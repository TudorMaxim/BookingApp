import availabilityUtils from '../utils/availability';
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
    services: [{
      id: 's1',
      name: 'Service 1',
      bookings: [{
        id: 'b1',
        userId: 'u1',
        serviceId: 's1',
        name: 'Demo User',
        email: 'demo@gmail.com',
        phoneNumber: '+40740404040',
        duration: 60,
        availability: 'Mon-Fri 10:00-15:00GMT',
        bookingMatrix: [],
      }, {
        id: 'b2',
        userId: 'u1',
        serviceId: 's1',
        name: 'Demo User',
        email: 'demo@gmail.com',
        phoneNumber: '+40740404040',
        duration: 60,
        availability: 'Mon-Fri 10:00-15:00GMT',
        bookingMatrix: [],
      }],
    }, {
      id: 's2',
      name: 'Service 2',
      bookings: [{
        id: 'b3',
        userId: 'u1',
        serviceId: 's2',
        name: 'Demo User 2',
        email: 'demo@gmail.com',
        phoneNumber: '+40740404040',
        duration: 60,
        availability: 'Mon-Wen 10:00-16:00GMT',
        bookingMatrix: [],
      }, {
        id: 'b4',
        userId: 'u1',
        serviceId: 's2',
        name: 'Demo User 2',
        email: 'demo@gmail.com',
        phoneNumber: '+40740404040',
        duration: 60,
        availability: 'Mon-Wen 10:00-16:00GMT',
        bookingMatrix: [],
      }],
    }],
  },
};

export default initialState;
