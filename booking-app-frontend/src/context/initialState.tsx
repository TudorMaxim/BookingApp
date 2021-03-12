import calendarUtils from '../utils/calendar';
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
  bookingsPage: { // TODO: remove mock data and use data fetched from the server.
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
  calendar: { // TODO: remove mock data and use data fetched from the server.
    isLoading: false,
    bookings: [{
      id: 'b3',
      userId: 'u1',
      serviceId: 's2',
      serviceName: 'First Service',
      name: 'Demo User 2',
      email: 'demo@gmail.com',
      phoneNumber: '+40740404040',
      duration: 60,
      availability: 'Mon-Wen 10:00-16:00GMT',
      bookingMatrix: calendarUtils.generateRandomBooking(),
    }, {
      id: 'b4',
      userId: 'u1',
      serviceId: 's2',
      serviceName: 'Second Service',
      name: 'Demo User 2',
      email: 'demo@gmail.com',
      phoneNumber: '+40740404040',
      duration: 120,
      availability: 'Mon-Wen 10:00-16:00GMT',
      bookingMatrix: calendarUtils.generateRandomBooking(),
    }],
  },
};

export default initialState;
