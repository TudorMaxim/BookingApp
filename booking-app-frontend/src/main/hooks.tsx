import { useEffect, useRef } from 'react';
import { loginSuccess } from '../auth/actions';
import { useStore } from '../context/store';
import { fetchProfileSuccess } from '../profile/actions';
import bookingService from '../service/booking.service';
import dashboardService from '../service/dashboard.service';
import storage from '../utils/storage';

export const useUserProfile = (): void => {
  const { state, dispatch } = useStore();
  useEffect(() => {
    const token = storage.getToken();
    if (token && !state.auth.isAuthenticated) {
      dispatch(loginSuccess(token));
      dashboardService.fetchServices(dispatch);
    }
    const profile = storage.getProfile();
    if (profile && state.profile.email !== profile.email) {
      dispatch(fetchProfileSuccess(profile));
    }
  });
};

export const useInitializer = (): void => {
  const initialMount = useRef(true);
  const { dispatch } = useStore();
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      dashboardService.fetchServices(dispatch);
      const user = storage.getProfile();
      if (user) {
        bookingService.fetchByUser(user.id as string, dispatch);
      }
    }
  });
};

export const useBookings = (): void => {
  const shouldFetchBookings = useRef(true);
  const { state, dispatch } = useStore();
  const { services } = state.dashboard;
  useEffect(() => {
    if (services.length && shouldFetchBookings.current) {
      shouldFetchBookings.current = false;
      bookingService.fetchByService(services[0].id as string, dispatch);
    }
  });
};
