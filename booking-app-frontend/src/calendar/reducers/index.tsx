import { ICalendarState, IBookingState } from '../../context/types';
import { CalendarActionTypes, ICalendarAction } from '../actions/types';

const calendarReducer = (state: ICalendarState, action: ICalendarAction): ICalendarState => {
  switch (action.type) {
    case CalendarActionTypes.FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CalendarActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookings: action.bookings as IBookingState[],
      };
    case CalendarActionTypes.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default calendarReducer;
