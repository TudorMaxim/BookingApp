import { ICalendarState, IBookingState } from '../../context/types';
import calendarUtils from '../../utils/calendar';
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
    case CalendarActionTypes.UPDATE_BOOKING:
      console.log(action);
      return {
        ...state,
        bookings: calendarUtils.updateBookingsState(
          state.bookings,
          action.booking,
          action.day,
          action.hour,
        ),
      };
    default:
      return state;
  }
};

export default calendarReducer;
