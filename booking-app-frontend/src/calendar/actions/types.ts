import { IBookingState } from '../../context/types';

export enum CalendarViewTypes {
    WEEK = 'WEEK',
    MONTH = 'MONTH',
}

export enum CalendarActionTypes {
    FETCH_REQUEST = 'FETCH_REQUEST',
    FETCH_SUCCESS = 'FETCH_SUCCESS',
    FETCH_FAILURE = 'FETCH_FAILURE',
}

export interface ICalendarAction {
    type: CalendarActionTypes;
    bookings?: IBookingState[],
    message?: string;
}
