import { IState } from './types';
import authReducer from '../auth/reducers';
import { IAuthAction } from '../auth/actions/types';
import profileReducer from '../profile/reducers';
import { IProfileAction } from '../profile/actions/types';
import dashboardReducer from '../dashboard/reducers';
import { IDashboardAction } from '../dashboard/actions/types';
import bookingsPageReducer from '../bookings/reducers';
import { IBookingsPageAction } from '../bookings/actions/types';

export type IAction = IAuthAction | IProfileAction | IDashboardAction | IBookingsPageAction;

const rootReducer = ({
  auth, profile, dashboard, bookingsPage,
}: IState, action: IAction): IState => ({
  auth: authReducer(auth, action as IAuthAction),
  profile: profileReducer(profile, action as IProfileAction),
  dashboard: dashboardReducer(dashboard, action as IDashboardAction),
  bookingsPage: bookingsPageReducer(bookingsPage, action as IBookingsPageAction),
});

export default rootReducer;
