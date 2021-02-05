import { IState } from './types';

const initialState: IState = {
  auth: {
    isLoading: false,
    isAuthenticated: false,
    isRegistered: false,
    isActivated: false,
  },
  profile: {
    name: '',
    email: '',
    token: '',
  },
};

export default initialState;
