import { IBookingsPageState } from '../../context/types';
import { BookingsPageActionTypes, IBookingsPageAction } from '../actions/types';
import { CommonActionTypes } from '../../common/actions/types';

const bookingsPageReducer = (
  state: IBookingsPageState,
  action: IBookingsPageAction,
): IBookingsPageState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default bookingsPageReducer;
