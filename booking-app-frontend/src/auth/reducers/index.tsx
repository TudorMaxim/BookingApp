import { IAuthState } from '../../context/types';
import { IAuthAction, AuthActionTypes } from '../actions/types';

const authReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        isLoading: false,
        isAuthenticated: true,
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
