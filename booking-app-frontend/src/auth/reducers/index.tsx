import { IAuthState } from '../../context/types';
import { IAuthAction, AuthActionTypes } from '../actions/types';

const authReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
    case AuthActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: undefined,
      };
    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        message: action.message,
      };
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isRegistered: true,
        message: action.message,
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        isRegistered: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default authReducer;
