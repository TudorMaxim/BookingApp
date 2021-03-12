import { ICalendarState } from '../../context/types';
import { ICalendarAction } from '../actions/types';

const calendarReducer = (state: ICalendarState, action: ICalendarAction): ICalendarState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default calendarReducer;
