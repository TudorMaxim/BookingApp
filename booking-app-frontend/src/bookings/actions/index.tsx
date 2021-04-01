import { IBookingState } from '../../context/types';
import { BookingsPageActionTypes, IBookingsPageAction } from './types';

export const fetchByServiceRequest = (): IBookingsPageAction => ({
  type: BookingsPageActionTypes.FETCH_REQUEST,
});

export const fetchByServiceSuccess = (bookings: IBookingState[]): IBookingsPageAction => ({
  type: BookingsPageActionTypes.FETCH_SUCCESS,
  bookings,
});

export const fetchByServiceFailure = (message: string): IBookingsPageAction => ({
  type: BookingsPageActionTypes.FETCH_FAILURE,
  message,
});
