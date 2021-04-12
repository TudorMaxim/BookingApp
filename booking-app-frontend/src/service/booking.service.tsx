import { Dispatch } from 'react';
import { setFlash } from '../common/actions';
import { MessageTypes } from '../common/actions/types';
import { IAction } from '../context/rootReducer';
import { IBookingState } from '../context/types';
import authService from './auth.service';
import storage from '../utils/storage';
import {
  fetchFailure, fetchRequest, fetchSuccess, updateBooking,
} from '../calendar/actions';
import {
  submitBookingFailure, submitBookingRequest, submitBookingSuccess,
} from '../dashboard/actions';
import { fetchByServiceFailure, fetchByServiceRequest, fetchByServiceSuccess } from '../bookings/actions';
import availabilityUtils from '../utils/availability';

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

const update = async (
  booking: IBookingState,
  day: number,
  hour: number,
  dispatch: Dispatch<IAction>,
): Promise<void> => {
  dispatch(updateBooking(booking, day, hour));
  const token = storage.getToken();
  const updatedBooking = booking;
  updatedBooking.bookingMatrix = availabilityUtils.matrixSet(
    availabilityUtils.matrixInit(),
    true,
    hour,
    day - 1,
  );
  await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/bookings`, {
    method: 'PATCH',
    body: JSON.stringify(booking),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

const fetchAll = async (
  userId: string,
  dispatch: Dispatch<IAction>,
): Promise<void> => {
  dispatch(fetchByServiceRequest());
  const token = storage.getToken();
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/bookings?userId=${userId}`, {
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

const bookingService = {
  create,
  update,
  fetchByService,
  fetchByUser,
  fetchAll,
};

export default bookingService;
