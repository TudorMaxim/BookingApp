import { IState } from './stateTypes';

const initialState: IState = {
  auth: {
    email: '',
    token: '',
    isLoading: false,
    isAuthenticated: false,
  },
};

export default initialState;
