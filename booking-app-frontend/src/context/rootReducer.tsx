import { IState } from './stateTypes';
import authReducer from '../auth/reducers';
import { IAuthAction } from '../auth/actions';

export type IAction = IAuthAction;

const rootReducer = ({ auth }: IState, action: IAction): IState => ({
  auth: authReducer(auth, action),
});

export default rootReducer;
