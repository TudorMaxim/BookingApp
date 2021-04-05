import { IBookingState } from '../../context/types';

export enum BookingsPageActionTypes {
    FETCH_REQUEST = 'FETCH_BOOKINGS_REQUEST',
    FETCH_SUCCESS = 'FETCH_BOOKINGS_SUCCESS',
    FETCH_FAILURE = 'FETCH_BOOKINGS_FAILURE',
    SET_CURRENT = 'SET_CURRENT',
}

export interface IBookingsPageAction {
    type: BookingsPageActionTypes;
    bookings?: IBookingState[];
    message?: string;
    current?: number;
}
