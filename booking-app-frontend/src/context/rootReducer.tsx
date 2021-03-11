import { IState } from './types';
import authReducer from '../auth/reducers';
import { IAuthAction } from '../auth/actions/types';
import profileReducer from '../profile/reducers';
import { IProfileAction } from '../profile/actions/types';
import dashboardReducer from '../dashboard/reducers';
import { IDashboardAction } from '../dashboard/actions/types';

export type IAction = IAuthAction | IProfileAction | IDashboardAction;

const rootReducer = ({ auth, profile, dashboard }: IState, action: IAction): IState => ({
  auth: authReducer(auth, action as IAuthAction),
  profile: profileReducer(profile, action as IProfileAction),
  dashboard: dashboardReducer(dashboard, action as IDashboardAction),
});

export default rootReducer;
