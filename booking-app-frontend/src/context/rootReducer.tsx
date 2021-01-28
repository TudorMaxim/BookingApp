import { IState } from './types';
import authReducer from '../auth/reducers';
import { IAuthAction } from '../auth/actions/types';
import profileReducer from '../profile/reducers';
import { IProfileAction } from '../profile/actions/types';

export type IAction = IAuthAction | IProfileAction;

const rootReducer = ({ auth, profile }: IState, action: IAction): IState => ({
  auth: authReducer(auth, action as IAuthAction),
  profile: profileReducer(profile, action as IProfileAction),
});

export default rootReducer;
