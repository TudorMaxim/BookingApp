import { IBookingState } from '../../context/types';
import { CalendarActionTypes, ICalendarAction } from './types';

export const fetchRequest = (): ICalendarAction => ({
  type: CalendarActionTypes.FETCH_REQUEST,
});

export const fetchSuccess = (bookings: IBookingState[]): ICalendarAction => ({
  type: CalendarActionTypes.FETCH_SUCCESS,
  bookings,
});

export const fetchFailure = (message: string): ICalendarAction => ({
  type: CalendarActionTypes.FETCH_FAILURE,
  message,
});

export const updateBooking = (
  booking?: IBookingState,
  day?: number,
  hour?: number,
): ICalendarAction => ({
  type: CalendarActionTypes.UPDATE_BOOKING,
  booking,
  day,
  hour,
});
