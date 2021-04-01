import { IBookingsPageState, IBookingState } from '../../context/types';
import { BookingsPageActionTypes, IBookingsPageAction } from '../actions/types';

const bookingsPageReducer = (
  state: IBookingsPageState,
  action: IBookingsPageAction,
): IBookingsPageState => {
  switch (action.type) {
    case BookingsPageActionTypes.FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case BookingsPageActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookings: action.bookings as IBookingState[],
      };
    case BookingsPageActionTypes.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default bookingsPageReducer;
