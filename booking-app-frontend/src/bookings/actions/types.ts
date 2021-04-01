import { IBookingState } from '../../context/types';

export enum BookingsPageActionTypes {
    FETCH_REQUEST = 'FETCH_BOOKINGS_REQUEST',
    FETCH_SUCCESS = 'FETCH_BOOKINGS_SUCCESS',
    FETCH_FAILURE = 'FETCH_BOOKINGS_FAILURE',
}

export interface IBookingsPageAction {
    type: BookingsPageActionTypes;
    bookings?: IBookingState[];
    message?: string;
}
