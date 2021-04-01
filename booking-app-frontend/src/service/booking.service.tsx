import { Dispatch } from 'react';
import { setFlash } from '../common/actions';
import { MessageTypes } from '../common/actions/types';
import { IAction } from '../context/rootReducer';
import { IBookingState } from '../context/types';
import authService from './auth.service';
import storage from '../utils/storage';
import { fetchFailure, fetchRequest, fetchSuccess } from '../calendar/actions';
import {
  submitBookingFailure, submitBookingRequest, submitBookingSuccess,
} from '../dashboard/actions';
import { fetchByServiceFailure, fetchByServiceRequest, fetchByServiceSuccess } from '../bookings/actions';

const create = async (
  booking: IBookingState,
  dispatch: Dispatch<IAction>,
): Promise<void> => {
  dispatch(submitBookingRequest());
  const token = storage.getToken();
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/bookings`, {
    method: 'POST',
    body: JSON.stringify(booking),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  if (response.ok) {
    dispatch(submitBookingSuccess());
  } else if (response.status === 401) {
    authService.logout(MessageTypes.SESSION_EXPIRED, dispatch);
    dispatch(setFlash({
      message: MessageTypes.SESSION_EXPIRED,
      success: false,
    }));
  } else {
    dispatch(submitBookingFailure(body.message));
    dispatch(setFlash({
      message: body.message,
      success: false,
    }));
  }
};

const fetchByService = async (
  serviceId: string,
  dispatch: Dispatch<IAction>,
): Promise<void> => {
  dispatch(fetchByServiceRequest());
  const token = storage.getToken();
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/bookings?serviceId=${serviceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  if (response.ok) {
    dispatch(fetchByServiceSuccess(body.bookings));
  } else if (response.status === 401) {
    authService.logout(MessageTypes.SESSION_EXPIRED, dispatch);
    dispatch(setFlash({
      message: MessageTypes.SESSION_EXPIRED,
      success: false,
    }));
  } else {
    dispatch(fetchByServiceFailure(body.message));
    dispatch(setFlash({
      message: body.message,
      success: false,
    }));
  }
};

const fetchByUser = async (
  userId: string,
  dispatch: Dispatch<IAction>,
): Promise<void> => {
  dispatch(fetchRequest());
  const token = storage.getToken();
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/bookings?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  if (response.ok) {
    dispatch(fetchSuccess(body.bookings));
  } else if (response.status === 401) {
    authService.logout(MessageTypes.SESSION_EXPIRED, dispatch);
    dispatch(setFlash({
      message: MessageTypes.SESSION_EXPIRED,
      success: false,
    }));
  } else {
    dispatch(fetchFailure(body.message));
    dispatch(setFlash({
      message: body.message,
      success: false,
    }));
  }
};

const bookingService = {
  create,
  fetchByService,
  fetchByUser,
};

export default bookingService;
